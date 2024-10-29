import { Media } from '@/payload-types'
import { ButtonLink } from '@/ui/components/ButtonLink'
import { text, Text } from '@/ui/components/Text'
import { cn } from '@/ui/utils/utils'
import { extractString } from '@/utilities/extract-string'
import Image from 'next/image'
import { ComponentProps } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

export const heroBottomBow = tv({
  slots: {
    base: 'min-h-screen flex flex-col justify-end  w-full overflow-hidden relative',
    title: 'font-serif text-center text-white [text-shadow:0_0_5px_rgba(255,255,255,1)]',
    subtitle: 'font-serif text-center text-white [text-shadow:0_0_5px_rgba(255,255,255,1)]',
    body: 'relative z-10 flex flex-col ~gap-8/12 items-center ',
    description:
      'text-center text-white  max-w-prose font-sans  ~px-4/8 [text-shadow:0_0_5px_rgba(0,0,0,0.3)]',
    bow: 'w-full fill-current text-white translate-y-1',
    shadow:
      'w-full h-full z-0 bg-gradient-to-t from-primary-400 to-primary-400/10 absolute bottom-0 left-1/2 -translate-x-1/2',
  },
})

export interface HeroBottomBowProps extends VariantProps<typeof heroBottomBow> {
  title: string
  subtitle: string
  description: string
  backgroundImage: Media | string
  buttonText: string
  buttonLink: string
}

export const HeroBottomBow = (props: HeroBottomBowProps & ComponentProps<'section'>) => {
  const {
    backgroundImage,
    title,
    subtitle,
    buttonText,
    buttonLink,
    description,
    className,
    ...rest
  } = props

  const styles = heroBottomBow()

  return (
    <section className={cn(styles.base(), className)} {...rest}>
      <Image
        priority
        className="w-full h-full object-cover block absolute -z-10 hero-image"
        src={extractString(backgroundImage, 'url')}
        fill
        alt=""
        loading="eager"
        aria-hidden="true"
      />

      <div className={styles.body()}>
        <div>
          <div className="relative">
            <div className="hero-circle w-[20%] bottom-0 -translate-x-[20%]  z-10 translate-y-[70%] absolute">
              <div className="border border-white/20  aspect-square rounded-full  bg-white/10"></div>
            </div>
            <div className="hero-circle w-[12%] bottom-0 -translate-x-[60%] -z-10 absolute">
              <div className="border border-white/20  aspect-square rounded-full bg-white/10"></div>
            </div>
            <div className="hero-circle w-[10%] bottom-0 translate-x-[200%]  z-10 -translate-y-[150%] absolute">
              <div className="border border-white/20  aspect-square rounded-full  bg-white/10"></div>
            </div>
            <div className="hero-circle w-[15%] bottom-0  right-0 -translate-x-[150%] z-10 -translate-y-[100%] absolute">
              <div className="delay-300 border border-white/20 aspect-square rounded-full  bg-white/10"></div>
            </div>
            <div className="hero-circle w-[20%] bottom-0 right-0 translate-x-[50%] z-10 translate-y-[70%] absolute">
              <div className="border border-white/20 aspect-square rounded-full bg-white/10"></div>
            </div>
            <div className="hero-circle w-[25%] bottom-0 right-0  translate-x-[20%] z-10 translate-y-[10%] absolute">
              <div className="border border-white/20 aspect-square rounded-full  bg-white/10"></div>
            </div>
            <Text ty="hero" as="h1" className={styles.title()}>
              {title}
            </Text>
          </div>
          <Text ty="h1" className={styles.subtitle()}>
            {subtitle}
          </Text>
        </div>

        <div className="max-w-prose">
          <Text ty="subtitle" className={styles.description()}>
            {description}
          </Text>
        </div>

        {/* <ButtonLink
          className={text({ ty: 'subtitle' })}
          href={buttonLink}
          color="primary"
          inverted
          size="lg"
        >
          {buttonText}
        </ButtonLink> */}
        <svg className={styles.bow()} viewBox="0 0 1920 150" version="1.1">
          <g transform="matrix(1,0,0,1,0,-930.973)">
            <path
              className="fill-current"
              d="M0,1011.08C274.643,960.493 604.892,930.973 960,930.973C1315.11,930.973 1645.36,960.493 1920,1011.08L1920,1080L0,1080L0,1011.08Z"
            ></path>
          </g>
        </svg>
      </div>

      <div className={styles.shadow()}></div>
    </section>
  )
}
