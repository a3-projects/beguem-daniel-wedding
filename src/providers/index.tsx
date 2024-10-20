'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { RouterProvider } from 'react-aria-components'

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  let router = useRouter()

  return <RouterProvider navigate={router.push}>{children}</RouterProvider>
}
