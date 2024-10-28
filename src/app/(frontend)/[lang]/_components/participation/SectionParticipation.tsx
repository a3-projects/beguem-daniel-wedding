import { ParticipationForm } from '@/app/(frontend)/[lang]/_components/participation/ParticipationForm'
import eucalyptusWatercolorsBottom from './images/eucalyptus-watercolors-bottom.png'
import eucalyptusWatercolorsTop from './images/eucalyptus-watercolors-top.png'
import logo from './images/beguem-daniel-logo-diamond.svg'

import Image from 'next/image'
import { text, Text } from '@/ui/components/Text'
import { StartPage } from '@/payload-types'
import { interpolate } from '@/utilities/interpolate'
import { PhoneIcon } from 'lucide-react'
import { cn } from '@/utilities/cn'
export interface SectionParticipationProps {
  startPage: StartPage
  deadlineDate: string
}
export const SectionParticipation = (props: SectionParticipationProps) => {
  const { startPage, deadlineDate } = props
  const { pariticipation, general } = startPage
  const deadlineDateTime = new Date(general.participationDeadline)
  const isDeadlinePassed = deadlineDateTime < new Date()
  return (
    <section className="bg-white ~py-24/32 ~my-60/80 ~px-2/8 relative" id="teilnahme-bestaetigen">
      <div className="absolute top-0 left-0 max-w-[50%]">
        <Image className="overflow-visible" src={eucalyptusWatercolorsTop} alt="" />
      </div>
      <div className="absolute bottom-0 right-0 max-w-[50%]">
        <Image className="overflow-visible" src={eucalyptusWatercolorsBottom} alt="" />
      </div>
      <div className="~pa-4/8 flex items-center justify-center mx-auto -translate-x-1/2 left-1/2 z-10 absolute top-0 -translate-y-1/2">
        <Image width={140} height={140} src={logo} alt="" />
      </div>
      <div className="mx-auto ~mt-6/8 z-10 max-w-[640px] relative p-[4px] border border-primary-300">
        <div className="~px-4/12 ~py-12/20 border border-primary-300 bg-white/80 backdrop-blur-sm">
          {isDeadlinePassed && (
            <div className="flex flex-col items-center ~gap-4/8">
              <Text ty="h5" as="h2" className="font-serif   text-center">
                Die Teilnahmefrist ist abgelaufen
              </Text>
              <Text className="text-center">Bitte ruf uns an oder schreibe uns auf WhatsApp.</Text>
              <a
                href={`tel:${general.phoneNumber}`}
                className={cn(
                  text({ ty: 'subtitle' }),
                  'flex items-center gap-2 underline-offset-2 text-secondary-500 underline mt-4',
                )}
              >
                <PhoneIcon className="svg-font-size-scale" />
                <p>{general.phoneNumber}</p>
              </a>
            </div>
          )}

          {!isDeadlinePassed && (
            <>
              <Text ty="h5" as="h2" className="font-serif ~pb-6/8   text-center">
                {pariticipation.title}
              </Text>
              <Text ty="body" className="text-center text-neutral-950 ~pb-6/8">
                {pariticipation.subtitle}
              </Text>
              <ParticipationForm startPage={startPage} />
              <Text as="h2" className="~mt-4/8 text-neutral-500 text-center">
                {interpolate(startPage.general.participationDeadlineInformation, {
                  deadlineDate,
                })}
              </Text>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
