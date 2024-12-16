import {Text, SelectBox, Img, ButtonDH, InputDH} from "./..";
import React, {useEffect, useRef, useState} from "react";
import NavBarBK from "@/components/NavBarBK/index.jsx";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    selectCurrentUser,
    selectIsLoggedIn,
    logOut,
    selectCurrentUserAPI,
    selectCurrentRole,
} from "../../redux/auth/authSlice";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
    IconButton, Input, Button,
} from "@material-tailwind/react";
import {ExclamationCircleFilled} from '@ant-design/icons';
import {AutoComplete, Badge, Space} from 'antd';
import {ShopOutlined} from '@ant-design/icons';
import DrawerChat from "@/components/DrawerChat/index.jsx";
import {useGetItemsFilterQuery} from "@/services/item.service.js";
import {setFilters} from "@/redux/item/itemSlice.js";
import {useGetUserByIdQuery} from "../../services/user.service";
import {setUser, setLoading, setError} from "../../redux/user/userSlice";
import {BellIcon, ClockIcon, CreditCardIcon} from "@heroicons/react/24/solid/index.js";
import {useGetCategoriesQuery} from "@/services/category.service.js";
import {useGetNotificationQuery} from "@/services/notification.service.js";


export default function Header2({...props}) {
    const [searchBarValue, setSearchBarValue] = React.useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const user = useSelector(selectCurrentUser);
    const userAPI = useSelector(selectCurrentUserAPI);
    const isLoggin = useSelector(selectIsLoggedIn);

    const showDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
    const onChange = ({target}) => setEmail(target.value);
    const {data: userHeader, error, isLoading: isUserLoading, refetch} = useGetUserByIdQuery();

    const filters = useSelector(
        (state) =>
            state.item || {keyword: "", min: 0, max: 1600000000, scIds: []}
    );
    const {
        data: dataItems, error: errorItem,
        isLoading: loadingItem,
        isSuccess: isSuccessItem,
        isFetching: isFetchingItem,
    } = useGetItemsFilterQuery(filters);

    const {
        data: listNotificationResponse,
        error: listNotificationError,
        isLoading: listNotificationLoading,
        isSuccess,
    } = useGetNotificationQuery();
    //console.log("listNotification ", listNotificationResponse)

    useEffect(() => {
        if (isSuccess && listNotificationResponse) {
            setNotifications(listNotificationResponse);
            setIsInitialized(true);
        }
    }, [isSuccess, listNotificationResponse]);

    useEffect(() => {
        if (!isInitialized) return;

        const eventSource = new EventSource("http://localhost:8080/api/v1/notifications/stream");

        eventSource.addEventListener("notification-event", (event) => {
            const newNotification = JSON.parse(event.data);
            //console.log("New notification:", newNotification);
            setNotifications(newNotification);
        });

        eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
            eventSource.close(); // Đóng kết nối nếu xảy ra lỗi
        };

        return () => {
            eventSource.close(); // Đóng kết nối khi component bị hủy
        };
    }, [isInitialized]);
    const activeNotifications = notifications.filter((notification) => notification.status);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (searchQuery.trim()) {
            setShowResults(true);
            dispatch(setFilters({keyword: searchQuery}));
        } else {
            setShowResults(false); // Ẩn kết quả khi ô tìm kiếm trống
        }
    }, [searchQuery, dispatch]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleLogout = () => {
        dispatch(logOut());
        navigate("/login");
    };

    const navigateLogin = () => {
        navigate("/login");
    };
    const handleNavigateToAuction = (auctionId) => {
        navigate(`/Auction/${auctionId}`); // Điều hướng tới Auction với id
    };

    const handleSearchSubmit = (e) => {
        e?.preventDefault();
        setSearchQuery("")
        navigate("/product");
    };
    const handleSeeMore = () => {
        navigate("/product");
    };

    const displayedItems = dataItems?.item.slice(0, 5);
    return (
        <header
            {...props}
            className={`${props.className} flex self-stretch items-center z-[3] relative bg-gradient-to-b from-[#45ADA8] to-[#9DE0AD]`}
        >
            <DrawerChat open={isDrawerOpen} onClose={closeDrawer}/>
            <div className="w-full">
                <div className="container-md mt-5 flex flex-col gap-9 self-stretch md:px-5">
                    <div className="ml-[74px] mr-6 flex items-center justify-between gap-5 md:mx-0 md:flex-col">
                        <a href="/">
                            <Img
                                src="images/img_auction.png"
                                alt="Header Logo"
                                className="h-[60px] w-[60px] rounded-full object-cover self-end  md:self-auto"
                            />
                        </a>
                        <div className="flex w-[86%] items-center justify-between gap-5 md:w-full md:flex-col">
                            <div className="flex flex-col-2 gap-x-2 sm:flex-row sm:items-center">
                                <div className="relative w-full gap-2 md:w-max" ref={searchRef}>
                                    <Input
                                        type="search"
                                        placeholder="Search"
                                        containerProps={{
                                            className: "min-w-[600px]",
                                        }}
                                        className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                console.log('Enter key pressed');
                                                handleSearchSubmit();
                                            }
                                        }}
                                    />
                                    {showResults && (
                                        <div
                                            className="absolute w-[400px] bg-white shadow-lg border rounded-lg z-50 p-4"
                                            style={{top: '100%', left: '50%', transform: 'translateX(-50%)'}}
                                        >
                                            {isFetchingItem && <p>Loading...</p>}
                                            {!isFetchingItem && dataItems?.item.length === 0 && (
                                                <p className="text-center text-gray-500">No item found.</p>
                                            )}
                                            {!isFetchingItem && dataItems?.item.length > 0 && (
                                                <div className="grid grid-cols-1 gap-2">
                                                    {displayedItems?.map((item) => (
                                                        <button
                                                            key={item.itemId}
                                                            className="flex items-center p-2 border rounded-md shadow-sm"
                                                            onClick={() => handleNavigateToAuction(item.itemId)}
                                                        >
                                                            <img
                                                                src={item.thumbnail}
                                                                alt={item.itemName}
                                                                className="w-16 h-16 object-cover rounded-md"
                                                            />
                                                            <p className="ml-4 text-sm font-medium">{item.itemName}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {!isFetchingItem && dataItems?.item.length > 5 && (
                                                <button
                                                    onClick={handleSeeMore}
                                                    className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                >
                                                    Xem thêm
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    <div className="!absolute left-3 top-[13px]">
                                        <svg
                                            width="13"
                                            height="14"
                                            viewBox="0 0 14 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                                                fill="#CFD8DC"
                                            />
                                            <path
                                                d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                                                stroke="#CFD8DC"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <Button
                                    size="md"
                                    className="mt bg-gray-800 bg-opacity-30 border border-gray-500 text-white rounded-lg px-4 py-2 transition duration-300 ease-in-out transform hover:bg-gray-500 hover:scale-105"
                                    onClick={handleSearchSubmit}
                                >
                                    Search
                                </Button>
                                {/* Kết quả tìm kiếm */}
                            </div>


                            <div
                                className="mr-4 flex w-[32%] items-end justify-center gap-4 md:mr-0 md:w-full sm:flex-col">
                                <div className="flex flex-1 justify-center gap-3.5 sm:self-stretch mb-2">
                                    <a href="/dashboard-seller">
                                        <IconButton className="bg-blue-gray-900">
                                            <ShopOutlined style={{fontSize: '20px'}}/>
                                        </IconButton>
                                    </a>
                                    <Text className="font-semibold text-[14px] leading-[22px] text-gray-900">
                                        <span className="text-[13px] font-normal">
                                            Kênh
                                            <br/>
                                        </span>
                                        <span className="text-[16px] font-medium">Cửa hàng</span>
                                    </Text>
                                </div>

                                <div className="flex flex-1 items-center justify-center gap-3.5 sm:self-stretch">
                                    {isLoggin ? (
                                        <>
                                            <Menu>
                                                <MenuHandler>
                                                    <Avatar
                                                        variant="circular"
                                                        alt="tania andrew"
                                                        className="cursor-pointer rounded-full object-cover"
                                                        src={userHeader?.avatar}
                                                    />
                                                </MenuHandler>
                                                <MenuList>
                                                    <MenuItem className="flex items-center gap-2">
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 16 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                                                                fill="#90A4AE"
                                                            />
                                                        </svg>
                                                        <a href="/ProfileDetail">
                                                            <Typography variant="small" className="font-medium">
                                                                Tài khooản
                                                            </Typography>
                                                        </a>
                                                    </MenuItem>
                                                    {/*<MenuItem className="flex items-center gap-2">*/}
                                                    {/*    <svg*/}
                                                    {/*        width="16"*/}
                                                    {/*        height="16"*/}
                                                    {/*        viewBox="0 0 16 16"*/}
                                                    {/*        fill="none"*/}
                                                    {/*        xmlns="http://www.w3.org/2000/svg"*/}
                                                    {/*    >*/}
                                                    {/*        <path*/}
                                                    {/*            fill-rule="evenodd"*/}
                                                    {/*            clip-rule="evenodd"*/}
                                                    {/*            d="M9.48999 1.17C9.10999 -0.39 6.88999 -0.39 6.50999 1.17C6.45326 1.40442 6.34198 1.62213 6.18522 1.80541C6.02845 1.9887 5.83063 2.13238 5.60784 2.22477C5.38505 2.31716 5.1436 2.35564 4.90313 2.33709C4.66266 2.31854 4.42997 2.24347 4.22399 2.118C2.85199 1.282 1.28199 2.852 2.11799 4.224C2.65799 5.11 2.17899 6.266 1.17099 6.511C-0.390006 6.89 -0.390006 9.111 1.17099 9.489C1.40547 9.54581 1.62322 9.65719 1.80651 9.81407C1.98979 9.97096 2.13343 10.1689 2.22573 10.3918C2.31803 10.6147 2.35639 10.8563 2.33766 11.0968C2.31894 11.3373 2.24367 11.5701 2.11799 11.776C1.28199 13.148 2.85199 14.718 4.22399 13.882C4.42993 13.7563 4.66265 13.6811 4.90318 13.6623C5.14371 13.6436 5.38527 13.682 5.60817 13.7743C5.83108 13.8666 6.02904 14.0102 6.18592 14.1935C6.34281 14.3768 6.45419 14.5945 6.51099 14.829C6.88999 16.39 9.11099 16.39 9.48899 14.829C9.54599 14.5946 9.65748 14.377 9.8144 14.1939C9.97132 14.0107 10.1692 13.8672 10.3921 13.7749C10.6149 13.6826 10.8564 13.6442 11.0969 13.6628C11.3373 13.6815 11.57 13.7565 11.776 13.882C13.148 14.718 14.718 13.148 13.882 11.776C13.7565 11.57 13.6815 11.3373 13.6628 11.0969C13.6442 10.8564 13.6826 10.6149 13.7749 10.3921C13.8672 10.1692 14.0107 9.97133 14.1939 9.81441C14.377 9.65749 14.5946 9.546 14.829 9.489C16.39 9.11 16.39 6.889 14.829 6.511C14.5945 6.45419 14.3768 6.34281 14.1935 6.18593C14.0102 6.02904 13.8666 5.83109 13.7743 5.60818C13.682 5.38527 13.6436 5.14372 13.6623 4.90318C13.681 4.66265 13.7563 4.42994 13.882 4.224C14.718 2.852 13.148 1.282 11.776 2.118C11.5701 2.24368 11.3373 2.31895 11.0968 2.33767C10.8563 2.35639 10.6147 2.31804 10.3918 2.22574C10.1689 2.13344 9.97095 1.9898 9.81407 1.80651C9.65718 1.62323 9.5458 1.40548 9.48899 1.171L9.48999 1.17ZM7.99999 11C8.79564 11 9.55871 10.6839 10.1213 10.1213C10.6839 9.55871 11 8.79565 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79564 5 7.99999 5C7.20434 5 6.44128 5.31607 5.87867 5.87868C5.31606 6.44129 4.99999 7.20435 4.99999 8C4.99999 8.79565 5.31606 9.55871 5.87867 10.1213C6.44128 10.6839 7.20434 11 7.99999 11Z"*/}
                                                    {/*            fill="#90A4AE"*/}
                                                    {/*        />*/}
                                                    {/*    </svg>*/}

                                                    {/*    <Typography variant="small" className="font-medium">*/}
                                                    {/*        Edit Profile*/}
                                                    {/*    </Typography>*/}
                                                    {/*</MenuItem>*/}

                                                    <hr className="my-2 border-blue-gray-50"/>
                                                    <MenuItem className="flex items-center gap-2 ">
                                                        <svg
                                                            width="16"
                                                            height="14"
                                                            viewBox="0 0 16 14"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                                                                fill="#90A4AE"
                                                            />
                                                        </svg>
                                                        <Typography onClick={handleLogout} variant="small"
                                                                    className="font-medium">
                                                            Đăng xuất
                                                        </Typography>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>

                                            <Text
                                                className="font-bevietnampro text-[14px] font-bold leading-[22px] text-blue_gray-900_01">
                                        <span className="text-[13px] font-normal">
                                            {/*{userAPI.fullName}*/}
                                            {userHeader?.fullName}
                                            <br/>
                                        </span>
                                                <span className="text-[10px] font-medium">{userHeader?.role}</span>
                                            </Text>
                                            {/*<Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>*/}
                                            {/*<Avatar shape="square" size="large" />*/}
                                            {/*<MenuHandler>*/}
                                            {/*    <IconButton variant="text" color="blue-gray">*/}
                                            {/*        <BellIcon className="h-5 w-5 text-blue-gray-500"/>*/}
                                            {/*    </IconButton>*/}
                                            {/*</MenuHandler>*/}


                                            <Menu>
                                                <MenuHandler>
                                                    <IconButton variant="text" color="blue-gray">
                                                        {/* Chỉ hiển thị Badge nếu có thông báo `status === true` */}
                                                        {activeNotifications.length > 0 && (
                                                            <Badge count={activeNotifications.length}>
                                                                <BellIcon className="h-5 w-5 text-blue-gray-500" />
                                                            </Badge>
                                                        )}
                                                    </IconButton>
                                                </MenuHandler>
                                                <MenuList className="w-max border-0 menu-list">
                                                    {notifications.map((notification) => (
                                                        <MenuItem key={notification.notificationId} className="flex items-center gap-3">
                                                            <div>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="mb-1 font-normal"
                                                                >
                                                                    <strong>{notification.title}</strong>
                                                                </Typography>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                                                                >
                                                                    {notification.message}
                                                                </Typography>
                                                            </div>
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </Menu>

                                        </>
                                    ) : (
                                        <Button onClick={navigateLogin} variant="gradient">LOGIN</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <NavBarBK/>
                </div>
            </div>

        </header>
    );
}
