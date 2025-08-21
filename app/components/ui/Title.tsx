import { cn } from '~/lib/utils';

type TitleElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: TitleElement;
  className?: string;
}

const titleSizes: Record<TitleElement, string> = {
  h1: 'text-4xl font-extrabold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-medium',
};

export function Title({
  as = 'h1',
  className,
  children,
  ...props
}: TitleProps) {
  const Component = as;

  return (
    <Component className={cn(titleSizes[as], className)} {...props}>
      {children}
    </Component>
  );
}
