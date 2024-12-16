import { useGetUserAddressQuery } from "../../../services/address.service";

export const useFetchUserAddresses = () => {
    const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage, nếu không có thì mặc định là 1

    const { data: addresses = [], refetch: isRefetchAddress } = useGetUserAddressQuery();

    return {
        addresses,
        isRefetchAddress
    };
};
