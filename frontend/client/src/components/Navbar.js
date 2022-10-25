import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../features/user';
import { Button } from 'primereact/button';

const navbarLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "link1",
    path: "/link1",
  },
];

const AuthorizedNavbarLinks = [
  {
    name: "Create CV",
    path: "/create-cv",
  },
  {
    name: "My CVs",
    path: "/cvs",
  },
  {
    name: "profile",
    path: "/profile",
  },
];

const Navbar = () => {

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);
  const [navbarOpen, setNavbarOpen] = useState(false);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authorizedTrue = (
    <>
      {AuthorizedNavbarLinks.map((link) => (
        <li className="flex flex-row flex-wrap card-container" key={link.name}>
          <NavLink
            key={link.name}
            to={link.path}
            className="hover:text-blue-200 p-button-info mr-4 flex align-items-center justify-content-center font-bold text-white border-round capitalize"
          >
            {link.name}
          </NavLink>
        </li>
      ))}
      <li className="p-menuitem">
        <Button 
          className="p-button-info mr-2 hover:bg-blue-400"
          href='#!' onClick={() => dispatch(logout())}>
					Logout
				</Button>
      </li>
    </>
  )

  const authorizedFalse = (
    <>
      <li className="flex flex-row flex-wrap card-container" key="login">
        <NavLink
          key="login"
          to="/login"
          className='hover:text-blue-200 p-button-info flex align-items-center justify-content-center font-bold text-white border-round capitalize mr-4'
        >
          Login
        </NavLink>
      </li>

      <li className="flex flex-row flex-wrap card-container" key="register">
        <NavLink
          key="register"
          to="/register"
          className="hover:text-blue-200 p-button-info flex align-items-center justify-content-center font-bold text-white border-round capitalize"
        >
          Register
        </NavLink>
      </li>
    </>
  )

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-900">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-3xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-emerald-400 hover:text-emerald-300"
              href="#"
            >
              CV-builder
            </a>
            <button
              className="text-white bg-white-900 cursor-pointer text-xl leading-none px-3 py-1 border border-solid  rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <span className="block relative w-6 h-px rounded-sm bg-white"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {navbarLinks.map((link) => (
                <li className="flex flex-row flex-wrap card-container" key={link.name}>
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className="hover:text-blue-200 p-button-info mr-4 flex align-items-center justify-content-center font-bold text-white border-round capitalize"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              { isAuthenticated ? authorizedTrue : authorizedFalse }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar