import React from "react";
import { List, Card } from "antd";

const OrderManagementSectionBuyer = ({ orders }) => {
    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={orders}
            renderItem={order => (
                <List.Item>
                    <Card title={`Order ID: ${order.orderId}`} style={{ width: '100%' }}>
                        <p>Total Amount: {order.totalAmount} VND</p>
                        <p>Email: {order.email}</p>
                        <p>Quantity: {order.quantity}</p>
                        <p>Phone Number: {order.phoneNumber}</p>
                        <p>Status: {order.status}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <p>Shipping Method: {order.shippingMethod}</p>
                        <p>Note: {order.note}</p>
                        <p>Created By: {order.createBy}</p>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default OrderManagementSectionBuyer;
