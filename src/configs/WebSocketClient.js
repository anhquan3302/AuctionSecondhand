import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketClient = (onMessageReceived) => {
    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',  // Địa chỉ WebSocket của bạn
            connectHeaders: {
                // Thêm các thông tin xác thực nếu cần thiết
            },
            debug: function (str) {
                console.log(str);
            },
            onConnect: () => {
                client.subscribe('/topic/bids', (message) => {
                        onMessageReceived(JSON.parse(message.body));  // Xử lý thông báo khi có cập nhật giá thầu
                });
            },
            onStompError: (frame) => {
                console.error('Error: ', frame);
            },
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),  // Đảm bảo sử dụng SockJS
        });

        client.activate();

        return () => {
            client.deactivate();  // Hủy kết nối khi component bị tháo gỡ
        };
    }, [onMessageReceived]);
};

export default WebSocketClient;
