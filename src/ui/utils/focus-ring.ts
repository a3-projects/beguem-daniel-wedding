import { composeRenderProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

export const focusRing = tv({
  base: 'outline outline-secondary-500 forced-colors:outline-[Highlight] outline-offset-2',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2',
    },
  },
})
