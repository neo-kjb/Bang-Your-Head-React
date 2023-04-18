import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function Root() {
  return (
    <>
      <MainNavigation />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Root;
