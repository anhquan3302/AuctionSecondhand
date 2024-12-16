import React, { useState } from 'react';
import { Form, Input, Button, Rate, Spin, message } from 'antd';
import { useCreateFeedbackMutation } from '../../services/feedback.service';

const FeedbackForm = ({ order }) => {
    const [feedbackText, setFeedbackText] = useState("");
    const [rating, setRating] = useState(0); // Rating từ 0 đến 5
    const [createFeedback, { isLoading, isError, isSuccess, error }] = useCreateFeedbackMutation();

    const handleSubmit = async (values) => {
        const feedbackDto = {
            comment: feedbackText,
            rating: rating,
            orderId: order.id,
            // userId: 1,
            itemId: order?.itemId,
        };

        try {
            await createFeedback(feedbackDto).unwrap(); // Gọi API
            message.success('Feedback submitted successfully!');
        } catch (err) {
            message.error('Failed to create feedback');
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: '0 auto', padding: '20px' }}>

            <Form onFinish={handleSubmit} layout="vertical">

                {/* Rating */}
                <Form.Item label="Rating" name="rating" required>
                    <Rate
                        value={rating}
                        onChange={(value) => setRating(value)}
                    />
                </Form.Item>


                {/* Feedback Text */}
                <Form.Item
                    name="comment"
                    rules={[{ required: true, message: 'Please enter your feedback!' }]}

                >
                    <Input.TextArea
                        value={feedbackText}
                        onChange={(e) => {
                            setFeedbackText(e.target.value); // Update state with numeric-only valu
                        }}
                        placeholder="Enter your feedback"
                        rows={4}
                    />
                </Form.Item>



                {/* Submit Button */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        block
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            {/* Loading Spinner */}
            {isLoading && <Spin tip="Submitting feedback..." />}
            {isError && <p style={{ color: 'red' }}>Error: {error?.message}</p>}
            {isSuccess && <p style={{ color: 'green' }}>Feedback submitted successfully!</p>}
        </div>
    );
};

export default FeedbackForm;
