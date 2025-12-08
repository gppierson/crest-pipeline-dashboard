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
    <div className="group relative bg-gray-900/40 backdrop-blur-md rounded-xl border border-white/5 p-5 transition-all duration-300 hover:bg-gray-800/60 hover:border-white/10 hover:shadow-glow hover:-translate-y-1">
      {/* Glow effect behind the icon */}
      <div className={`absolute top-4 right-4 w-12 h-12 ${gradient} opacity-20 blur-xl rounded-full group-hover:opacity-40 transition-opacity duration-300 rounded-full`} />

      <div className="relative flex items-start justify-between z-10">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">{title}</p>
          <p className="text-3xl font-heading font-bold text-white tracking-tight">
            {value}
          </p>
        </div>

        {Icon && (
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
        )}
      </div>

      {/* Bottom border gradient highlight */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 opacity-50`} />
    </div>
  );
}
