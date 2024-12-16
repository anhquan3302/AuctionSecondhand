import React from "react";
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
import {useNavigate} from "react-router-dom";
const { Paragraph, Text } = Typography;


const FailPayment = () => {
    const navigate = useNavigate();
    const navigateToTransaction = () => {
        navigate("/HistoryPage");
    };
    return (
        <div>
            <Result
                status="error"
                title="Submission Failed"
                subTitle="Please check and modify the following information before resubmitting."
                extra={[
                    <Button onClick={navigateToTransaction} type="primary" key="console">
                        Go History transaction
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                ]}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            The content you submitted has the following error:
                        </Text>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
                        frozen. <a>Thaw immediately &gt;</a>
                    </Paragraph>
                    <Paragraph>
                        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
                        eligible to apply. <a>Apply Unlock &gt;</a>
                    </Paragraph>
                </div>
            </Result>
        </div>
    );
};

export default FailPayment;
