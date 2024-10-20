import { clsx, type ClassValue } from 'clsx'
import { composeRenderProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
