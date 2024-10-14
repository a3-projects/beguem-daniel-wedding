import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { TypedLocale } from 'payload'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }, { lang: 'sr' }]
}

type Args = {
  params: Promise<{
    lang?: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { lang } = await paramsPromise

  if (!lang) {
    return <PayloadRedirects url={'/en'} />
  }

  const page = await queryStartPageByLang({
    lang,
  })

  if (!page) {
    return notFound()
  }
  console.log('page', page)

  const { title, description } = page

  return (
    <article className="pt-16 pb-24 ">
      <h1>{title}</h1>
      <p>{description}</p>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }): Promise<Metadata> {
  const { lang } = await paramsPromise
  const page = await queryStartPageByLang({
    lang,
  })

  return {
    title: page.title,
    description: page.description,
  }
}

const queryStartPageByLang = cache(async ({ lang }: { lang: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayloadHMR({ config: configPromise })
  console.log('lang', lang, draft)

  const result = await payload.findGlobal({
    slug: 'start-page',
    overrideAccess: draft,
    locale: lang,
  })
  console.log('result', result)

  return result || null
})
