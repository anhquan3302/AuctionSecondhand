import React, { useMemo, useState } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronUpIcon,
    HomeIcon,
    InformationCircleIcon,
    ShoppingCartIcon,
    DocumentIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { useGetCategoriesQuery } from "@/services/category.service.js";


function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openNestedMenu, setOpenNestedMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const {
        data: categories = [],
        error,
        isLoading,
    } = useGetCategoriesQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Render danh mục mà không cần dùng useMemo (tránh lỗi hook không nhất quán)
    const renderCategories = categories.map((category) => (
        <Menu key={category.categoryId} placement="right-start" allowHover offset={15}>
            <MenuHandler className="flex items-center justify-between">
                <MenuItem>
                    {category.categoryName}
                    <ChevronUpIcon
                        strokeWidth={2.5}
                        className="h-3.5 w-3.5 transition-transform"
                    />
                </MenuItem>
            </MenuHandler>
            <MenuList className="rounded-xl">
                {category.subCategory.map((sub) => (
                    <MenuItem key={sub.sc_id}>{sub.sub_category}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    ));
    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom"
                allowHover
            >
                <MenuHandler>
                    <Typography
                        as="div"
                        variant="h5"
                        className="mr-4 cursor-pointer py-1.5 lg:ml-2 font-bold"
                    >
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-semibold text-gray-900 cursor-pointer"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            <span className="text-xl font-bold text-gray-800 hover:text-green-600">Danh Mục</span>
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </ListItem>



                    </Typography>
                </MenuHandler>

                {/* Hiển thị danh mục từ API */}
                <MenuList className="hidden rounded-xl lg:block">
                    {renderCategories}
                </MenuList>
            </Menu>
        </React.Fragment>
    );
}

function NavList() {
    return (
        <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1">
            {[
                { title: "Trang chủ", icon: <HomeIcon className="nav-icon" />, href: "/" },
                { title: "Sản phẩm", icon: <ShoppingCartIcon className="nav-icon" />, href: "/product" },
                { title: "Liên hệ", icon: <PhoneIcon className="nav-icon" />, href: "/contact" },
                { title: "Bài viết", icon: <DocumentIcon className="nav-icon" />, href: "/articles" },
                { title: "Chính sách", icon: <InformationCircleIcon className="nav-icon" />, href: "/policy" },
            ].map((item, index) => (
                <Typography
                    as="a"
                    href={item.href}
                    variant="small"
                    color="blue-gray"
                    className="font-medium nav-item"
                    key={index}
                >
                    <ListItem
                        className="flex items-center gap-2 py-2 pr-4 transition-all duration-300 ease-in-out hover:text-green-800 hover:scale-105 hover:shadow-lg hover:border-b-2 hover:border-gray-900 hover:bg-transparent rounded-lg"
                    >
                        {/* Icon with hover effect */}
                        <div className="flex items-center justify-center w-6 h-6 transition-transform duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110">
                            {item.icon}
                        </div>
                        {/* Title */}
                        <span className="text-base group-hover:font-semibold">{item.title}</span>
                    </ListItem>
                </Typography>
            ))}
        </List>
    );
}








function NavBarBK() {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <Navbar
            className="w-full max-w-[1440px] px-5 py-2 bg-gradient-to-r from-gray-200 to-gray bg-opacity-80 shadow-lg backdrop-blur-md rounded-md border border-gray-700">
            <div className="flex items-center justify-between text-white w-full">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-2 lg:ml-2 font-semibold text-xl"
                >
                    <NavListMenu />
                </Typography>

                <div className="hidden lg:block">
                    <NavList />
                </div>

                <IconButton
                    variant="text"
                    className="lg:hidden text-white hover:text-blue-200"
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
        </Navbar>
    );
}

export default NavBarBK;
