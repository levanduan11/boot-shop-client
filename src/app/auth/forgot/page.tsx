"use client"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, FormData } from './config';
import Input from '@/components/Input';
import { ForgotPass } from '@/store/model/req.model';
import { buildAction } from '@/lib/util';
import { FORGOT_PASS_INIT } from '@/store/action/action';
import { useAppDispatch, useAppSelector } from '@/config/hooks';
import { forgotPasswordSelector } from '@/store/slice/forgot-password.slice';
import { useRouter } from 'next/navigation';


export default function ForgotPassword() {
  const dispatch = useAppDispatch()
  const { success } = useAppSelector(forgotPasswordSelector)
  const router = useRouter()
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
  }
    = useForm<FormData>({
      mode: 'onBlur',
      defaultValues: {
        email: '',
      },
      resolver: yupResolver(schema),
    })

  useEffect(() => {
    if (success) {
      router.push(`/auth/forgot-confirm?email='${getValues('email')}'`)
    }
  }, [getValues, router, success])
  function handleSendMail(data: FormData) {
    const { email } = data
    if (!email) {
      setError('email', {
        message: "please enter invalid your email",
        type: 'onChange'
      })
    }
    const body: ForgotPass = {
      email
    }
    const action = buildAction(FORGOT_PASS_INIT, true, body)
    dispatch(action)
  }

  function handleBack(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault()
    router.back()
  }

  return (
    <div className='d-flex justify-content-center p-4'>
      <div className='w-500 shadow p-4 rounded bg-light'>
        <form onSubmit={handleSubmit(handleSendMail)}>
          <div className="">
            <Input
              textLabel='Please enter your email'
              textInput='email'
              valid={!!errors.email}
              touch={!!touchedFields.email}
              errorMessage={errors?.email?.message}
              register={register('email')}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              disabled={!!errors.email || !getValues('email')}
            >send</button>
            <button
              className='btn btn-success m-2'
              onClick={handleBack}
            >
              back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
