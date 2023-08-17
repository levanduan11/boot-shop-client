import * as yup from "yup";

export const schema = yup.object({
  oldPass: yup.string().trim().required('old password is required'),
  newPass: yup.string().trim().required('new password is required'),
})

export type FormData = yup.InferType<typeof schema>
