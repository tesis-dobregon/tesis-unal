import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

interface PageLayoutProps {}

const PageLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PageLayout;
