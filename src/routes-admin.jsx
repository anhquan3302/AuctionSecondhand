import {
    HomeIcon,
    UserCircleIcon,
    TableCellsIcon,
    InformationCircleIcon,
    ServerStackIcon,
    RectangleStackIcon,
} from "@heroicons/react/24/solid";
import {Home, Profile, Tables, Notifications} from "./pages/Admin/Dashboard";
import {SignIn, SignUp} from "./pages/Admin/auth";
import AppraisalFormPage from "./pages/Admin/AppraisalForm/index.jsx";
import StaffProductListPage from "./pages/Admin/StaffProductList/index.jsx";
import CreateAuction from "./pages/Admin/CreateAuction/index.jsx";
import ManageFeedback from "./pages/Admin/ManageFeedback/index.jsx";
import OrderManagementAdmin from "./pages/Admin/OrderManagement/index.jsx";
import StoreOrders from "pages/Admin/StoreOrders/index.jsx";
import KiemduyetStaffPage from "./pages/Kyc/Kyc.jsx";
import ManagementTransactions from "./pages/Admin/ManagementTransactions/index.jsx";
import ManagementWindrawOfSeller from "./pages/Admin/ManageWithdraw/index.jsx";
import Payment from "./pages/Admin/Payment/index.jsx";
import ManageKYC from "./pages/Admin/ManageKYC/index.jsx";
import ProductPending from "./pages/Admin/ManageProduct/index.jsx";
import ManageUser from "./pages/Admin/ManageUser/index.jsx";
import ManageListCreateAuctionProduct from "pages/Admin/ManageListCreateAuctionProduct/index.jsx";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routesAdmin = [
    {
        title: "Thông tin",
        layout: "dashboard",
        pages: [
            {
                icon: <UserCircleIcon {...icon} />,
                name: "profile",
                path: "/profile",
                element: <Profile/>,
            }
        ],
    },
    {
        title: "dashboard",
        layout: "dashboard",
        pages: [
            {
                icon: <HomeIcon {...icon} />,
                name: "dashboard của admin",
                path: "/home",
                element: <Home/>,
            }
        ],
    },
    {
        title: "Quản lý ",
        layout: "dashboard",
        pages: [
            {
                icon: <UserCircleIcon {...icon} />,
                name: "Danh dách người dùng",
                path: "/ManageUsers",
                element: <ManageUser/>,
            },
            {
                icon: <UserCircleIcon {...icon} />,
                name: "Danh sách đấu giá",
                path: "/StaffProductList",
                element: <StaffProductListPage/>,
            },
            {
                icon: <UserCircleIcon {...icon} />,
                name: "Danh sách thẩm định",
                path: "/ProductPending",
                element: <ProductPending/>,
            },
            {
                icon: <UserCircleIcon {...icon} />,
                name: "Danh sách tạo đấu giá",
                path: "/auction-create-list",
                element: <ManageListCreateAuctionProduct/>,
            },
           
            // {
            //     icon: <UserCircleIcon {...icon} />,
            //     name: "Quản Lý FeedBack",
            //     path: "/ManageFeedback",
            //     element: <ManageFeedback/>,
            // },
            {
                icon: <UserCircleIcon {...icon} />,
                name: "Quản Lý Đơn hàng shop",
                path: "/StoreOrders",
                //element: <OrderManagementAdmin />,
                element: <StoreOrders/>,
            },
            {
                // icon: <UserCircleIcon {...icon} />,
                // name: "Thẩm định sản phẩm",
                path: "/AppraisalForm/:itemId",
                element: <AppraisalFormPage/>,
            },
            {

                path: "/KiemduyetStaffPage/:id",
                element: <KiemduyetStaffPage/>,
            },
            {
                // icon: <UserCircleIcon {...icon} />,
                // name: "Tạo phiên đấu giá",
                path: "/CreateAuction/:itemId",
                element: <CreateAuction/>,
            },
        ],
    },
    // {
    //   title: "auth pages",
    //   layout: "auth",
    //   pages: [
    //     {
    //       icon: <ServerStackIcon {...icon} />,
    //       name: "sign in",
    //       path: "/sign-in",
    //       element: <SignIn />,
    //     },
    //     {
    //       icon: <RectangleStackIcon {...icon} />,
    //       name: "sign up",
    //       path: "/sign-up",
    //       element: <SignUp />,
    //     },
    //   ],
    // },
    //   {
    // =======
    {
        title: "Giao dịch",
        layout: "dashboard",
        pages: [
            {
                icon: <TableCellsIcon {...icon} />,
                name: "Giao dịch",
                path: "/managementTransactions",
                element: <ManagementTransactions/>,
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: "Đơn rút tiền sellers",
                path: "/managementWithdrawOfSeller",
                element: <ManagementWindrawOfSeller/>,
            }, {
                icon: <TableCellsIcon {...icon} />,
                name: "Danh sach KYC",
                path: "/managementKYC",
                element: <ManageKYC/>,
            },
            // {
            //     icon: <InformationCircleIcon {...icon} />,
            //     name: "notifications",
            //     path: "/notifications",
            //     element: <Notifications/>,
            // },
            {
                // icon: <InformationCircleIcon {...icon} />,
                // name: "Payments",
                path: "/payments/:id",
                element: <Payment/>,
            },
        ],
    },
];

export default routesAdmin;
