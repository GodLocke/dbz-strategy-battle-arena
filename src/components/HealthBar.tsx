
import { cn } from '@/lib/utils';

interface HealthBarProps {
  current: number;
  max: number;
  showText?: boolean;
  className?: string;
}

const HealthBar = ({ current, max, showText = true, className }: HealthBarProps) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const getColorClass = () => {
    if (percentage > 50) return 'bg-energy-health';
    if (percentage > 25) return 'bg-dbz-yellow';
    return 'bg-dbz-red';
  };
  
  return (
    <div className={cn("w-full", className)}>
      {showText && (
        <div className="flex justify-between text-xs font-medium mb-1">
          <span>HP</span>
          <span>{current}/{max}</span>
        </div>
      )}
      <div className="health-bar">
        <div 
          className={cn("health-bar-fill", getColorClass())}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default HealthBar;
