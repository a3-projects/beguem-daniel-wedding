import { StartPage } from '@/payload-types'
import { ButtonStart } from '@/ui/components/Button'
import { ButtonLink } from '@/ui/components/ButtonLink'
import { Text } from '@/ui/components/Text'
import { extractString } from '@/utilities/extract-string'
import { ClockIcon, InfinityIcon, MapPinIcon, MapPinnedIcon } from 'lucide-react'
import Image from 'next/image'
export interface SectionLocationProps {
  startPage: StartPage
}
export const SectionLocation = (props: SectionLocationProps) => {
  const {
    startPage: { location },
  } = props
  return (
    <section className="bg-white ~py-32/40 ~px-4/8 relative" id="location">
      <div className="~p-4/8 max-w-prose mx-auto flex flex-col items-center ~gap-2/4 ~py-16/20">
        <Text ty="h5" className="max-w-prose mx-auto font-serif text-center">
          {location.title}
        </Text>
        <div className="flex w-full items-center ~gap-4/8">
          <InfinityIcon strokeWidth={1} className="text-primary-300" />

          <div className="h-[6px] border border-primary-100 flex-grow rounded"></div>
          <InfinityIcon strokeWidth={1} className="text-primary-300" />
        </div>
      </div>

      <div className="grid container mx-auto lg:grid-cols-2 ~gap-20/32 ~px-8/12">
        <div className="relative max-w-[500px] w-full justify-self-center lg:justify-self-end aspect-square">
          <div className="p-[8px] border bg-white relative overflow-hidden border-primary-300 w-full  h-full shadow-lg">
            <Image
              width={500}
              height={500}
              className="w-full h-full scale-110 overflow-hidden object-cover absolute blur-sm top-0 left-0 z-0"
              alt=""
              src={extractString(location.image1, 'url')}
            />
            <div className="border relative border-primary-300 overflow-hidden w-full h-full">
              <Image
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform ease-in-out duration-500 hover:scale-105"
                alt=""
                src={extractString(location.image1, 'url')}
              />
            </div>
          </div>
          <div className="p-[8px]  overflow-hidden border bg-white border-primary-300 shadow-lg max-w-[200px] w-1/3 aspect-square absolute -right-[30px] top-[50px]">
            <Image
              width={200}
              height={200}
              className="w-full h-full scale-110 object-cover absolute blur-sm top-0 left-0 z-0"
              alt=""
              src={extractString(location.image2, 'url')}
            />
            <div className="w-full relative h-full border  border-primary-300 overflow-hidden ">
              <Image
                width={200}
                height={200}
                className="w-full h-full object-cover transition-transform ease-in-out duration-500 hover:scale-105"
                alt=""
                src={extractString(location.image2, 'url')}
              />
            </div>
          </div>
          <div className="p-[8px]  overflow-hidden border bg-white border-primary-300 shadow-lg max-w-[200px] w-1/3 aspect-square absolute -left-[30px] bottom-[50px]">
            <Image
              width={200}
              height={200}
              className="w-full h-full scale-110 object-cover absolute blur-sm top-0 left-0 z-0"
              alt=""
              src={extractString(location.image3, 'url')}
            />
            <div className="w-full relative h-full border  border-primary-300 overflow-hidden ">
              <Image
                width={200}
                height={200}
                className="w-full h-full object-cover transition-transform ease-in-out duration-500 hover:scale-105"
                alt=""
                src={extractString(location.image3, 'url')}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start ~gap-12/16 h-full">
          <div>
            <Text className="font-bold " ty="h3" as="h3">
              {location.name}
            </Text>
            <Text as="div" ty="subtitle" className="flex gap-2 ~mt-6/10">
              <ClockIcon className="svg-font-size-scale mt-1" />
              <h3 key="str">{location.time}</h3>
            </Text>
            <Text as="div" ty="subtitle" className="flex gap-2 ~mt-6/10">
              <MapPinIcon className="svg-font-size-scale mt-1" />
              <div className="flex flex-col">
                {location.address.split(',').map((str) => {
                  return <h3 key={str}>{str}</h3>
                })}
              </div>
            </Text>
          </div>
          <div>
            <ButtonLink
              size="lg"
              color="secondary"
              href={location.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ButtonStart>
                <MapPinnedIcon />
              </ButtonStart>
              {location.buttonText}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
