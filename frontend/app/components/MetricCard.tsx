type Props = {
  label: string;
  value: string | number;
  helper?: string;
};

export function MetricCard({ label, value, helper }: Props) {
  return (
    <div className="card flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="text-2xl font-semibold text-slate-50">{value}</span>
      {helper && (
        <span className="text-xs text-slate-500">
          {helper}
        </span>
      )}
    </div>
  );
}
