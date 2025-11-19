import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: "blue" | "green" | "purple" | "orange" | "red"
  className?: string
}

const colorClasses = {
  blue: "from-blue-500 to-blue-700",
  green: "from-green-500 to-green-700",
  purple: "from-purple-500 to-purple-700",
  orange: "from-orange-500 to-orange-700",
  red: "from-red-500 to-red-700",
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
  className,
}: StatCardProps) {
  return (
    <Card className={cn("bento-card overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <div className={cn(
                "text-sm font-medium flex items-center gap-1",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                <span>{trend.isPositive ? "↑" : "↓"}</span>
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center",
            colorClasses[color]
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
