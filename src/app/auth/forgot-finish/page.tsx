"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, FormData } from './config';
import Input from '@/components/Input';
import { ForgotPassFinish } from '@/model/form.model';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/config/hooks';
import { buildAction } from '@/lib/util';
import { FORGOT_PASS_FINISH, FORGOT_PASS_INIT } from '@/store/action/action';


export default function ForgotFinish() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    getValues,
  }
    = useForm<FormData>({
      mode: 'onBlur',
      defaultValues: {
        newPassword: '',
        newPasswordConfirm: '',
      },
      resolver: yupResolver(schema),
    })
  function handleSendMail(data: FormData) {
    const key = searchParams.get('resetKey')
    if (!key) return
    const { newPassword, newPasswordConfirm } = data
    if (newPassword !== newPasswordConfirm) {
      setError('newPasswordConfirm', {
        type: 'onBlur',
        message: 'password not match'
      })
      return
    }

    const body: ForgotPassFinish = {
      key,
      password: newPassword
    }
    const action = buildAction(FORGOT_PASS_FINISH, true, body)
    dispatch(action)

  }

  function handleGotoLogin(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault()
    router.push('/auth/login')
  }

  return (
    <div className='d-flex justify-content-center p-4'>
      <div className='w-500 bg-light rounded shadow  p-4'>
        <form onSubmit={handleSubmit(handleSendMail)}>
          <div className="">
            <Input
              textLabel='New Password'
              textInput='newPassword'
              valid={!!errors.newPassword}
              touch={!!touchedFields.newPassword}
              errorMessage={errors?.newPassword?.message}
              register={register('newPassword')}
            />
            <Input
              textLabel='Confirm New Password'
              textInput='newPassword'
              valid={!!errors.newPasswordConfirm}
              touch={!!touchedFields.newPasswordConfirm}
              errorMessage={errors?.newPasswordConfirm?.message}
              register={register('newPasswordConfirm')}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              disabled={!isValid}
            >change</button>
            <button
              onClick={handleGotoLogin}
              className='m-3 btn btn-success'>go to login page</button>
          </div>
        </form>
      </div>
    </div>
  )
}
