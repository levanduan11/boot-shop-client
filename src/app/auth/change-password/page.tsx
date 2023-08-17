"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, FormData } from './config';
import Input from '@/components/Input';
import { useAppDispatch } from '@/config/hooks';
import { buildAction } from '@/lib/util';
import { CHANGE_PASS } from '@/store/action/action';
import { useRouter } from 'next/navigation';
import { ChangePassword } from '@/model/form.model';

export default function ChangePassword() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, touchedFields } }
    = useForm<FormData>({
      mode: 'onBlur',
      defaultValues: {
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      },
      resolver: yupResolver(schema),
    })
  function handleChangePassword(data: FormData) {
    const {
      currentPassword,
      newPassword,
      newPasswordConfirm
    } = data
    if (newPassword !== newPasswordConfirm) {
      setError('newPasswordConfirm', {
        type: 'onBlur',
        message: 'password not match'
      })
    }
    const body: ChangePassword = {
      currentPassword,
      newPassword
    }
    const action = buildAction(CHANGE_PASS, true, body)
    dispatch(action)
    console.log(body);
    
  }
  function handleBack(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault()
    router.back()
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-light p-4'>
      <div className='p-3 mt-4 w-500 rounded shadow shadow-md'>
        <h5 className='text-center text-secondary'>change password</h5>
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <Input
            type='password'
            valid={!!errors.currentPassword}
            touch={!!touchedFields.currentPassword}
            textLabel='Old password'
            textInput='currentPassword'
            errorMessage={errors?.currentPassword?.message}
            register={register('currentPassword')}
          />
          <Input
            type='password'
            valid={!!errors.newPassword}
            touch={!!touchedFields.newPassword}
            textLabel='New Password'
            textInput='newPassword'
            errorMessage={errors?.newPassword?.message}
            register={register('newPassword')}
          />
          <Input
            type='password'
            valid={!!errors.newPasswordConfirm}
            touch={!!touchedFields.newPasswordConfirm}
            textLabel='New Password'
            textInput='newPasswordConfirm'
            errorMessage={errors?.newPasswordConfirm?.message}
            register={register('newPasswordConfirm')}
          />
          <button type="submit" className="btn btn-primary">save</button>
          <button
            onClick={handleBack}
            type="button"
            className="btn btn-success m-3">back</button>
        </form>
      </div>
    </div>
  )
}
