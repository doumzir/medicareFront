import { cn } from '~/lib/utils';

export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('container mx-auto px-2 py-4', className)}>
      {children}
    </section>
  );
}
