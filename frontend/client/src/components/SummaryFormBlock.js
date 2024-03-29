import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Field } from 'react-final-form';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'



const SummaryFormBlock = (props) => {

  const { isAuthenticated, user, registered, loading } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);


  const [showSummaryForm, setShowSummaryForm] = useState(false);
  const [summaryExists, setSummaryExists] = useState(false);
  const [summaryData, setSummaryData] = useState({
    summary: '',
  });

  // Props from CreateCVPage
  const { cvId } = props;

  useEffect(() => {
    if (cvId) {
      const getCVDetails = async () => {
        console.log(window.location.origin);
        const res = await axios.get(`cvs/?id=${cvId}`);

        const data = await res.data;
        console.log(data);
        if (data.summary !== null) {
          console.log("Summary exists");
          setSummaryExists(true)
          setSummaryData({
            summary: data.summary.summary,
          });
        } else {
          console.log("Summary does not exist");
          setSummaryExists(false)
        }
      };
      getCVDetails();
    }
  }, [cvId]);
  


  const responseSummary = async (data, form) => {
    console.log(data);
    setSummaryData(data);
    const payloadSummary = {
      id : cvId,
      summary: data.summary,
    };
    console.log(payloadSummary);

    if (!summaryExists) {
      // If create, then use POST
      try {
        console.log("We are in the header form block with id_exist = false");
        const response = await axios.post(`cvs/summary/`, payloadSummary);
        const data = await response.data;
        console.log(data);
        setSummaryExists(true);
        setShowSummaryForm(false);
        // set data from response to summaryData
        setSummaryData({
          summary: data.summary,
        });
        // navigate(`/cvs/${data.id}`);
        console.log("We are in the summary form block with success on create");
      }
      catch (error) {
        console.log(error);
      }
    } else {
      // If update, then use PUT
      setSummaryData(data);
      try {
        console.log("We are in the summary form block with id_exist = true");
        const response = await axios.put(`cvs/summary/`, payloadSummary);
        const data = await response.data;
        console.log(data);
        setShowSummaryForm(false);
        // navigate(`/cvs/${data.id}`);
        // set data from response to headerData
        setSummaryData({
          summary: data.summary,
        });
        console.log("We are in the summary form block with success on update");
      }
      catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {!showSummaryForm && (
        <div className="flex justify-content-center m-4">
          {/* Check if summary exist */}
          {summaryExists ? (
            <>
              <div className="flex justify-content-center flex-column align-content-center mb-4">
                <div>
                  {/* summaryData */}
                  <div className="flex justify-content-center flex-column align-content-center m-4 text-center">
                    {summaryData.summary}
                  </div>
                </div>
                <Button
                  label='Edit summary'
                  className="p-button-rounded p-button-success m-0 px-4"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSummaryForm(true);                        
                  }}
                />
              </div>
            </> 
          ) : (
            <Button
              label='Add summary'
              className="p-button-rounded p-button-success px-4"
              onClick={(e) => {
                e.preventDefault();
                setShowSummaryForm(true);                        
              }}
            />
          )}
        </div>
      )}
      {showSummaryForm && (
        <Form
          onSubmit={responseSummary}
          initialValues={{ summaryData }}
          // validate={validate}
          render={({ handleSubmit }) => (
            <form
              className="p-fluid bg-slate-900 p-6 rounded shadow-md"
              onSubmit={handleSubmit}
            >
              <div className="card">
                <div className="formgrid grid">
                  <div className="field col">
                    <Field name="summary" render={({ input, meta }) => (
                      <div className="field col w-full">
                        <span className="p-float-label">
                          <InputTextarea
                            id="summary" {...input}
                            autoFocus
                            className=""
                          />
                          <label
                            htmlFor="summary"
                            className="">
                              summary
                          </label>
                        </span>
                      </div>
                    )} />
                  </div>

                </div>
              </div>
              <Button
                label="Save Summary"
                className="mt-2"
                type="submit"
              />
            </form>
          )}
        />
      )}
    </>
  );
};

export default SummaryFormBlock;



