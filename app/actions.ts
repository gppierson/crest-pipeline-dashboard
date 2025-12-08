'use server';

import { Deal, DealFormData, DealStatus } from '@/types/deal';
import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase-admin';

export async function getDeals(): Promise<Deal[]> {
    try {
        const dealsSnapshot = await adminDb.collection('deals').orderBy('created_at', 'desc').get();

        return dealsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                address: data.address,
                listing_price: data.listing_price,
                status: data.status as DealStatus,
                commission_rate: data.commission_rate,
                my_share: data.my_share,
                user_id: data.user_id,
                estimated_close_date: data.estimated_close_date || undefined,
                actual_close_date: data.actual_close_date || undefined,
                notes: data.notes || undefined,
                created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
                updated_at: data.updated_at?.toDate().toISOString() || new Date().toISOString(),
            } as Deal;
        });
    } catch (error) {
        console.error('Error fetching deals:', error);
        throw new Error('Failed to fetch deals');
    }
}

export async function createDeal(data: DealFormData): Promise<Deal> {
    try {
        const now = new Date();
        const dealData = {
            address: data.address,
            listing_price: data.listing_price,
            status: data.status,
            commission_rate: data.commission_rate,
            my_share: data.my_share,
            estimated_close_date: data.estimated_close_date || null,
            actual_close_date: data.actual_close_date || null,
            notes: data.notes || null,
            user_id: 'local-user', // TODO: Replace with actual user ID from auth context
            created_at: now,
            updated_at: now,
        };

        const docRef = await adminDb.collection('deals').add(dealData);

        revalidatePath('/');
        revalidatePath('/analytics');

        return {
            id: docRef.id,
            ...dealData,
            status: dealData.status as DealStatus,
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
            estimated_close_date: dealData.estimated_close_date || undefined,
            actual_close_date: dealData.actual_close_date || undefined,
            notes: dealData.notes || undefined,
        } as Deal;
    } catch (error) {
        console.error('Error creating deal:', error);
        throw new Error('Failed to create deal');
    }
}

export async function updateDeal(id: string, data: Partial<DealFormData>): Promise<Deal> {
    try {
        const updateData = {
            ...data,
            updated_at: new Date(),
            // Handle explicit nulls for optional fields if provided
            ...(data.estimated_close_date !== undefined && { estimated_close_date: data.estimated_close_date || null }),
            ...(data.actual_close_date !== undefined && { actual_close_date: data.actual_close_date || null }),
            ...(data.notes !== undefined && { notes: data.notes || null }),
        };

        await adminDb.collection('deals').doc(id).update(updateData);
        const docSnapshot = await adminDb.collection('deals').doc(id).get();
        const currentData = docSnapshot.data()!;

        revalidatePath('/');
        revalidatePath('/analytics');

        return {
            id: docSnapshot.id,
            ...currentData,
            status: currentData.status as DealStatus,
            created_at: currentData.created_at?.toDate().toISOString(),
            updated_at: currentData.updated_at?.toDate().toISOString(),
            estimated_close_date: currentData.estimated_close_date || undefined,
            actual_close_date: currentData.actual_close_date || undefined,
            notes: currentData.notes || undefined,
        } as Deal;
    } catch (error) {
        console.error('Error updating deal:', error);
        throw new Error('Failed to update deal');
    }
}

export async function deleteDeal(id: string): Promise<void> {
    try {
        await adminDb.collection('deals').doc(id).delete();

        revalidatePath('/');
        revalidatePath('/analytics');
    } catch (error) {
        console.error('Error deleting deal:', error);
        throw new Error('Failed to delete deal');
    }
}
