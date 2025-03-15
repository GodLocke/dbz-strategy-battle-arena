
import React from 'react';
import { cn } from '@/lib/utils';

interface EnergyBarProps {
  current: number;
  max: number;
  className?: string;
  showValue?: boolean;
}

const EnergyBar: React.FC<EnergyBarProps> = ({ 
  current, 
  max, 
  className, 
  showValue = false 
}) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  return (
    <div className={cn('h-2 bg-gray-200 rounded-full overflow-hidden relative', className)}>
      <div 
        className="h-full bg-energy-ki transition-all duration-300 ease-out"
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

export default EnergyBar;
