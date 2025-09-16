import { ProgressBarProps } from '@/types';
import { getProgressVariant, clamp } from '@/utils';

export default function ProgressBar({
  percent,
  variant = 'brand',
}: ProgressBarProps) {
  const variantConfig = getProgressVariant(variant);
  const clampedPercent = clamp(percent, 0, 100);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-600">Progress</span>
        <span className="font-semibold text-slate-800">{clampedPercent}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className={`h-2 rounded-full ${variantConfig.bar}`}
          style={{ width: `${clampedPercent}%` }}
        />
      </div>
    </div>
  );
}
