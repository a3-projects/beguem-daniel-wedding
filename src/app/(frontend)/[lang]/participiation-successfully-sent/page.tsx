import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { TypedLocale } from 'payload'
import { notFound, redirect } from 'next/navigation'
import { Button } from '@/ui/components/Button'
import { CheckCircleIcon, CheckIcon, MoveLeftIcon } from 'lucide-react'
import { text, Text } from '@/ui/components/Text'
import { queryStartPageByLang } from '@/app/(frontend)/[lang]/page'
import { cn } from '@/ui/utils/utils'
import { Link } from '@/ui/components/Link'

import Image from 'next/image'
import babyEucalyptus from './_images/baby-eucalyptus.png'
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

  const {
    pariticipation: { formSuccess },
  } = page

  return (
    <>
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-secondary-50 ~px-4/8"
      >
        <Image
          className="-right-[10%] opacity-20 fixed w-full z-0 pointer-events-none "
          alt=""
          src={babyEucalyptus}
        />

        <div className="relative z-10 mx-auto flex max-w-prose flex-col items-center justify-center">
          <CheckCircleIcon className=" text-secondary-400" strokeWidth={2} size="50" />

          <Text as="h1" ty="h3" className="text-center ~mt-8/12 font-serif">
            {formSuccess.title}
          </Text>
          <Text ty="subtitle" className="text-center ~mt-8/12">
            {formSuccess.subtitle}
          </Text>
          <div className="group flex cursor-pointer items-center gap-2 rounded-full px-6 py-4 text-black underline-offset-4 ~mt-8/12">
            <MoveLeftIcon className="relative transition-all group-hover:-translate-x-1" />
            <Link
              href={`/${lang}`}
              className={cn(text({ ty: 'subtitle' }), 'group-hover:underline ')}
            >
              {formSuccess.backToStartPage}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
