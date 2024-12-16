import {useLocation, Link, useNavigate} from "react-router-dom";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    BellIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon, PowerIcon,
} from "@heroicons/react/24/solid";
import {
    useMaterialTailwindController,
    setOpenConfigurator,
    setOpenSidenav,
} from "../../context";
import {useGetUserByIdQuery} from "@/services/user.service.js";
import UserMenu from "@/components/DashboardSeller/DropdownProfile.jsx";
import React from "react";
import {logOut} from "@/redux/auth/authSlice.js";
import {useDispatch} from "react-redux";
export function DashboardNavbar() {
    const [controller, dispatch] = useMaterialTailwindController();
    const {fixedNavbar, openSidenav} = controller;
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const  dispatchLogOut = useDispatch();
    const {data: userHeader, error, isLoading: isUserLoading, refetch} = useGetUserByIdQuery();
    const [layout, page] = pathname.split("/").filter((el) => el !== "");
    const handleLogout = () => {
        dispatchLogOut(logOut());
        navigate("/login");
    };
    return (
        <Navbar
            color={fixedNavbar ? "white" : "transparent"}
            className={`rounded-xl transition-all ${fixedNavbar
                ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
                : "px-0 py-1"
            }`}
            fullWidth
            blurred={fixedNavbar}
        >
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                <div className="capitalize">
                    <Breadcrumbs
                        className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
                        }`}
                    >
                        <Link to={`/${layout}`}>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                            >
                                {layout}
                            </Typography>
                        </Link>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {page}
                        </Typography>
                    </Breadcrumbs>
                    <Typography variant="h6" color="blue-gray">
                        {page}
                    </Typography>
                </div>
                <div className="flex items-center">
                    <div className="mr-auto md:mr-4 md:w-56">
                        <Input label="Search"/>
                    </div>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    >
                        <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500"/>
                    </IconButton>
                    <Menu>
                        <MenuHandler>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Avatar
                                    variant="circular"
                                    alt="Tania Andrew"
                                    className="cursor-pointer"
                                    src={userHeader?.avatar}
                                />
                                <Typography variant="small" className="font-bold text-black">
                                    {userHeader?.fullName}
                                </Typography>
                            </div>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem className="flex items-center gap-2">
                                {/* Icon SVG */}
                                <UserCircleIcon className="h-5 w-5"/>
                                <Typography variant="small" className="font-medium">
                                    My Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2">
                                {/* Icon SVG */}
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 16 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2 0C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0H2ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                                        fill="#90A4AE"
                                    />
                                </svg>
                                <Typography variant="small" className="font-medium">
                                    Inbox
                                </Typography>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-2">
                                {/* Icon SVG */}
                                <PowerIcon className="h-5 w-5"/>
                                <Typography variant="small" className="font-medium" onClick={handleLogout}>
                                    Log Out
                                </Typography>
                            </MenuItem>
                            <hr className="my-2 border-blue-gray-50"/>
                            <MenuItem className="flex items-center gap-2">
                                <Cog6ToothIcon className="h-5 w-5"/>
                                <Typography variant="small" className="font-medium">
                                    Settings
                                </Typography>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuHandler>
                            <IconButton variant="text" color="blue-gray">
                                <BellIcon className="h-5 w-5 text-blue-gray-500"/>
                            </IconButton>
                        </MenuHandler>
                        <MenuList className="w-max border-0 menu-list">
                            <MenuItem className="flex items-center gap-3">
                                <Avatar
                                    src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                                    alt="item-1"
                                    size="sm"
                                    variant="circular"
                                />
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        <strong>New message</strong> from Laur
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5"/> 13 minutes ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4">
                                <Avatar
                                    src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                                    alt="item-1"
                                    size="sm"
                                    variant="circular"
                                />
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        <strong>New album</strong> by Travis Scott
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5"/> 1 day ago
                                    </Typography>
                                </div>
                            </MenuItem>
                            <MenuItem className="flex items-center gap-4">
                                <div
                                    className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                                    <CreditCardIcon className="h-4 w-4 text-white"/>
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-1 font-normal"
                                    >
                                        Payment successfully completed
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                                    >
                                        <ClockIcon className="h-3.5 w-3.5"/> 2 days ago
                                    </Typography>
                                </div>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => setOpenConfigurator(dispatch, true)}
                    >
                        <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500"/>
                    </IconButton>
                </div>
            </div>
        </Navbar>
    );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
