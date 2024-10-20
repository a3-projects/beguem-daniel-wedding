import { RosesSvg } from '@/app/(frontend)/[lang]/_components/illustrations/RosesSvg'
import { StartPage } from '@/payload-types'
import { Text } from '@/ui/components/Text'
import { cn } from '@/ui/utils/utils'
import { InfinityIcon } from 'lucide-react'
import { ComponentProps } from 'react'

export interface SectionCountdownProps {
  translations: StartPage['countdown']
}
export const SectionCountdown = (props: SectionCountdownProps & ComponentProps<'section'>) => {
  const { children, translations, className } = props

  return (
    <section className={cn('~pb-12/20', className)}>
      <RosesSvg />

      <div className="flex flex-col ~mt-20/24 bg-primary-50/50 heropattern-texture-primary-100">
        <div className="flex w-full items-center ~gap-4/8">
          <div className="h-[6px] border-t border-b border-r border-primary-100 flex-grow rounded rounded-l-none"></div>
          <InfinityIcon strokeWidth={1} className="text-primary-200" />
          <div className="h-[6px] border-t border-b border-l border-primary-100 flex-grow rounded rounded-r-none"></div>
        </div>

        <div className="~p-3xs max-w-prose mx-auto flex flex-col ~gap-16/20 ~py-16/20">
          <Text ty="h5" className="max-w-prose mx-auto font-serif text-center">
            {translations.title}
          </Text>

          <div className="relative flex items-center justify-center">{children}</div>
        </div>

        <div className="flex w-full items-center ~gap-4/8">
          <div className="h-[6px] border-t border-b border-r border-primary-100 flex-grow rounded rounded-l-none"></div>
          <InfinityIcon strokeWidth={1} className="text-primary-200" />
          <div className="h-[6px] border-t border-b border-l border-primary-100 flex-grow rounded rounded-r-none"></div>
        </div>
      </div>
    </section>
  )
}
