import Layout from "../components/Layout";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from 'primereact/button'
import HeaderFormBlock from "../components/HeaderFormBlock";
import SummaryFormBlock from "../components/SummaryFormBlock";
import ExperienceFormBlock from "../components/ExperienceFormBlock";


const CreateCVPage = (props) => {

  const [showSummaryForm, setShowSummaryForm] = useState(false);

  const [experiences, setExperiences] = useState([]);
  const [experienceForm, setExperienceForm] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const cvId = useParams().id;
  console.log(cvId);

  const getCVDetails = async () => {
    console.log(window.location.origin);
    const res = axios.get(`cvs/?id=${cvId}`);

    const data = await res.data;
    console.log(data);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    } else {
      getCVDetails();
    }
  }, [isAuthenticated]);

  let IdProps = {
    cvId: cvId,
  }
    

  console.log(IdProps);


  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Create CV page'>
      <div className="pt-4 container mx-auto">
        <div className="flex justify-content-center">
          <div className="card min-w-screen flex justify-content-center flex-column align-content-center">
            <h1 className="text-center">Create CV</h1>
            <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
              <h2 className="text-2xl text-center mb-4 text-emerald-400">Header</h2>
              <HeaderFormBlock {...IdProps}/>
            </div>
            {/* Summary block */}
            <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
              <h2 className="text-2xl text-center mb-4 text-emerald-400">Summary</h2>
              <SummaryFormBlock {...IdProps}/>
            </div>
            {/* Experience block */}
            <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
              <h2 className="text-2xl text-center mb-4 text-emerald-400">Experience</h2>
              {!experienceForm && (
                <div className="flex justify-content-center m-4">
                  <Button
                    label='Add experience'
                    className="p-button-rounded p-button-success"
                    onClick={(e) => {
                      e.preventDefault();
                      setExperienceForm(true);
                    }}
                  />
                </div>
              )}
              {experienceForm && <ExperienceFormBlock  />}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );

}

export default CreateCVPage;