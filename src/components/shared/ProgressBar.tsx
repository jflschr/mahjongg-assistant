import clsx from 'clsx';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export function ProgressBar({ percentage, className }: ProgressBarProps) {
  return (
    <div className={clsx('h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden', className)}>
      <div
        className={clsx(
          'h-full rounded-full transition-all duration-300',
          percentage >= 80 ? 'bg-emerald-500' :
          percentage >= 50 ? 'bg-yellow-500' :
          'bg-gray-400'
        )}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
}
