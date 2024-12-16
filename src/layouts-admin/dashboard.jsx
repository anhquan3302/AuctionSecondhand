import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import Sidenav from "../widgets/layout/sidenav";
import DashboardNavbar from "../widgets/layout/dashboard-navbar";
import Configurator from "../widgets/layout/configurator";
import Footer from "../widgets/layout/footer";
import routesAdmin from "../routes-admin";
import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import {Breadcrumb, Layout, theme} from "antd";
const {Content, Sider} = Layout;
export function Dashboard() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      {/*<Sidenav*/}
      {/*  routes={routesAdmin}*/}
      {/*  brandImg={*/}
      {/*    sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"*/}
      {/*  }*/}
      {/*/>*/}

      {/*<div className="p-4 xl:ml-80">*/}
      {/*  <DashboardNavbar />*/}
      {/*  <Configurator  />*/}
      {/*  <IconButton*/}
      {/*    size="lg"*/}
      {/*    color="white"*/}
      {/*    className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"*/}
      {/*    ripple={false}*/}
      {/*    onClick={() => setOpenConfigurator(dispatch, true)}*/}
      {/*  >*/}
      {/*    <Cog6ToothIcon className="h-5 w-5" />*/}
      {/*  </IconButton>*/}
      {/*  <Routes>*/}
      {/*    {routesAdmin.map(*/}
      {/*      ({ layout, pages }) =>*/}
      {/*        layout === "dashboard" &&*/}
      {/*        pages.map(({ path, element }) => (*/}
      {/*          <Route exact path={path} element={element} />*/}
      {/*        )),*/}
      {/*    )}*/}
      {/*  </Routes>*/}
      {/*  <div className="text-blue-gray-600">*/}
      {/*    <Footer />*/}
      {/*  </div>*/}
      {/*</div>*/}
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              {/*<DashboardNavbar />*/}
             <Content
                style={{
                    padding: '0 0px',
                    flex: 1, // Cho phép Content chiếm không gian còn lại
                    display: 'flex', // Đặt display là flex để chứa nội dung
                    flexDirection: 'column', // Hướng theo chiều dọc
                }}
            >
                {/*<Breadcrumb*/}
                {/*    style={{*/}
                {/*        margin: '16px 0',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
                 <Layout
                     style={{
                         padding: '24px 0',
                         background: colorBgContainer,
                         borderRadius: borderRadiusLG,
                         flex: 1, // Để Layout chiếm hết không gian còn lại
                     }}
                 >
                     <Sider
                         style={{
                             background: colorBgContainer,
                         }}
                         width={300}
                     >
                         <Sidenav
                             routes={routesAdmin}
                             brandImg={
                                 sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
                             }
                         />
                     </Sider>
                     <Content
                         style={{
                             padding: '0 24px',
                             minHeight: 280,
                             flex: 1, // Để Content bên trong chiếm hết không gian còn lại
                         }}
                     >
                         <DashboardNavbar/>
                         <Configurator/>
                         <IconButton
                             size="lg"
                             color="white"
                             className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                             ripple={false}
                             onClick={() => setOpenConfigurator(dispatch, true)}
                         >
                             <Cog6ToothIcon className="h-5 w-5"/>
                         </IconButton>
                         <Routes>
                             {routesAdmin.map(
                                 ({layout, pages}) =>
                                     layout === "dashboard" &&
                                     pages.map(({path, element}) => (
                                         <Route exact path={path} element={element}/>
                                     )),
                             )}
                         </Routes>

                     </Content>
                     <div className="text-blue-gray-600">
                         <Footer/>
                     </div>
                 </Layout>
             </Content>
        </Layout>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
