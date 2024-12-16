const api = "https://dev-online-gateway.ghn.vn/shiip/public-api";
import axios from "axios";
const headers = {
    "Content-Type": "application/json",
    "token": "a4cf5c26-7379-11ef-8e53-0a00184fe694",
    //ShopId: 885,
};
class OnlineGatewayService {
    static async getProvince() {
        return axios.get(`${api}/master-data/province`, { headers: headers });
    }
    static async getDistrict(provinceID) {
        return axios.get(`${api}/master-data/district?province_id=${provinceID}`, {
            headers: headers,
        });
    }
    static async getWard(districtID) {
        return axios.get(`${api}/master-data/ward?district_id=${districtID}`, {
            headers: headers,
        });
    }
    static async fee_service(data) {
        const dataBody = {
            ...data,
        };
        const response = await axios.get(`${api}/v2/shipping-order/fee`, {
            headers: headers,
            params: dataBody,
        });
        return response;
    }

    // static async create_order_service(data) {
    //     const dataBody = {
    //         ...data,
    //     };
    //     const response = await axios.post(`${api}/v2/shipping-order/create`, {
    //         headers: headers,
    //         params: dataBody,
    //     });
    //     return response;
    // }

    static async create_order_service(data) {
        const response = await axios.post(
            `${api}/v2/shipping-order/create`,
            data,
            { headers: headers }
        );
        return response;
    }

    // static async detail_order_service(data) {
    //     const response = await axios.post(
    //         `${api}/v2/shipping-order/detail`,
    //         data,
    //         { headers: headers }
    //     );
    //     return response;
    // }
}
export default OnlineGatewayService;
