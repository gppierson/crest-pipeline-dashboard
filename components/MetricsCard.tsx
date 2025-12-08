interface MetricsCardProps {
  title: string;
  value: string;
  color: string;
}

export function MetricsCard({ title, value, color }: MetricsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
