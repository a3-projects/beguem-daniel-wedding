'use client'

import { cn } from '@/ui/utils/utils'
import { useEffect, useState, type ComponentPropsWithRef } from 'react'
import { Text } from '@/ui/components/Text'
import { StartPage } from '@/payload-types'
export type CountdownProps = {
  endTime: string
  translations: StartPage['countdown']
}
export const Countdown = (props: CountdownProps & ComponentPropsWithRef<'div'>) => {
  const { endTime, className, translations, ...rest } = props
  const calculateRemainingTime = () => {
    return getTimeDifference(new Date(), new Date(endTime))
  }
  type Time = { days: string; hours: string; minutes: string; seconds: string }
  const [remainingTime, setRemainingTime] = useState<Time>({
    // can't use calculateRemainingTime as it would cause hydration error because of the seconds
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  function getTimeDifference(date1: Date, date2: Date) {
    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(date1.getTime() - date2.getTime())

    // Convert milliseconds to days, hours, minutes, and seconds
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
      .toFixed(0)
      .padStart(2, '0')
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toFixed(0)
      .padStart(2, '0')
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60))
      .toFixed(0)
      .padStart(2, '0')
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000)
      .toFixed(0)
      .padStart(2, '0')

    return { days, hours, minutes, seconds }
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-4 ~gap-28/36', className)} {...rest}>
      <div className="flex flex-col items-center gap-4">
        <Text ty="h6" className="text-primary-500 uppercase font-serif">
          {translations.days}
        </Text>
        <div>
          <Text ty="h2" className="uppercase font-serif">
            {remainingTime.days}
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Text ty="h6" className="text-primary-500 uppercase font-serif text-center">
          {translations.hours}
        </Text>
        <div>
          <Text ty="h2" className="uppercase font-serif text-center">
            {remainingTime.hours}
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Text ty="h6" className="text-primary-500 uppercase font-serif text-center">
          {translations.minutes}
        </Text>
        <div>
          <Text ty="h2" className="uppercase font-serif text-center">
            {remainingTime.minutes}
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Text ty="h6" className="text-primary-500 uppercase font-serif text-center">
          {translations.seconds}
        </Text>
        <div>
          <Text ty="h2" className="uppercase font-serif text-center">
            {remainingTime.seconds}
          </Text>
        </div>
      </div>
    </div>
  )
}
