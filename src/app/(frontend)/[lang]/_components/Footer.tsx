import { StartPage } from '@/payload-types'
import { Text } from '@/ui/components/Text'
import { cn } from '@/ui/utils/utils'
import { InfinityIcon, PhoneIcon } from 'lucide-react'

export interface FooterProps {
  startPage: StartPage
}

export const Footer = (props: FooterProps) => {
  const {
    startPage: { footer, general },
  } = props
  return (
    <footer className="flex flex-col justify-center items-center ~gap-16/32 bg-secondary-300 w-full ~pb-24/32 heropattern-texture-secondary-200 ~mt-24/32">
      <div className="flex w-full items-center ~gap-4/8">
        <div className="h-[6px] border-t border-b border-r border-secondary-200 flex-grow rounded rounded-l-none"></div>
        <InfinityIcon strokeWidth={1} className="text-secondary-200" />
        <div className="h-[6px] border-t border-b border-l border-secondary-200 flex-grow rounded rounded-r-none"></div>
      </div>
      <div className="flex flex-col justify-center items-center ~gap-4/8 ~px-4/8">
        <Text ty="h5" as="h2" className=" font-serif ~gap-24/32 text-center">
          {footer.title}
        </Text>
        <Text ty="body" className="text-center">
          {footer.subtitle}!
        </Text>
        <a
          href={`tel:${general.phoneNumber}`}
          className={cn('flex gap-2 text-secondary-600  underline-offset-2 hover:underline')}
        >
          <div className="p-1 size-8 rounded-full border border-secondary-600 flex items-center justify-center">
            <PhoneIcon size="16" strokeWidth="2" />
          </div>
          <Text ty="subtitle">{general.phoneNumber}</Text>
        </a>
      </div>
    </footer>
  )
}
