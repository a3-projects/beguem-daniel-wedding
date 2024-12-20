import { StartPage } from '@/payload-types'
import { InfinityIcon } from 'lucide-react'
import { Text } from '@/ui/components/Text'
import RichText from '@/components/RichText'
export interface SectionInformationProps {
  startPage: StartPage
}

export const SectionInformation = (props: SectionInformationProps) => {
  const {
    startPage: { information },
  } = props

  return (
    <section className=" ~py-16/24 ~px-4/8 relative bg-primary-50" id="information">
      <div className="~px-4/8 max-w-prose mx-auto flex flex-col items-center ~gap-2/4 ">
        <Text ty="h5" className="max-w-prose mx-auto font-serif text-center">
          {information.title}
        </Text>
        <Text className="max-w-prose text-center">{information.subtitle}</Text>
      </div>
      <div className="~p-4/8 max-w-prose mx-auto flex flex-col items-center ~gap-2/4 ~py-8/12">
        <div className="flex w-full items-center ~gap-4/8">
          <InfinityIcon strokeWidth={1} className="text-primary-300" />

          <div className="h-[6px] border border-primary-300 flex-grow rounded"></div>
          <InfinityIcon strokeWidth={1} className="text-primary-300" />
        </div>
      </div>
      <div className="max-w-prose prose mx-auto">
        <RichText content={information.description} />
      </div>
    </section>
  )
}
