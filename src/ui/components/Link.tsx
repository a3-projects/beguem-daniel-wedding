'use client'
import React, { ComponentProps } from 'react'
import { Link as RACLink, LinkProps as RACLinkProps } from 'react-aria-components'

export interface LinkProps extends RACLinkProps {}

export const Link = (props: LinkProps & ComponentProps<'a'>) => {
  return <RACLink {...props} />
}
