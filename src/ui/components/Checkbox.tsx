import { useFormFieldContext } from '@/ui/components/FormField'
import { focusRing } from '@/ui/utils/focus-ring'
import { CheckIcon } from 'lucide-react'
import {
  composeRenderProps,
  Checkbox as RACCheckbox,
  type CheckboxProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

export const checkbox = tv({
  extend: focusRing,
  slots: {
    base: focusRing({
      className:
        'border-2 border-solid rounded border-neutral-300 rac-focus:border-neutral-300 flex items-center justify-center w-[28px]  aspect-square',
    }),
  },
  variants: {
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
        base: 'border-neutral-300 rac-selected:bg-primary-500 rac-selected:border-primary-500 rac-selected:text-primary-fg rac-hover:border-neutral-400 rac-selected:hover:bg-primary-600 rac-selected:hover:border-primary-600  ',
      },
    },
  },
  defaultVariants: {
    state: 'neutral',
  },
})

export function Checkbox(props: CheckboxProps) {
  let context: ReturnType<typeof useFormFieldContext> | undefined = undefined
  try {
    context = useFormFieldContext()
  } catch (e) {
    // do nothing
  }
  const { children, className, ...rest } = {
    ...context,
    ...props,
  }
  const { base } = checkbox()
  return (
    <RACCheckbox
      className={composeRenderProps(props.className, (className, renderProps) =>
        base({ ...renderProps, className }),
      )}
      {...rest}
    >
      {({ isIndeterminate, isSelected }) => (
        <>
          <div>{isSelected && <CheckIcon />}</div>
          {children}
        </>
      )}
    </RACCheckbox>
  )
}
