import { Card, Input, Button, Typography, Select, message, Spin } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function FormAddAddress({ onClose, onSubmit }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [selectedWardId, setSelectedWardId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [streetAddress, setStreetAddress] = useState(""); // State for street address

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                    headers: {
                        'token': '05e9c956-d27f-11ee-9414-ce214539f696'
                    }
                });
                if (response.data.code === 200) {
                    setProvinces(response.data.data);
                } else {
                    message.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching provinces:", error);
                message.error("Có lỗi xảy ra khi lấy dữ liệu tỉnh.");
            }
        };
        fetchProvinces();
    }, []);

    const handleProvinceChange = async (value) => {
        setSelectedProvinceId(value);
        setDistricts([]);
        setWards([]);
        setSelectedDistrictId(null);
        setSelectedWardId(null);
        setLoading(true);

        try {
            const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value}`, {
                headers: {
                    'token': '05e9c956-d27f-11ee-9414-ce214539f696'
                }
            });

            if (response.data.code === 200) {
                setDistricts(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching districts:", error);
            message.error("Có lỗi xảy ra khi lấy dữ liệu huyện.");
        } finally {
            setLoading(false);
        }
    };

    const handleDistrictChange = async (value) => {
        setSelectedDistrictId(value);
        setWards([]);
        setSelectedWardId(null);
        setLoading(true);

        try {
            const response = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`, {
                headers: {
                    'token': '05e9c956-d27f-11ee-9414-ce214539f696'
                }
            });

            if (response.data.code === 200) {
                const formattedWards = response.data.data.map((ward) => ({
                    WardID: ward.WardCode,
                    WardName: ward.WardName
                }));
                setWards(formattedWards);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching wards:", error);
            message.error("Có lỗi xảy ra khi lấy dữ liệu xã.");
        } finally {
            setLoading(false);
        }
    };

    const handleWardChange = (value) => {
        setSelectedWardId(value);
    };

    const handleFormSubmit = async () => {
        const addressData = {
            district_code: selectedDistrictId,
            district_name: districts.find(district => district.DistrictID === selectedDistrictId)?.DistrictName || '',
            address_name: streetAddress, // Use streetAddress state
            default_address: "string",
            last_name: "string",
            phone_number: "string",
            province: selectedProvinceId,
            province_name: provinces.find(province => province.ProvinceID === selectedProvinceId)?.ProvinceName || '',
            street_address: streetAddress,
            ward_code: selectedWardId || null,
            ward_name: wards.find(ward => ward.WardID === selectedWardId)?.WardName || null
        };

        // Call onSubmit prop to send data
        await onSubmit(addressData);
    };

    return (
        <Card>
            <div className="mb-4">
                <label>Địa chỉ</label>
                <Input
                    placeholder="Nhập địa chỉ"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)} // Update street address state
                />
            </div>
            <div className="mb-4">
                <label>Tỉnh</label>
                <Select onChange={handleProvinceChange} placeholder="Chọn tỉnh" loading={loading} showSearch>
                    {provinces.map((province) => (
                        <Select.Option key={province.ProvinceID} value={province.ProvinceID}>
                            {province.ProvinceName}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="mb-4">
                <label>Huyện</label>
                <Select onChange={handleDistrictChange} placeholder="Chọn huyện" loading={loading} disabled={!selectedProvinceId} showSearch>
                    {districts.map((district) => (
                        <Select.Option key={district.DistrictID} value={district.DistrictID}>
                            {district.DistrictName}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="mb-4">
                <label>Xã</label>
                <Select onChange={handleWardChange} placeholder="Chọn xã" loading={loading} disabled={!selectedDistrictId} showSearch>
                    {wards.map((ward) => (
                        <Select.Option key={ward.WardID} value={ward.WardID}>
                            {ward.WardName}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <div className="mb-4">
                <Button type="primary" onClick={handleFormSubmit}>
                    Thêm địa chỉ
                </Button>
            </div>
        </Card>
    );
}