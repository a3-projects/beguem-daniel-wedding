'use client'

import { cn } from '@/ui/utils/utils'
import { useEffect, useState, type ComponentPropsWithRef } from 'react'
import { Text } from '@/ui/components/Text'
import { StartPage } from '@/payload-types'
export type CountdownProps = {
  endTime: string
  startPage: StartPage
}
export const Countdown = (props: CountdownProps & ComponentPropsWithRef<'div'>) => {
  const {
    endTime,
    className,
    startPage: { countdown },
    ...rest
  } = props
  const calculateRemainingTime = () => {
    return getTimeDifference(new Date(), new Date(endTime))
  }
  type Time = { days: string; hours: string; minutes: string; seconds: string }
  const [remainingTime, setRemainingTime] = useState<Time>(calculateRemainingTime())

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
          {countdown.days}
        </Text>
        <div>
          <Text ty="h2" className="uppercase font-serif">
            {remainingTime.days}
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Text ty="h6" className="text-primary-500 uppercase font-serif text-center">
          {countdown.hours}
        </Text>
        <div>
          <Text ty="h2" className="uppercase font-serif text-center">
            {remainingTime.hours}
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Text ty="h6" className="text-primary-500 uppercase font-serif text-center">
          {countdown.minutes}
        </Text>
        <div>
          <Text ty="h2" className="uppercase font-serif text-center">
            {remainingTime.minutes}
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Text ty="h6" className="text-primary-500 uppercase font-serif text-center">
          {countdown.seconds}
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
