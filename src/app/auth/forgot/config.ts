import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().trim().required('email is required')
          .email("Email Invalid"),
})

export type FormData = yup.InferType<typeof schema>