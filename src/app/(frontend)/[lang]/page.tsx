import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { TypedLocale } from 'payload'
import { notFound, redirect } from 'next/navigation'
import { HeroBottomBow } from '@/app/(frontend)/[lang]/_components/HeroBottomBow'
import { SectionCountdown } from '@/app/(frontend)/[lang]/_components/countdown/SectionCountdown'
import { Countdown } from '@/app/(frontend)/[lang]/_components/countdown/Countdown'
import { SectionParticipation } from '@/app/(frontend)/[lang]/_components/participation/SectionParticipation'
import { Footer } from '@/app/(frontend)/[lang]/_components/Footer'
import { SectionLocation } from '@/app/(frontend)/[lang]/_components/SectionLocation'
import { SectionInformation } from '@/app/(frontend)/[lang]/_components/SectionInformation'
import { LanguageSelect } from '@/app/(frontend)/[lang]/_components/LanguageSelect'
import { ButtonLink } from '@/ui/components/ButtonLink'
import { text } from '@/ui/components/Text'
import Image from 'next/image'

// export async function generateStaticParams() {
//   return [{ lang: 'de' }, { lang: 'tr' }, { lang: 'sr' }]
// }

type Args = {
  params: Promise<{
    lang?: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { lang } = await paramsPromise

  if (!lang) {
    return redirect('/de')
  }

  const page = await queryStartPageByLang({
    lang,
  })

  if (!page) {
    return notFound()
  }

  const startPage = page
  const { countdown, footer, general, start, pariticipation, information, location } = startPage
  const weddingDate = new Date(general.weddingDate)
  const weddingDateFormatted = new Date(weddingDate).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  return (
    <>
      <div>
        <LanguageSelect lang={lang} />
        {start && (
          <HeroBottomBow
            subtitle={weddingDateFormatted}
            buttonLink={'#teilnahme-bestaetigen'}
            {...start}
          />
        )}
        {countdown && (
          <SectionCountdown translations={countdown}>
            <Countdown endTime={general.weddingDate} translations={countdown} />
          </SectionCountdown>
        )}
        <div className="mx-auto flex items-center justify-center">
          <ButtonLink
            className={text({ ty: 'subtitle', className: 'align-self-center justify-self-center' })}
            href={'#teilnahme-bestaetigen'}
            color="primary"
            size="lg"
          >
            {start.buttonText}
          </ButtonLink>
        </div>

        {location && <SectionLocation translations={location} />}

        {information && <SectionInformation translations={information} />}

        {pariticipation && <SectionParticipation translations={pariticipation} />}

        {footer && <Footer translations={footer} phoneNumber={general.phoneNumber} />}
      </div>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { lang } = await paramsPromise
  const page = await queryStartPageByLang({
    lang,
  })

  return {
    title: page.start?.title,
    description: page.general?.weddingDate,
  }
}

export const queryStartPageByLang = cache(async ({ lang }: { lang: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.findGlobal({
    slug: 'start-page',
    overrideAccess: draft,
    locale: lang,
  })

  return result || null
})
