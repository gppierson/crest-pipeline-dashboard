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
    <div className="group relative bg-white rounded-xl border border-slate-100 p-5 transition-all duration-300 shadow-soft hover:shadow-card-hover hover:-translate-y-1">
      {/* Subtle Glow effect behind the icon */}
      <div className={`absolute top-4 right-4 w-12 h-12 ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-xl`} />

      <div className="relative flex items-start justify-between z-10">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 mb-2 group-hover:text-slate-700 transition-colors">{title}</p>
          <p className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
            {value}
          </p>
        </div>

        {Icon && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:scale-110 group-hover:shadow-sm transition-all duration-300">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        )}
      </div>

      {/* Bottom border gradient highlight */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 opacity-80 rounded-b-xl`} />
    </div>
  );
}
