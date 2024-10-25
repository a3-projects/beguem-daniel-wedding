'use client'

import {
  ParticipationFormValues,
  getParticipationSchema,
} from '@/app/(frontend)/[lang]/_components/participation/ParticipationFormValues'
import { participate } from '@/app/(frontend)/actions/participate'
import { Button } from '@/ui/components/Button'
import { TextField } from '@/ui/components/TextField'
import { InfoIcon, PlusIcon, Trash2Icon, TrashIcon, XIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StartPage } from '@/payload-types'
import { Text } from '@/ui/components/Text'
import { useParams, useRouter } from 'next/navigation'
import { Checkbox } from '@/ui/components/Checkbox'
import { cn } from '@/ui/utils/utils'

export interface ParticipationFormProps {
  translations: StartPage['pariticipation']
}

export const ParticipationForm = (props: ParticipationFormProps) => {
  const { translations } = props
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ParticipationFormValues>({
    resolver: zodResolver(getParticipationSchema(translations.form)),
    mode: 'onBlur',
    defaultValues: {
      participants: [{ name: '' }],
      participantsKid: [{ name: '' }],
    },
  })

  const [state, participateAction, isPending] = useActionState(participate, null)
  const router = useRouter()
  const params = useParams()

  const handleFormSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault()
    await participateAction(data)

    router.push(`/${params.lang}/participiation-successfully-sent`)
  })
  const {
    fields: participantFields,
    append: addParticipant,
    remove: removeParticipant,
  } = useFieldArray({
    control,
    name: 'participants',
  })

  const {
    fields: participantKidFields,
    append: addParticipantKid,
    remove: removeParticipantKid,
  } = useFieldArray({
    control,
    name: 'participantsKid',
  })

  const participants = watch('participants')

  const makeupHairSum =
    participants.reduce((sum, participant) => {
      if (participant.hairdresser) {
        sum++
      }
      if (participant.makeup) {
        sum++
      }

      return sum
    }, 0) * translations.form.makeupHairPrice

  return (
    <form
      className="flex flex-col ~gap-6/10"
      onSubmit={(e) => {
        e.preventDefault()
        handleFormSubmit(e)
      }}
    >
      <div className="flex flex-col ~gap-2/4">
        {participantFields.map((field, index) => (
          <div className="flex gap-4">
            <TextField
              key={field.id}
              placeholder={translations.form.paricipantPlaceholder}
              endSlot={
                index > 0 && (
                  <TextField.Affix>
                    <Button
                      onPress={() => removeParticipant(index)}
                      color="neutral"
                      variant="ghost"
                      circle
                    >
                      <Trash2Icon />
                    </Button>
                  </TextField.Affix>
                )
              }
              label={index === 0 ? translations.form.participants : ''}
              errors={errors.participants?.[index]?.name}
              {...register(`participants.${index}.name`)}
            />
            <div className="flex flex-col items-center ">
              <div className={cn({ 'opacity-0 h-0': index > 0 }, 'pb-1')}>
                {translations.form.hairdresser}*
              </div>
              <div className="max-h-input flex items-center justify-center flex-grow">
                <Controller
                  name={`participants.${index}.hairdresser`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox isSelected={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col items-center ">
              <div className={cn({ 'opacity-0 h-0': index > 0 }, 'pb-1')}>
                {translations.form.makeup}*
              </div>
              <div className="max-h-input flex items-center justify-center flex-grow text-wrap-none">
                <Controller
                  name={`participants.${index}.makeup`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox isSelected={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          className="self-start"
          onPress={() => addParticipant({ name: '', makeup: false, hairdresser: false })}
          variant="outline"
          color="secondary"
          size="sm"
        >
          <Button.Start>
            <PlusIcon />
          </Button.Start>
          {translations.form.addParticipant}
        </Button>
        <Text ty="caption" className="fl-text-step--1 flex gap-1 text-neutral-500">
          *{translations.form.makeupHairInfo} ({makeupHairSum}€)
        </Text>
      </div>
      <div className="flex flex-col ~gap-2/4">
        {participantKidFields.map((field, index) => (
          <TextField
            key={field.id}
            placeholder={translations.form.paricipantKidPlaceholder}
            endSlot={
              index > 0 && (
                <TextField.Affix>
                  <Button
                    onPress={() => removeParticipantKid(index)}
                    color="neutral"
                    variant="ghost"
                    circle
                  >
                    <Trash2Icon />
                  </Button>
                </TextField.Affix>
              )
            }
            label={index === 0 ? translations.form.participantKid : ''}
            errors={errors.participantsKid?.[index]?.name}
            {...register(`participantsKid.${index}.name`)}
          />
        ))}

        <Button
          className="self-start"
          onPress={() => addParticipantKid({ name: '' })}
          variant="outline"
          color="secondary"
          size="sm"
        >
          <Button.Start>
            <PlusIcon />
          </Button.Start>
          {translations.form.addParticipantKid}
        </Button>
      </div>

      <Button size="lg" isPending={isPending || isSubmitting} type="submit">
        {translations.form.buttonText}
      </Button>
    </form>
  )
}
