'use client'

import { forwardRef } from 'react'
import type { ComponentRef, ComponentPropsWithoutRef, ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'
import { useFormFieldContext } from './FormField'
import { cn } from '@/ui/utils/utils'
import { focusRing } from '@/ui/utils/focus-ring'

export const input = tv({
  extend: focusRing,
  slots: {
    base: 'overflow-hidden autofill-style flex ~text-sm/base items-center border-2 border-solid w-full bg-white transition-[border-color] ease-in-out group focus-within:outline focus-within:outline-4',
    inputElement:
      'placeholder-neutral-400 w-full text-ellipsis outline-none h-full min-h-input bg-transparent ',
  },
  variants: {
    startSlot: {
      false: {
        inputElement: 'pl-2',
      },
      true: {},
    },
    endSlot: {
      false: {
        inputElement: 'pr-2',
      },
      true: {},
    },
    state: {
      destructive: {
        base: 'border-destructive-400 bg-destructive-50 focus-within:outline-destructive-400/50',
      },
      positive: {
        base: 'border-positive-400  focus-within:border-positive-500 focus-within:outline-positive-500/50',
      },
      warn: {
        base: 'border-warn-400 focus-within:border-warn-500 focus-within:outline-warn-500/50',
      },
      neutral: {
        base: 'border-neutral-300 hover:border-neutral-400 hover:focus-within:border-secondary-500 focus-within:border-secondary-500 focus-within:outline-secondary-400/50',
      },
    },
  },
  defaultVariants: {
    state: 'neutral',
    startSlot: false,
    endSlot: false,
  },
})

export interface InputProps extends Omit<VariantProps<typeof input>, 'startSlot' | 'endSlot'> {
  startSlot?: React.ReactNode
  endSlot?: React.ReactNode
  baseProps?: ComponentPropsWithoutRef<'div'>
}

const _Input = (props: InputProps & ComponentProps<'input'>) => {
  const context = useFormFieldContext()

  const { children, className, state, startSlot, endSlot, baseProps, ref, ...rest } = {
    ...context,
    ...props,
  }
  const { className: baseClassName, ...baseRest } = baseProps ?? {}

  const { base, inputElement } = input({
    state,
    startSlot: !!startSlot,
    endSlot: !!endSlot,
  })
  return (
    <div className={cn(base(), baseClassName)} {...baseRest}>
      {startSlot}
      <input
        ref={ref}
        className={cn(
          inputElement(),

          className,
        )}
        {...rest}
      />
      {endSlot}
    </div>
  )
}

export const inputAffix = tv({
  base: '',
  variants: {
    size: {
      md: 'px-1',
      lg: 'px-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface InputAffixProps extends VariantProps<typeof inputAffix> {}

const InputAffix = forwardRef<
  ComponentRef<'div'>,
  InputAffixProps & ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const { children, className, size, ...rest } = props

  return (
    <div ref={ref} className={cn(inputAffix({ size }), className)} {...rest}>
      {children}
    </div>
  )
})

export const Input = Object.assign(_Input, { Affix: InputAffix })
