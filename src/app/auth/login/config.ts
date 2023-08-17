
import * as yup from "yup";

export const schema = yup.object({
  username: yup.string().trim().required('username is required'),
  password: yup.string().trim().required('password is required'),
  rememberMe: yup.boolean().required()
})

export type FormData = yup.InferType<typeof schema>
