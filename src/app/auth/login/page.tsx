"use client"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/config/hooks';
import { loginSelector } from '@/store/slice/loginslice';
import { ACTIVATION, LOGIN } from '@/store/action/action';
import { Activation, Login } from '@/store/model/model';
import { buildAction } from '@/lib/util';
import { schema, FormData } from './config';
import Input from '@/components/Input';
import CheckBox from '@/components/CheckBox';
import storageService from '@/service/storage';
import Config from '@/constant/config';
import Link from 'next/link';

type Props = {
  params: {},
  searchParams: {
    activationKey: string
  }
}

export default function Login({ searchParams: { activationKey } }: Props) {

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { token, success, firstLogin } = useAppSelector(loginSelector)
  const tokenFromStorage = storageService.getItem(Config.ACCESS_TOKEN)
  
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
  }
    = useForm<FormData>({
      mode: 'onBlur',
      defaultValues: {
        username: '',
        password: '',
        rememberMe: false
      },
      resolver: yupResolver(schema),
    })
  useEffect(() => {
    if (activationKey) {
      const param: Activation = {
        token: activationKey
      }
      const action = buildAction(ACTIVATION, false, param)
      dispatch(action)
    }
  }, [activationKey, dispatch])
  useEffect(() => {
    if (success) {
      if (tokenFromStorage) {
        router.push('/')
      }
      else if (firstLogin) {
        const { username } = getValues()
        router.push(`/auth/reset?login=${username}`)
      }

    }
  }, [success, router, firstLogin, getValues, tokenFromStorage])

  function onSubmit(data: FormData) {
    const action = buildAction(LOGIN, true, data)
    dispatch(action)
  }


  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='p-3 mt-4 w-500 rounded shadow shadow-md'>
        <h5 className='text-center text-secondary'>please login</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            valid={!!errors.username}
            touch={!!touchedFields.username}
            textLabel='User name'
            textInput='username'
            errorMessage={errors?.username?.message}
            register={register('username')}
          />
          <Input
            type='password'
            valid={!!errors.password}
            touch={!!touchedFields.password}
            textLabel='Password'
            textInput='password'
            errorMessage={errors?.password?.message}
            register={register('password')}
          />
          <CheckBox
            textLabel='remember'
            register={register('rememberMe')}
          />
          <div className='d-flex align-items-center '>
            <button type="submit" className="btn btn-primary m-3 pr-4 pl-4">login</button>
            <Link href='/auth/forgot' className="d-block text-danger text-decoration-none">forgot password</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

