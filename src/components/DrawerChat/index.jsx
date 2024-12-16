import React from "react";
import { Drawer } from "antd";

const DrawerChat = ({ open, onClose }) => {
    return (
        <Drawer
            title="Basic Drawer"
            onClose={onClose}
            open={open}
        >
         <div>
            
         </div>
        </Drawer>
    );
};

export default DrawerChat;