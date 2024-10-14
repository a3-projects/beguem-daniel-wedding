import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { TypedLocale } from 'payload'
import { notFound, redirect } from 'next/navigation'

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'tr' }, { lang: 'sr' }]
}

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

  const result = await payload.findGlobal({
    slug: 'start-page',
    overrideAccess: draft,
    locale: lang,
  })

  return result || null
})
