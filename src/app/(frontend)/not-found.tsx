import React from 'react'
import { text, Text } from '@/ui/components/Text'
import Image from 'next/image'
import { Link } from '@/ui/components/Link'
import { cn } from '@/utilities/cn'
import { MoveLeftIcon } from 'lucide-react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getLocaleOrDefault } from '@/app/(frontend)/_utils/get-local-or-default'
import babyEucalyptus from './_images/baby-eucalyptus.png'
export default async function NotFound() {
  const supportedLocale = await getLocaleOrDefault()

  const notFoundPage = await getCachedGlobal({ slug: 'not-found-page', locale: supportedLocale })()

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-secondary-100 heropattern-texture-primary-100 ~px-4/8">
      <div className="relative z-10 mx-auto flex max-w-prose flex-col items-center justify-center">
        <div className="relative flex flex-col items-center justify-center">
          <Image
            priority
            className="absolute z-0 opacity-50 "
            width={400}
            alt=""
            src={babyEucalyptus}
          />
          <Text as="h1" ty="h1" className="relative text-center font-bold text-secondary-800">
            {notFoundPage.title}
          </Text>
          <Text ty="h2" className="relative text-center font-bold  text-secondary-800">
            {notFoundPage.subtitle}
          </Text>
        </div>

        <div className="group relative flex cursor-pointer items-center gap-2 rounded-full px-6 py-4 text-black underline-offset-4 ~mt-8/12">
          <MoveLeftIcon className="relative transition-all group-hover:-translate-x-1" />
          <Link href="/" className={cn(text({ ty: 'subtitle' }), 'group-hover:underline ')}>
            {notFoundPage.backToStartPage}
          </Link>
        </div>
      </div>
    </section>
  )
}
