
import { cn } from '@/lib/utils';

interface EnergyBarProps {
  current: number;
  max: number;
  showText?: boolean;
  className?: string;
}

const EnergyBar = ({ current, max, showText = true, className }: EnergyBarProps) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  return (
    <div className={cn("w-full", className)}>
      {showText && (
        <div className="flex justify-between text-xs font-medium mb-1">
          <span>KI</span>
          <span>{current}/{max}</span>
        </div>
      )}
      <div className="ki-bar">
        <div 
          className="ki-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default EnergyBar;
