"use client"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { schema, FormData } from './config';
import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/config/hooks';
import { buildAction } from '@/lib/util';
import { RESET_PASS } from '@/store/action/action';
import { resetSelector } from '@/store/slice/reset.slice';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginAfterResetSuccess } from '@/store/slice/loginslice';

export default function ResetPassword() {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(resetSelector)
  const router = useRouter()
  const params = useSearchParams()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields } }
    = useForm<FormData>({
      mode: 'onBlur',
      defaultValues: {
        oldPass: '',
        newPass: '',
      },
      resolver: yupResolver(schema),
    })
  useEffect(() => {
    if (status) {
      router.replace('/auth/login')
      dispatch(loginAfterResetSuccess())
    }
  }, [dispatch, router, status])
  function onSubmit(data: FormData) {
    let a = {
      ...data,
      username: params.get('login')
    }
    console.log(a);
    
    const action = buildAction(RESET_PASS, true, a)
    dispatch(action)
    dispatch(loginAfterResetSuccess())
    
  }
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='p-3 mt-4 w-500 rounded shadow shadow-md'>
        <h5 className='text-center text-secondary'>please change password</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type='password'
            valid={!!errors.oldPass}
            touch={!!touchedFields.oldPass}
            textLabel='Old password'
            textInput='oldPass'
            errorMessage={errors?.oldPass?.message}
            register={register('oldPass')}
          />
          <Input
            type='password'
            valid={!!errors.newPass}
            touch={!!touchedFields.newPass}
            textLabel='New Password'
            textInput='newPass'
            errorMessage={errors?.newPass?.message}
            register={register('newPass')}
          />

          <button type="submit" className="btn btn-primary">save</button>
        </form>
      </div>
    </div>
  );
}
