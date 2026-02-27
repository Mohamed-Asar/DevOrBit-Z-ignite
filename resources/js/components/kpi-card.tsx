import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
  iconClassName?: string;
}

export function KPICard({ title, value, icon: Icon, trend, className, iconClassName }: KPICardProps) {
  return (
    <div className={cn("kpi-card group", className)}>
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">{title}</p>
          <p className="text-4xl font-extrabold text-foreground mt-3 animate-count-up tabular-nums">{value.toLocaleString()}</p>
          {trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-success/10 text-success">
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className={cn(
          "h-12 w-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
          iconClassName || "bg-accent"
        )}>
          <Icon className="h-5 w-5 text-accent-foreground" />
        </div>
      </div>
    </div>
  );
}
