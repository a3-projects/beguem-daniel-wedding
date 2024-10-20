import { cn } from '@/ui/utils/utils'
import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

export const main = tv({
  base: 'min-h-screen w-full relative z-0',
})

export interface MainProps extends VariantProps<typeof main> {}

const Main = (props: MainProps & ComponentProps<'main'>) => {
  const { children, className, ...rest } = props

  return (
    <main className={cn(Main({}), className)} {...rest}>
      {children}
    </main>
  )
}

export { Main }
