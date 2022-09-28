import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";
const Layout = () => {
  return (
    <div>
      <Header />
      <SideNav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
