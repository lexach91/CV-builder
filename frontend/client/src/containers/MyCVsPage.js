import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";


const MyCVsPage = () => {

  const { isAuthenticated } = useSelector((state) => state.user);
  const [ NewCV, setNewCV ] = useState(false);

  const [ CVs, setCVs ] = useState([]);


  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const fetchCVs = async () => {
    try {
      console.log("fetchCVs");
      const response = await axios.get("allCvs/");
      console.log("response: ")
      const data = await response.data;
      console.log(data);
      setCVs(data);
      console.log(CVs);
    }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCVs();
  }, [])

  const responseCreateCV = async () => {
    setNewCV(true);
    try {
      const response = await axios.post("cvs/");
      const data = await response.data;
      console.log(data);
      navigate(`/cvs/${data.id}`);
    }
    catch (error) {
      console.log(error);
    }
  };

  // const responseGetCV = async () => {
  //   setNewCV(false);
  //   try {
  //     const response = await axios.get("cvs/");
  //     const data = await response.data;
  //     console.log(data);
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

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
        <div className="flex align-content-center">
          <div className="grid">
            {CVs ? (
              // map through the CVs and show them
              CVs.map((cv) => (
                <div
                  key={cv.id}
                  className="col-12 md:col-6 lg:col-3 flex justify-content-center align-content-center flex-col p-3"
                  >
                  <div className="flex justify-content-center align-content-center flex-col bg-slate-700 p-3 border-4 border-slate-900 rounded-lg">
                    <p className="text-xl text-center mb-3">
                      {cv.id}
                    </p>
                    <Button
                      className="p-button-rounded p-button-success"
                      label="Open CV"
                      onClick={() => {
                        navigate(`/cvs/${cv.id}`);
                        }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-content-center m-4">
                <p>No cvs</p>
              </div>
              )
            }
          </div>
        </div>
        <p  className="text-xl text-center">
          Here you will find your CVs created with CV-builder before
        </p>
      </div>
    </Layout>
  );
}

export default MyCVsPage;