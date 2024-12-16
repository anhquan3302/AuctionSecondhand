import { useCreateAddressMutation } from "../../../services/address.service";

export const useAddress = () => {
    const [createAddress, { isLoading, isError }] = useCreateAddressMutation();

    const addAddress = async (addressData) => {
        try {
            const processedAddressData = {
                ...addressData
              
            };
            await createAddress(processedAddressData).unwrap();
            return { success: true };
        } catch (error) {
            console.error("Error creating address:", error);
            return { success: false, error: error.message };
        }
    };

    const errorMessage = isError ? "Đã đạt tối đa 6 đia chỉ" : "";

    return {
        addAddress,
        isLoading,
        isError: errorMessage,
    };
};
