import { tv } from 'tailwind-variants'

export const focusRing = tv({
  base: 'outline outline-neutral-500 forced-colors:outline-[Highlight] outline-offset-2',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2',
    },
  },
})
