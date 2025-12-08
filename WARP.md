# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Starting Development
- `npm run dev` - Start Next.js development server on http://localhost:3000
- `npm run build` - Build production bundle
- `npm start` - Start production server (requires build first)

### Code Quality
- `npm run lint` - Run ESLint checks
- `npm run typecheck` - Run TypeScript type checking with `tsc --noEmit`

Note: This project has no testing framework configured. There are no test files or test scripts.

## Architecture Overview

### Application Structure
This is a **client-side only** Next.js 15 application using the App Router. All state is managed in the browser with local storage - there is no backend API or database.

**Key architectural decisions:**
- **Client-side rendering**: Main page (`app/page.tsx`) uses `'use client'` directive
- **Local storage persistence**: All deal data stored in browser's `localStorage` under key `crest-pipeline-deals`
- **No server components**: All components are client components due to state management and localStorage usage
- **Single page application**: Entire dashboard is one page with modals for interactions

### Data Flow
1. **Initial load**: `app/page.tsx` calls `getDeals()` from `lib/storage.ts` on mount
2. **State management**: Local React state (`useState`) in main page component
3. **Updates**: After any CRUD operation, `refreshDeals()` re-reads from localStorage
4. **Persistence**: `lib/storage.ts` handles all localStorage read/write operations

### Core Modules

**`lib/storage.ts`** - Single source of truth for data operations:
- `getDeals()` - Reads all deals from localStorage
- `saveDeal()` - Creates new deal with generated UUID
- `updateDeal()` - Updates existing deal by ID
- `deleteDeal()` - Removes deal by ID
- `calculateCommission()` - Business logic for commission calculation

**`types/deal.ts`** - Type definitions:
- `DealStatus` - 5 pipeline stages: lead, qualification, under-contract, closed-won, closed-lost
- `Deal` - Main data model with all fields including timestamps
- `DealFormData` - Subset used for creating/updating deals

**`app/page.tsx`** - Main dashboard:
- Manages global deals state
- Calculates metrics (totals, pipeline value, closed value)
- Renders metrics cards and pipeline columns
- Handles modal state for add/edit flows

### Component Patterns

**UI Components** (in `components/`):
- `PipelineColumn.tsx` - Renders one pipeline stage column with its deals
- `DealCard.tsx` - Individual deal card shown in columns
- `AddDealModal.tsx` - Modal for creating and editing deals (handles both modes)
- `MetricsCard.tsx` - Reusable metric display card

**Component communication**:
- Props-based: Parent passes callbacks (`onDealClick`, `onRefresh`) to children
- No context providers or global state management library
- Modal state managed in parent (`isModalOpen`, `selectedDeal`)

### Styling System
- **Tailwind CSS** with custom theme in `tailwind.config.ts`
- Custom primary color palette (green: `#10B981`)
- Utility function `cn()` in `lib/utils.ts` for conditional class merging using `clsx` and `tailwind-merge`
- Radix UI components for accessible modals, selects, and dialogs

### Path Aliases
- `@/*` maps to project root (configured in `tsconfig.json`)
- Example: `import { Deal } from '@/types/deal'`

## Important Constraints

### Browser-Only Code
All code assumes browser environment. When writing new storage logic, always check `typeof window === 'undefined'` for SSR safety (see `lib/storage.ts` for pattern).

### TypeScript Strict Mode
Project uses TypeScript strict mode. All new code must:
- Have explicit return types for functions
- Handle nullable/undefined cases
- Use proper typing for component props

### Build Settings
- TypeScript errors will **fail builds** (`ignoreBuildErrors: false`)
- ESLint errors will **fail builds** (`ignoreDuringBuilds: false`)

### Data Persistence
localStorage is the only persistence layer. Be aware:
- No user authentication (hardcoded `user_id: 'local-user'`)
- Data is per-browser, per-domain
- No data migration system exists
- Clearing browser data deletes all deals

## Real Estate Business Logic

### Commission Calculation
Formula: `listing_price * (commission_rate / 100) * (my_share / 100)`
- Default commission rate: 3%
- Default share: 50%
- Used for "Pipeline Value" and "Closed Value" metrics

### Deal Stages
Deals flow through these stages:
1. **Lead** - Initial contact
2. **Qualification** - Vetting the opportunity
3. **Under Contract** - Signed contract
4. **Closed Won** - Successfully closed
5. **Closed Lost** - Did not close

"Active deals" = all deals except closed-won and closed-lost
