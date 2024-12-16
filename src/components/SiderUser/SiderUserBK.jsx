import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Avatar,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronRightIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useGetBalanceQuery } from "../../services/walletCustomerService";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../../services/user.service";

export function SiderUserBK() {
    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const navigate = useNavigate();
    const { data: balance, isLoading, isError } = useGetBalanceQuery();    
    const handleNavigate = (path) => {
        navigate(path);
    };
    const { data:user } = useGetUserByIdQuery();    
    const formattedBalance = balance ? new Intl.NumberFormat('vi-VN').format(balance) : 0;

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <div className="flex items-center gap-4">
                    <Avatar src={user?.avatar} alt="avatar" />
                    <div>
                        <Typography variant="h6"> {user?.fullName || "Tên người dùng"}</Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                        {formattedBalance} VND

                        </Typography>
                    </div>
                </div>
            </div>
            <List>
                <Accordion
                    open={open === 3}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                {/*<PresentationChartBarIcon className="h-5 w-5" />*/}
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Quản lý tài khoản
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem onClick={() => handleNavigate('/ProfileDetail')}>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Thông tin Tài khoản
                            </ListItem>
                            <ListItem onClick={() => handleNavigate('/MenuKyc')}>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Xác minh danh tính                           
                                </ListItem>
                            <ListItem onClick={() => handleNavigate('/Address')}>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Quản lý địa chỉ
                            </ListItem>

                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Đấu giá
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem onClick={() => handleNavigate('/ListRegisterAuction')}>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Danh sách đăng ký
                            </ListItem>
                            <ListItem onClick={() => handleNavigate('/AuctionListProcess')}>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Danh sách chưa thanh toán
                            </ListItem>
                            <ListItem onClick={() => handleNavigate('/AuctionListCompleted')}>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Đấu giá thành công
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 4}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 4}>
                        <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Đơn hàng
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem onClick={() => handleNavigate('/OrderManagementBuyer')}>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Danh sách đơn hàng
                            </ListItem>
                            {/* <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Lịch sử mua hàng
                            </ListItem> */}

                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Quản lý ví tiền
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem onClick={() => handleNavigate('/DepositMoney')}>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Nạp tiền
                            </ListItem>
                            <ListItem onClick={() => handleNavigate('/HistoryPage')}>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Lịch sử giao dịch
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <hr className="my-2 border-blue-gray-50" />
                {/* <ListItem>
                    <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Inbox
                    <ListItemSuffix>
                        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                    </ListItemSuffix>
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem> */}
            </List>
        </Card>
    );
}