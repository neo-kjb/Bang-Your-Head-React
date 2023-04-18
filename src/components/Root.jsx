import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function Root() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}

export default Root;
