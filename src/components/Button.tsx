import React from 'react';
import { Link, LinkProps as RouterLinkProps } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'destructive' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'medium';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

type ButtonAsButton = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; };
type ButtonAsAnchor = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string; };
type ButtonAsLink = BaseButtonProps & RouterLinkProps & { as: typeof Link; to: string; };

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    children,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = 'left',
    className,
    leftIcon,
    rightIcon,
    isLoading,
    ...rest
  } = props;

  const commonClass = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
      'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
      'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
      'bg-transparent text-primary underline-offset-4 hover:underline': variant === 'link',
      'h-9 px-3': size === 'sm',
      'h-10 px-4 py-2': size === 'medium',
      'h-11 px-8': size === 'lg',
      'w-full': fullWidth,
      'opacity-50 cursor-not-allowed': (props as any).disabled || loading,
    },
    className
  );

  if ('as' in props && props.as === Link) {
    // React Router Link
    const { to, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} to={to} className={commonClass} {...linkProps}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {!loading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </Link>
    );
  }
  if ('as' in props && props.as === 'a') {
    // Anchor
    const { href, ...anchorProps } = rest as ButtonAsAnchor;
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={commonClass} {...anchorProps}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {!loading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </a>
    );
  }
  // Default: button
  const { disabled = false, ...buttonProps } = rest as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={commonClass}
      disabled={disabled || loading}
      type={buttonProps.type || 'button'}
      {...buttonProps}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {!loading && icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
}); 