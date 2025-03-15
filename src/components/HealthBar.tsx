
import React from 'react';
import { cn } from '@/lib/utils';

interface HealthBarProps {
  current: number;
  max: number;
  className?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const HealthBar: React.FC<HealthBarProps> = ({ 
  current, 
  max, 
  className, 
  showValue = false,
  size = 'md'
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const getColorClass = () => {
    if (percentage > 66) return 'bg-energy-health';
    if (percentage > 33) return 'bg-dbz-yellow';
    return 'bg-dbz-red';
  };
  
  const getSizeClass = () => {
    switch(size) {
      case 'sm': return 'h-1.5';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };
  
  return (
    <div className={cn('bg-gray-200 rounded-full overflow-hidden relative', getSizeClass(), className)}>
      <div 
        className={cn('h-full transition-all duration-300 ease-out', getColorClass())}
        style={{ width: `${percentage}%` }}
      />
      {showValue && (
        <div className={cn("absolute inset-0 flex items-center justify-center text-white font-bold", 
          size === 'sm' ? 'text-[10px]' : 
          size === 'lg' ? 'text-sm' : 
          'text-xs'
        )}>
          {current}/{max}
        </div>
      )}
    </div>
  );
};

export default HealthBar;
