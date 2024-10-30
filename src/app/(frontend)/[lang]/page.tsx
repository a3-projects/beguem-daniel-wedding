import type { Metadata } from 'next'

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
import { text, Text } from '@/ui/components/Text'
import { interpolate } from '@/utilities/interpolate'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { SUPPORTED_LOCALES } from '@/app/(frontend)/[lang]/_constants/supported-locales'
import { getLocaleOrDefault } from '@/app/(frontend)/_utils/get-local-or-default'

export const dynamicParams = true

export async function generateStaticParams() {
  // do not delete this, otherwise SSR pages won't be cached
  return []
}

type Args = {
  params: Promise<{
    lang?: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { lang } = await paramsPromise

  if (!lang) {
    const supportedLocale = await getLocaleOrDefault()

    return redirect(`/${supportedLocale}`)
  }

  if (!SUPPORTED_LOCALES.includes(lang)) {
    notFound()
  }

  const page = await queryStartPageByLang({
    lang,
  })

  if (!page) {
    notFound()
  }

  const startPage = page
  const { general, start } = startPage
  const weddingDateFormatted = new Date(general.weddingDate).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const deadlineDate = new Date(general.participationDeadline).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  return (
    <>
      <div>
        <LanguageSelect lang={lang} />
        <HeroBottomBow
          subtitle={weddingDateFormatted}
          buttonLink={'#teilnahme-bestaetigen'}
          {...start}
        />
        <SectionCountdown startPage={startPage}>
          <Countdown endTime={general.weddingDate} startPage={startPage} />
        </SectionCountdown>
        <div className="mx-auto items-center justify-center flex flex-col ~px-4/8">
          <Text className="text-center" as="h2" ty="subtitle">
            {interpolate(startPage.general.participationDeadlineInformation, {
              deadlineDate,
            })}
          </Text>
          <ButtonLink
            className={text({
              ty: 'subtitle',
              className: 'align-self-center justify-self-center ~mt-8/12',
            })}
            href={'#teilnahme-bestaetigen'}
            color="primary"
            size="lg"
          >
            {start.buttonText}
          </ButtonLink>
        </div>

        <SectionLocation startPage={startPage} />

        <SectionInformation startPage={startPage} />

        <SectionParticipation startPage={startPage} deadlineDate={deadlineDate} />

        <Footer startPage={startPage} />
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

  const result = await getCachedGlobal({
    slug: 'start-page',
    overrideAccess: draft,
    locale: lang,
  })()

  return result || null
})
