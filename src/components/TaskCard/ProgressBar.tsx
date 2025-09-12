type Variant = 'brand' | 'warning' | 'success';

const VAR = {
  brand: {
    chipBg: 'bg-indigo-100',
    chipText: 'text-indigo-600',
    bar: 'bg-indigo-600',
  },
  warning: {
    chipBg: 'bg-amber-100',
    chipText: 'text-amber-600',
    bar: 'bg-amber-500',
  },
  success: {
    chipBg: 'bg-emerald-100',
    chipText: 'text-emerald-600',
    bar: 'bg-emerald-500',
  },
} as const;

export default function ProgressBar({
  percent,
  variant = 'brand',
}: {
  percent: number;
  variant?: Variant;
}) {
  const v = VAR[variant];
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600">Progress</span>
        <span className="font-semibold text-slate-800">{clamped}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className={`h-2 rounded-full ${v.bar}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
