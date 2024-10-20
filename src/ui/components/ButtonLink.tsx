'use client'

import { button } from '@/ui/components/Button'
import { Link } from '@/ui/components/Link'
import React, { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonLink = tv({
  extend: button,
})

interface ButtonLinkProps extends VariantProps<typeof buttonLink> {}

export const ButtonLink = (props: ButtonLinkProps & ComponentProps<typeof Link>) => {
  const { variant, color, circle, size, inverted, className, ...rest } = props
  return (
    <Link className={buttonLink({ variant, color, circle, size, inverted, className })} {...rest} />
  )
}
