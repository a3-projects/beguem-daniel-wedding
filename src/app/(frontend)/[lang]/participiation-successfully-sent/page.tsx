import React from 'react'
import { TypedLocale } from 'payload'
import { notFound, redirect } from 'next/navigation'
import { CheckCircleIcon, MoveLeftIcon } from 'lucide-react'
import { text, Text } from '@/ui/components/Text'
import { queryStartPageByLang } from '@/app/(frontend)/[lang]/page'
import { cn } from '@/ui/utils/utils'
import { Link } from '@/ui/components/Link'

import Image from 'next/image'
import logo from './_images/beguem-daniel-logo-diamond.svg'
import { SUPPORTED_LOCALES } from '@/app/(frontend)/[lang]/_constants/supported-locales'

export const dynamicParams = true

type Args = {
  params: Promise<{
    lang?: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { lang } = await paramsPromise

  if (!lang || !SUPPORTED_LOCALES.includes(lang)) {
    return notFound()
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
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary-50/50 heropattern-texture-primary-100 ~px-4/8"
      >
        {/* <Image
          className="-right-[10%] opacity-20 fixed w-full z-0 pointer-events-none "
          alt=""
          src={babyEucalyptus}
        /> */}

        <div className="relative z-10 mx-auto flex max-w-prose flex-col items-center justify-center">
          <Image className="" width={160} alt="" src={logo} />
          <div className="flex gap-2 items-center ~mt-8/12">
            <CheckCircleIcon className=" text-secondary-400" strokeWidth={1} size="40" />
            <Text as="h1" ty="h4" className="text-center  font-serif">
              {formSuccess.title}
            </Text>
          </div>

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
