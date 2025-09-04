export function Header({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <h2 className="text-sm font-medium text-foreground/90">{title}</h2>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
