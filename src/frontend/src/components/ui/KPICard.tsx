import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

interface KPICardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  className?: string;
  iconClassName?: string;
}

export function KPICard({
  icon,
  label,
  value,
  change,
  changeLabel,
  className,
  iconClassName,
}: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;
  return (
    <div className={cn("kpi-card", className)}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <div
          className={cn(
            "p-2 rounded-lg",
            iconClassName ?? "bg-primary/10 text-primary",
          )}
        >
          {icon}
        </div>
      </div>
      <div className="mt-1">
        <p className="text-2xl font-bold text-foreground font-display tracking-tight">
          {value}
        </p>
        {change !== undefined && (
          <div className="flex items-center gap-1 mt-1.5">
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                isPositive ? "text-emerald-400" : "text-red-400",
              )}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
            {changeLabel && (
              <span className="text-xs text-muted-foreground">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
