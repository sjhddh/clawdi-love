import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "main";
  id?: string;
}

export function SectionContainer({
  children,
  className,
  as: Component = "section",
  id,
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}
    >
      {children}
    </Component>
  );
}
