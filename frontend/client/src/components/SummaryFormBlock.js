import React, { useEffect, useState } from "react";
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
        const res = await fetch(`${window.location.origin}/api/cvs/?id=${cvId}`);

        const data = await res.json();
        console.log(data);
        setSummaryExists(true)
        if (data.summary) {
          setSummaryData({
            summary: data.summary.summary,
          });
        }
      };
      getCVDetails();
    }
  }, [cvId]);
  

  // {!showSummaryForm && (
  //   <div className="flex justify-content-center m-4">
  //     {/* Check if summary exist */}
  //     {summaryExists && (
  //       <div className="flex justify-content-center m-4">
  //         <div>
  //           {/* summaryData */}
  //           {summaryData.summary}
  //         </div>
  //       </div>
  //     )}
  //     <Button
  //       label='Add summary'
  //       className="p-button-rounded p-button-success"
  //       onClick={(e) => {
  //         e.preventDefault();
  //         setShowSummaryForm(true);                        
  //       }}
  //     />
  //   </div>
  // )}
  // {showSummaryForm && <SummaryFormBlock />}

  return (
    <>
      <Form
        // onSubmit={onSubmit}
        initialValues={{ summary: '' }}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form
            className="p-fluid bg-slate-900 p-6 rounded shadow-md"
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

            <Button type="submit" label="Save" className="mt-2" />
          </form>
        )} />
    </>
  );
};

export default SummaryFormBlock;



