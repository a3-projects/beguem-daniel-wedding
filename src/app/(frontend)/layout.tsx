import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'
import { Playfair_Display, Poppins } from 'next/font/google'

import React from 'react'

import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'

const sansFont = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sans',
})
const serifFont = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const currentTime = new Date().toLocaleString()

  return (
    <html className={cn(sansFont.variable, serifFont.variable)} lang="de" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" media="(prefers-color-scheme: light)" />
        <link
          href="/favicon-dark.ico"
          rel="icon"
          sizes="32x32"
          media="(prefers-color-scheme: dark)"
        />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link
          href="/favicon.svg"
          rel="icon"
          type="image/svg+xml"
          media="(prefers-color-scheme: light)"
        />
        <link
          href="/favicon-dark.svg"
          rel="icon"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body>
        <Providers>
          {/* <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <LivePreviewListener /> */}

          {children}
        </Providers>
        <div
          className="fixed bottom-0 bg-white size-2 right-0 p-[1px] border text-[10px]"
          title={currentTime}
        ></div>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
