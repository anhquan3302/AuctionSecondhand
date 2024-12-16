// FeedbackList.jsx

import React from 'react';
import { List, Rate, Typography } from 'antd';

const { Title } = Typography;

const FeedbackList = () => {
    // Dữ liệu phản hồi
    const feedbacks = [
        {
            username: 'Nguyễn Văn A',
            comment: 'Dịch vụ rất tốt, sản phẩm chất lượng!',
            rating: 5,
            date: '2024-10-01',
        },
        {
            username: 'Trần Thị B',
            comment: 'Giao hàng nhanh chóng, nhưng sản phẩm không đúng như mô tả.',
            rating: 3,
            date: '2024-10-02',
        },
        {
            username: 'Lê Văn C',
            comment: 'Mọi thứ đều hoàn hảo, tôi sẽ quay lại!',
            rating: 5,
            date: '2024-10-03',
        },
        {
            username: 'Nguyễn Thị D',
            comment: 'Sản phẩm kém chất lượng, không như mong đợi.',
            rating: 1,
            date: '2024-10-04',
        },
        // Thêm các phản hồi khác nếu cần
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={4}>Phản hồi từ khách hàng</Title>
            <List
                itemLayout="horizontal"
                dataSource={feedbacks}
                renderItem={feedback => (
                    <List.Item>
                        <List.Item.Meta
                            title={<span>{feedback.username} <Rate disabled value={feedback.rating} /></span>}
                            description={
                                <>
                                    <p>{feedback.comment}</p>
                                    <small>{new Date(feedback.date).toLocaleDateString()}</small>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default FeedbackList;
