import React, {useState} from "react";
import {Button, Card, Flex, Typography} from 'antd';

const cardStyle = {
    width: 720,
};
const imgStyle = {
    display: 'block',
    width: 273,
};
export default function CartItemBid({bidIF}) {
    return (
        <Card
            hoverable
            style={cardStyle}
            styles={{
                body: {
                    padding: 0,
                    overflow: 'hidden',
                },
            }}
        >
            <Flex justify="space-between">
                <img
                    alt="avatar"
                    src={bidIF?.thumbnail}
                    style={imgStyle}
                />
                <Flex
                    vertical
                    align="flex-end"
                    justify="space-between"
                    style={{
                        padding: 32,
                    }}
                >
                    <Typography.Title level={3}>
                        {bidIF?.itemName}
                    </Typography.Title>
                    <Button type="primary" href={bidIF?.itemId ? `/Auction/${bidIF?.itemId}` : "#"}
                            target="_blank">
                        đặt giá thầu
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
}