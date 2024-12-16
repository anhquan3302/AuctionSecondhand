import { apiSlice } from "../redux/api/apiSlice.js";

export const addressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // API tạo địa chỉ
    createAddress: builder.mutation({
      query: (addressData) => ({
        url: "/address",
        method: "POST", // Phương thức POST
        body: addressData,
      }),
    }),

    // API lấy tất cả địa chỉ theo userId
    getUserAddress: builder.query({
      query: (userId) => `/address/user`, // Sửa để sử dụng userId
    }),

    // API xóa địa chỉ
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `/address/${addressId}`,
        method: "DELETE",
      }),
    }),

    // API cập nhật địa chỉ
    updateAddress: builder.mutation({
      query: ({ addressId, addressData }) => ({
        url: `/address/${addressId}`,
        method: "PUT",
        body: addressData,
      }),
    }),

    // API cập nhật trạng thái địa chỉ
    setStatus: builder.mutation({
      query: (addressId) => ({
        url: `/address/${addressId}/status`,
        method: "PATCH", // Phương thức PATCH để cập nhật trạng thái
      }),
    }),

    // API lấy địa chỉ theo đơn hàng
    getAddressOrder: builder.query({
      query: () => ({
        url: "/address/address-order",  
        method: "GET",                  
      }),
    }),
  }),
});

// Xuất các hook từ apiSlice
export const { 
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useSetStatusMutation,
  useGetAddressOrderQuery
} = addressApiSlice;

export const { useGetUserAddressQuery } = addressApiSlice;
