import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: `
          bg-[var(--primary)] text-white 
          hover:bg-[var(--primary-dark)] 
          shadow-[0_9px_30px_rgba(124,58,237,0.5)]
          hover:translate-y-[-2px]
        `,
        primary: `
          bg-[var(--primary)] text-white 
          hover:bg-[var(--primary-dark)] 
          shadow-[0_9px_30px_rgba(124,58,237,0.5)]
          hover:translate-y-[-2px]
        `,
        outline: `
          border border-[var(--primary)] text-[var(--primary)]
          bg-transparent
          hover:bg-[rgba(124, 58, 237, 0.1)] hover:text-white
          hover:shadow-[0_6px_25px_rgba(124,58,237,0.5)]
          hover:scale-105 hover:translate-y-[-2px]
        `,
        secondary: `
          bg-[var(--secondary)] text-white 
          shadow-[0_4px_20px_rgba(14,165,233,0.4)]
          hover:bg-[color-mix(in_srgb,var(--secondary)_80%,black)]
          hover:shadow-[0_6px_25px_rgba(14,165,233,0.5)]
          hover:scale-105 hover:translate-y-[-2px]
        `,
        ghost: `
          text-[var(--primary)] bg-transparent
          shadow-none
          hover:bg-[rgba(124, 58, 237, 0.1)] hover:text-white
          hover:shadow-[0_6px_25px_rgba(124,58,237,0.5)]
          hover:scale-105 hover:translate-y-[-2px]
        `,
        link: `
          text-[var(--primary)] underline-offset-4 hover:underline
          shadow-none
          hover:text-[var(--primary-dark)]
          hover:shadow-[0_6px_25px_rgba(124,58,237,0.5)]
          hover:translate-y-[-2px]
        `,
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-14 rounded-xl px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)




export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }