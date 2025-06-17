import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  color?: "purple" | "white";
}

export function SectionHeading({
  title,
  subtitle,
  center = false,
  className,
  color = "purple",
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-12",
      center && "text-center",
      className
    )}>
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className={cn("gradient-text-purple", color === "white" && "gradient-text-white")}>{title}</span>
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg text-gray-600 max-w-3xl mx-auto", color === "white" && "text-gray-200")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}