import { ParticipationForm } from '@/app/(frontend)/[lang]/_components/participation/ParticipationForm'
import eucalyptusWatercolorsBottom from './images/eucalyptus-watercolors-bottom.png'
import eucalyptusWatercolorsTop from './images/eucalyptus-watercolors-top.png'
import logo from './images/beguem-daniel-logo.svg'

import Image from 'next/image'
import { Text } from '@/ui/components/Text'
import { StartPage } from '@/payload-types'
export interface SectionParticipationProps {
  translations: StartPage['pariticipation']
}
export const SectionParticipation = (props: SectionParticipationProps) => {
  const { translations } = props
  return (
    <section className="bg-white ~py-24/32 ~my-60/80 ~px-2/8 relative" id="teilnahme-bestaetigen">
      <div className="absolute top-0 left-0 max-w-[50%]">
        <Image className="overflow-visible" src={eucalyptusWatercolorsTop} alt="" />
      </div>
      <div className="absolute bottom-0 right-0 max-w-[50%]">
        <Image className="overflow-visible" src={eucalyptusWatercolorsBottom} alt="" />
      </div>
      <div className="~pa-4/8 flex items-center justify-center mx-auto">
        <Image width={140} height={140} src={logo} alt="" />
      </div>
      <div className="mx-auto ~mt-6/8 z-10 max-w-[640px] relative p-[4px] border border-primary-300">
        <div className="~px-4/12 ~py-8/12 border border-primary-300 bg-white/80 backdrop-blur-sm">
          <Text ty="h5" as="h2" className="font-serif ~pb-6/8   text-center">
            {translations.title}
          </Text>
          <Text ty="body" className="text-center text-neutral-950 ~pb-6/8">
            {translations.subtitle}
          </Text>
          <ParticipationForm translations={translations} />
        </div>
      </div>
    </section>
  )
}
