import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";


const MyCVsPage = () => {

  const { isAuthenticated } = useSelector((state) => state.user);
  const [ NewCV, setNewCV ] = useState(false);


  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const responseCreateCV = async () => {
    setNewCV(true);
    try {
      const response = await fetch("api/cvs/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log(data);
      navigate(`/cvs/${data.id}`);
    }
    catch (error) {
      console.log(error);
    }
  };

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
          <Button to="/create-cv"
            className="p-button-rounded p-button-success"
            label='Create CV'
            onClick={() => {
              responseCreateCV();
              }}
          />
        </div>
        <p  className="text-xl text-center">
          Here you will find your CVs created with CV-builder before
        </p>
      </div>
    </Layout>
  );
}

export default MyCVsPage;