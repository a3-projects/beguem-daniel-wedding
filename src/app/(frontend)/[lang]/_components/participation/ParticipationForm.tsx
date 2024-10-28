'use client'

import {
  ParticipationFormValues,
  getParticipationSchema,
} from '@/app/(frontend)/[lang]/_components/participation/ParticipationFormValues'
import { participate } from '@/app/(frontend)/actions/participate'
import { Button } from '@/ui/components/Button'
import { TextField } from '@/ui/components/TextField'
import { AlertCircleIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useActionState, useEffect, useTransition } from 'react'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StartPage } from '@/payload-types'
import { Text } from '@/ui/components/Text'
import { useParams, useRouter } from 'next/navigation'
import { Checkbox } from '@/ui/components/Checkbox'
import { cn } from '@/ui/utils/utils'

export interface ParticipationFormProps {
  startPage: StartPage
}

export const ParticipationForm = (props: ParticipationFormProps) => {
  const {
    startPage: { pariticipation, general },
  } = props
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ParticipationFormValues>({
    resolver: zodResolver(getParticipationSchema(pariticipation.form)),
    mode: 'onBlur',
    defaultValues: {
      participants: [{ name: '' }],
      participantsKid: [{ name: '' }],
    },
  })

  const [state, participateAction, _] = useActionState(participate, null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const params = useParams()

  const handleFormSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault()

    startTransition(async () => {
      await participateAction(data)
    })
  })

  useEffect(() => {
    if (state?.success) {
      router.push(`/${params.lang}/participiation-successfully-sent`)
    } else if (state?.error) {
      console.error('Error:', state.error)
    }
  }, [state, router, params.lang])

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
    }, 0) * pariticipation.form.makeupHairPrice

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
          <div className="flex gap-4" key={field.id}>
            <TextField
              placeholder={pariticipation.form.paricipantPlaceholder}
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
              label={index === 0 ? pariticipation.form.participants : ''}
              errors={errors.participants?.[index]?.name}
              {...register(`participants.${index}.name`)}
            />
            <div className="flex flex-col items-center ">
              <div className={cn({ 'opacity-0 h-0': index > 0 }, 'pb-1')}>
                {pariticipation.form.hairdresser}*
              </div>
              <div className="max-h-input flex items-center justify-center flex-grow">
                <Controller
                  name={`participants.${index}.hairdresser`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox isSelected={field.value} onChange={field.onChange} />
                  )}
                />
                {errors.participants?.[index]?.hairdresser?.message}
              </div>
            </div>
            <div className="flex flex-col items-center ">
              <div className={cn({ 'opacity-0 h-0': index > 0 }, 'pb-1')}>
                {pariticipation.form.makeup}*
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
          {pariticipation.form.addParticipant}
        </Button>
        <Text ty="caption" className="fl-text-step--1 flex gap-1 text-neutral-500">
          *{pariticipation.form.makeupHairInfo} ({makeupHairSum}€)
        </Text>
      </div>
      <div className="flex flex-col ~gap-2/4">
        {participantKidFields.map((field, index) => (
          <TextField
            key={field.id}
            placeholder={pariticipation.form.paricipantKidPlaceholder}
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
            label={index === 0 ? pariticipation.form.participantKid : ''}
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
          {pariticipation.form.addParticipantKid}
        </Button>
      </div>

      <Button size="lg" isPending={isPending || isSubmitting} type="submit">
        {pariticipation.form.buttonText}
      </Button>
      {state?.error && (
        <Text
          as="div"
          className="bg-red-50  ~p-4/8  border border-destructive-500 flex gap-2 ~mt-2"
        >
          <AlertCircleIcon className=" flex-shrink-0 mt-[5px] svg-font-size-scale flex gap-4 text-destructive-500" />
          <div>
            <p>{pariticipation.form.unexpectedError}</p>
            <a
              href={`tel:${general.phoneNumber}`}
              className="block underline-offset-2 underline mt-4"
            >
              <p>{general.phoneNumber}</p>
            </a>
          </div>
        </Text>
      )}
    </form>
  )
}
