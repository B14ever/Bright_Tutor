import { apiSlice } from "../../../app/api/apiSlice";
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        forgotPassword: builder.mutation({
            query: (Email) => ({
              url: "/forgetPassword",
              method: "POST",
              body: { Email },
            }),
        }),
        emailVerification: builder.mutation({
            query: ({Code,Path}) => ({
              url: "/emailVerification",
              method: "POST",
              body: {Code,Path},
            }),
        }),
        resendCode: builder.mutation({
            query: (token) => ({
              url: "/emailVerification/requestcode",
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }),
          }),
        changePassword: builder.mutation({
            query: (data,token) => ({
              url: "/changePassword",
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
              body: data,
            }),
        }),
    })
})

export const { useLoginMutation, 
               useForgotPasswordMutation, 
               useChangePasswordMutation,
               useEmailVerificationMutation,
               useResendCodeMutation
               } = authApiSlice;