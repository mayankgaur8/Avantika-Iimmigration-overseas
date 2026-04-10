import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import { forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  href?: string
  external?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-navy-700 text-white hover:bg-navy-600 shadow-md hover:shadow-lg focus:ring-navy-500',
  secondary: 'bg-gold-500 text-white hover:bg-gold-400 shadow-cta hover:shadow-lg focus:ring-gold-400',
  outline: 'border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white focus:ring-navy-500',
  ghost: 'text-navy-700 hover:bg-navy-50 focus:ring-navy-300',
  danger: 'bg-red-600 text-white hover:bg-red-500 shadow-md focus:ring-red-400',
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
  md: 'text-sm px-5 py-2.5 rounded-lg gap-2',
  lg: 'text-base px-7 py-3.5 rounded-xl gap-2',
  xl: 'text-lg px-9 py-4 rounded-xl gap-2.5',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      href,
      external,
      fullWidth,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClass = cn(
      'inline-flex items-center justify-center font-semibold transition-all duration-200',
      'active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      (disabled || loading) && 'opacity-60 cursor-not-allowed pointer-events-none',
      className
    )

    const content = (
      <>
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          icon && iconPosition === 'left' && icon
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </>
    )

    if (href) {
      return (
        <Link
          href={href}
          className={baseClass}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {content}
        </Link>
      )
    }

    return (
      <button ref={ref} className={baseClass} disabled={disabled || loading} {...props}>
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
