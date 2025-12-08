import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  color: string;
  icon?: LucideIcon;
  gradient?: string;
}

export function MetricsCard({ title, value, color, icon: Icon, gradient }: MetricsCardProps) {
  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 p-5 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden">
      {/* Gradient background accent */}
      {gradient && (
        <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      )}
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className={`text-3xl font-bold ${color} transition-transform duration-200 group-hover:scale-105`}>
            {value}
          </p>
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-lg ${gradient} bg-opacity-10 group-hover:scale-110 transition-transform duration-200`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        )}
      </div>
    </div>
  );
}
