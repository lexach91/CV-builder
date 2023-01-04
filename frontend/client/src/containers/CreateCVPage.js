import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'
import HeaderFormBlock from "../components/HeaderFormBlock";
import SummaryFormBlock from "../components/SummaryFormBlock";
import ExperienceFormBlock from "../components/ExperienceFormBlock";



const onSubmit = (values) => {
  console.log(values);
};


const CreateCVPage = () => {

  const [showHeaderForm, setShowHeaderForm] = useState(false);
  const [ headerExists, setHeaderExists ] = useState(false);
  const [headerData, setHeaderData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    url_link: '',
    job_title: '',
  });

  const [showSummaryForm, setShowSummaryForm] = useState(false);
  const [summaryExists, setSummaryExists] = useState(false);
  const [summaryData, setSummaryData] = useState({
    summary: '',
  });

  const [experiences, setExperiences] = useState([]);
  const [experienceForm, setExperienceForm] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const cvId = useParams().id;
  console.log(cvId);

  const getCVDetails = async () => {
    console.log(window.location.origin);
    const res = await fetch(`${window.location.origin}/api/cvs/?id=${cvId}`);

    const data = await res.json();
    console.log(data);
    if (data.header) {
      setHeaderExists(true);
      console.log("header exists");
      setHeaderData({
        first_name: data.header.first_name,
        last_name: data.header.last_name,
        email: data.header.email,
        phone: data.header.phone,
        address: data.header.address,
        url_link: data.header.url_link,
        job_title: data.header.job_title,
      });
    }

    if (data.summary) {
      setSummaryExists(true);
      console.log("summary exists");
      setSummaryData({
        summary: data.summary.summary,
      });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    } else {
      getCVDetails();
    }
  }, [isAuthenticated]);

  // let headerProps = {
  //   id: cvId,
  //   header_id: headerData.header_id,

  // };
  // console.log(headerProps);

  let headerProps = headerExists ? (
    {
      id: cvId,
      header_id: true,
      job_title: headerData.job_title,
      email: headerData.email,
      phone: headerData.phone,
      address: headerData.address,
      url_link: headerData.url_link,
    }
  ) : (
    {
      id: cvId,
      header_id: false,
      job_title: headerData.job_title,
      email: headerData.email,
      phone: headerData.phone,
      address: headerData.address,
      url_link: headerData.url_link,
    }
  )
  console.log(headerProps);


  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Create CV page'>
      <div className="pt-4 container mx-auto">
        <div className="flex justify-content-center">
          <div className="card min-w-screen flex justify-content-center flex-column align-content-center">
            <h1 className="text-center">Create CV</h1>
            <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
              <h2 className="text-2xl text-center mb-4 text-emerald-400">Header</h2>
              {/* Header block */}
              {!showHeaderForm && (
                <div className="flex justify-content-center m-4">
                  {/* Check if header exist */}
                  {headerExists ? (
                    <div className="flex justify-content-center m-4">
                      <div>
                        {/* headerData */}
                        {headerData.first_name} {headerData.last_name}
                        {headerData.job_title}
                        {headerData.email}
                        {headerData.phone}
                        {headerData.address}
                        {headerData.url_link}
                      </div>
                      <Button
                        label='Edit header'
                        className="p-button-rounded p-button-success"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowHeaderForm(true);     
                          // send header data to header form block
                        }}
                      />
                    </div>
                  ) : (
                    <Button 
                      label='Add header'
                      className="p-button-rounded p-button-success"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowHeaderForm(true);                        
                      }}
                    />

                  )}
                </div>
              )}
              {showHeaderForm && <HeaderFormBlock {...headerProps}  />}
            </div>
            {/* Summary block */}
            <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
              <h2 className="text-2xl text-center mb-4 text-emerald-400">Summary</h2>
              {!showSummaryForm && (
                <div className="flex justify-content-center m-4">
                  {/* Check if summary exist */}
                  {summaryExists && (
                    <div className="flex justify-content-center m-4">
                      <div>
                        {/* summaryData */}
                        {summaryData.summary}
                      </div>
                    </div>
                  )}
                  <Button
                    label='Add summary'
                    className="p-button-rounded p-button-success"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSummaryForm(true);                        
                    }}
                  />
                </div>
              )}
              {showSummaryForm && <SummaryFormBlock />}
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
              {experienceForm && <ExperienceFormBlock />}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );

}

export default CreateCVPage;