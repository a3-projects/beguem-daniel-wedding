'use client'

import type { ComponentPropsWithRef } from 'react'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'
import React from 'react'
import {
  composeRenderProps,
  Button as RACButton,
  ButtonProps as RACButtonProps,
} from 'react-aria-components'
import { cn } from '@/ui/utils/utils'
import { PendingProgressCircle } from '@/ui/components/PendingProgressCircle'
import { focusRing } from '@/ui/utils/focus-ring'

export const button = tv({
  extend: focusRing,
  base: 'relative flex items-center justify-center cursor-pointer',
  variants: {
    variant: {
      solid: '',
      outline: 'border border-solid',
      ghost: '',
    },
    color: {
      primary: '',
      secondary: '',
      positive: '',
      destructive: '',
      warn: '',
      neutral: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    inverted: {
      true: '',
      false: '',
    },
    isPending: {
      true: 'pointer-events-none',
    },
    circle: {
      true: 'rounded-full flex-shrink-0',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    color: 'primary',
    circle: false,
    inverted: false,
  },
  compoundVariants: [
    { isDisabled: true, isPending: false, class: 'opacity-50 pointer-events-none' },
    {
      variant: 'solid',
      color: 'primary',
      inverted: false,
      class: 'bg-primary-500 hover:bg-primary-600 text-primary-fg',
    },
    {
      variant: 'solid',
      color: 'primary',
      inverted: true,
      class: 'bg-primary-fg hover:bg-primary-fg/90 text-primary-600',
    },
    {
      variant: 'solid',
      color: 'secondary',
      inverted: false,
      class: 'bg-secondary-600 hover:bg-secondary-700 text-secondary-fg ',
    },
    {
      variant: 'solid',
      color: 'secondary',
      inverted: true,
      class: 'bg-secondary-fg hover:bg-secondary-fg/90 text-secondary-600',
    },
    {
      variant: 'solid',
      color: 'positive',
      class: 'bg-positive-500 hover:bg-positive-600 text-positive-fg',
    },
    {
      variant: 'solid',
      color: 'destructive',
      class: 'bg-destructive-500 hover:bg-destructive-600 text-destructive-fg',
    },
    {
      variant: 'solid',
      color: 'warn',
      class: 'bg-warn-500 hover:bg-warn-600 text-warn-fg',
    },
    {
      variant: 'solid',
      color: 'neutral',
      class: 'bg-neutral-500 hover:bg-neutral-600 text-neutral-fg',
    },

    {
      variant: 'outline',
      color: 'primary',
      class: 'border-primary-500 text-primary-500 hover:bg-primary-100/50',
    },
    {
      variant: 'outline',
      color: 'secondary',
      class: 'border-secondary-500 text-secondary-500 hover:bg-secondary-100/50',
    },
    {
      variant: 'outline',
      color: 'positive',
      class: 'border-positive-500 text-positive-500 hover:bg-positive-100/50',
    },
    {
      variant: 'outline',
      color: 'destructive',
      class: 'border-destructive-500 text-destructive-500 hover:bg-destructive-100/50',
    },
    {
      variant: 'outline',
      color: 'warn',
      class: 'border-warn-500 text-warn-500 hover:bg-warn-100/50',
    },
    {
      variant: 'ghost',
      color: 'primary',
      class: 'hover:bg-primary-400/20 text-primary-500',
    },
    {
      variant: 'ghost',
      color: 'secondary',
      class: 'hover:bg-secondary-400/20 text-secondary-500',
    },
    {
      variant: 'ghost',
      color: 'positive',
      class: 'hover:bg-positive-400/20 text-positive-500',
    },
    {
      variant: 'ghost',
      color: 'destructive',
      class: 'hover:bg-destructive-400/20 text-destructive-500',
    },
    {
      variant: 'ghost',
      color: 'warn',
      class: 'hover:bg-warn-400/20 text-warn-500',
    },
    {
      variant: 'ghost',
      color: 'neutral',
      class: 'hover:bg-neutral-400/20 text-neutral-500',
    },
    {
      variant: 'outline',
      color: 'neutral',
      class: 'border-neutral-500 text-neutral-500',
    },
    {
      circle: false,
      size: 'sm',
      class: 'px-2 h-9 ~text-sm/base',
    },
    {
      circle: false,
      size: 'md',
      class: 'px-4 h-10',
    },
    {
      circle: false,
      size: 'lg',
      class: 'px-6 h-16  ~text-lg/xl',
    },

    {
      circle: true,
      size: 'sm',
      class: 'h-8 w-8 ',
    },
    {
      circle: true,
      size: 'md',
      class: 'h-10 w-10',
    },
    {
      circle: true,
      size: 'lg',
      class: 'h-12 w-12',
    },
  ],
})

export interface ButtonProps extends VariantProps<typeof button> {}

const _Button = (props: ButtonProps & RACButtonProps) => {
  const {
    children,
    className,
    variant,
    color,
    isDisabled,
    circle,
    size,
    inverted,
    type = 'button',
    ...rest
  } = props

  return (
    <RACButton
      {...rest}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, variant, color, circle, size, inverted, className }),
      )}
      isDisabled={props.isPending || isDisabled}
      type={type}
    >
      {composeRenderProps(props.children, (children) => (
        <>
          {props.isPending && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <PendingProgressCircle />
            </div>
          )}
          <div
            className={cn('flex w-full h-full items-center justify-center', {
              'pointer-events-none opacity-0': props.isPending,
            })}
          >
            {children}
          </div>
        </>
      ))}
    </RACButton>
  )
}

export const buttonStart = tv({
  base: 'pr-1 svg-font-scale',
})

export interface ButtonStartProps extends VariantProps<typeof buttonStart> {}

export const ButtonStart = (props: ButtonStartProps & ComponentPropsWithRef<'div'>) => {
  const { children, className, ...rest } = props

  return (
    <div className={buttonStart({ className })} {...rest}>
      {children}
    </div>
  )
}

export const buttonEnd = tv({
  base: 'pl-1  svg-font-scale',
})

export interface ButtonEndProps extends VariantProps<typeof buttonEnd> {}

const ButtonEnd = (props: ButtonEndProps & ComponentPropsWithRef<'div'>) => {
  const { children, className, ...rest } = props

  return (
    <div className={buttonEnd({ className })} {...rest}>
      {children}
    </div>
  )
}

export const Button = Object.assign(_Button, {
  Start: ButtonStart,
  End: ButtonEnd,
})
