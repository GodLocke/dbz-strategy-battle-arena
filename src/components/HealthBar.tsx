
import React from 'react';
import { cn } from '@/lib/utils';

interface HealthBarProps {
  current: number;
  max: number;
  className?: string;
  showValue?: boolean;
}

const HealthBar: React.FC<HealthBarProps> = ({ 
  current, 
  max, 
  className, 
  showValue = false 
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const getColorClass = () => {
    if (percentage > 66) return 'bg-energy-health';
    if (percentage > 33) return 'bg-dbz-yellow';
    return 'bg-dbz-red';
  };
  
  return (
    <div className={cn('h-2 bg-gray-200 rounded-full overflow-hidden relative', className)}>
      <div 
        className={cn('h-full transition-all duration-300 ease-out', getColorClass())}
        style={{ width: `${percentage}%` }}
      />
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold">
          {current}/{max}
        </div>
      )}
    </div>
  );
};

export default HealthBar;
