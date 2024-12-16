import {apiSlice} from "../redux/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: {...credentials},
            }),
        }),

        registerUser: builder.mutation({
            query: (credentials) => ({
                url: "/auth",
                method: "POST",
                body: {...credentials},
            }),
        }),

        verifyUser: builder.mutation({
            query: ({email, otp}) => ({
                url: `/auth/verify?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`,
                method: "POST",
            }),
        }),

        forgotPasswordUser: builder.mutation({
            query: ({email}) => ({
                url: `/user/forgot-password?email=${encodeURIComponent(email)}`,
                method: "PUT",
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterUserMutation,
    useVerifyUserMutation,
    useForgotPasswordUserMutation,
} = authApiSlice;
