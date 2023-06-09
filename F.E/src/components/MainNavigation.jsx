import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/getAuthToken";
import { useLogoutMutation } from "../store";

function MainNavigation() {
  const navigate = useNavigate();
  const token = getAuthToken();
  const [logoutUser] = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false);
  const logoutHandler = () => {
    const confirm = window.confirm("Are You Sure ?");
    if (confirm) {
      localStorage.removeItem("token");
      logoutUser();
      return navigate("/");
    } else {
      return;
    }
  };
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://cdn-icons-png.flaticon.com/512/2816/2816806.png"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Bang Your Head
                  </Link>

                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 font-bold"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/concerts"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 font-bold"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    end
                  >
                    Concerts
                  </NavLink>

                  <NavLink
                    to="/concerts/new"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 font-bold"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    New Concert
                  </NavLink>

                  {!token && (
                    <NavLink
                      to="/auth/signup"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-700 font-bold"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      Register
                    </NavLink>
                  )}
                  {!token && (
                    <NavLink
                      to="/auth/login"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-700 font-bold"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      Login
                    </NavLink>
                  )}
                  {token && (
                    <button
                      onClick={logoutHandler}
                      to="/auth/logout"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {() => (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Bang Your Head
                </Link>

                <Link
                  to="/concerts"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Concerts
                </Link>

                <Link
                  to="/concerts/new"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  New Concert
                </Link>

                {!token && (
                  <Link
                    to="/auth/signup"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Register
                  </Link>
                )}

                {!token && (
                  <Link
                    to="/auth/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                )}
                {token && (
                  <button
                    onClick={logoutHandler}
                    to="/auth/logout"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default MainNavigation;
