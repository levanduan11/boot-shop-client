import * as yup from "yup";

export const schema = yup.object({
  currentPassword: yup.string().trim().required('current password is required'),
  newPassword: yup.string().trim().required('new password is required'),
  newPasswordConfirm: yup.string().trim().required('new password confirm is required'),
})

export type FormData = yup.InferType<typeof schema>
