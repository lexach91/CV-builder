import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";


const MyCVsPage = () => {
  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Your CVs page'>
      <div className="pt-4 container mx-auto">
        <h1 className="text-6xl text-center my-6 text-emerald-400 ">
          All CVs Page
        </h1>
        <p  className="text-xl text-center">
          Here goes the CVs Page
        </p>
        <div className="flex justify-content-center m-4">
          <NavLink to="/create-cv"
            className="p-button-info flex align-items-center justify-content-center font-bold text-white border-round capitalize bg-purple-400 hover:bg-purple-600 max-w-fit px-4 py-2">
            Create New CV
          </NavLink>
        </div>
        <p  className="text-xl text-center">
          Here you will find your CVs created with CV-builder before
        </p>
      </div>
    </Layout>
  );
}

export default MyCVsPage;