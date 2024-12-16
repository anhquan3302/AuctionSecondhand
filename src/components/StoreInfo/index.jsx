// StoreInfo.jsx

import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const StoreInfo = () => {
    // Dữ liệu thông tin cửa hàng
    const storeData = {
        name: 'Cửa Hàng Thời Trang XYZ',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        phone: '0901234567',
        description: 'Cửa hàng thời trang với nhiều sản phẩm đa dạng và phong cách. Đến với chúng tôi để tìm kiếm những món đồ yêu thích!',
    };

    return (
        <Card style={{ padding: '20px', margin: '20px 0' }}>
            <Title level={4}>{storeData.name}</Title>
            <Paragraph><strong>Địa chỉ:</strong> {storeData.address}</Paragraph>
            <Paragraph><strong>Số điện thoại:</strong> {storeData.phone}</Paragraph>
            <Paragraph>{storeData.description}</Paragraph>
        </Card>
    );
};

export default StoreInfo;
