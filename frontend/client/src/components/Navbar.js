import { useState } from "react";
import { NavLink } from "react-router-dom";

const navbarLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "link1",
    path: "/link1",
  },
  {
    name: "link2",
    path: "/link2",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-green-800">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-3xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#"
            >
              CV-builder
            </a>
            <button
              className="text-white bg-white-900 cursor-pointer text-xl leading-none px-3 py-1 border border-solid  rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
        <span class="block relative w-6 h-px rounded-sm bg-white"></span>
        <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
        <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
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
                <li className="nav-item">
                <NavLink
                  key={link.name}
                  to={link.path}
                  className='px-6 py-2 flex text-xl items-center uppercase font-bold leading-snug text-white hover:opacity-75'
                >{link.name}
                </NavLink>
              </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>

  )

}

export default Navbar