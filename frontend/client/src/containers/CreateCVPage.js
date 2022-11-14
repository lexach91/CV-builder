import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'
import HeaderBlock from "../components/HeaderBlock";
import SummaryBlock from "../components/SummaryBlock";
import { useSelector, useDispatch } from "react-redux";



const onSubmit = (values) => {
  console.log(values);
};


const CreateCVPage = () => {

  const [showHeaderForm, setShowHeaderForm] = useState(false);
  const [showSummaryForm, setShowSummaryForm] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated]);


  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Create CV page'>
      <div className="pt-4 container mx-auto">
        <div className="flex justify-content-center">
          <div className="card min-w-screen flex justify-content-center flex-column align-content-center">
            <h1 className="text-center">Create CV</h1>


                <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
                  <h2 className="text-2xl text-center mb-4 text-emerald-400">Header</h2>
                  {/* add section header on button click */}
                  {!showHeaderForm && (
                    <div className="flex justify-content-center m-4">
                    <Button 
                      label='Add header'
                      className="p-button-rounded p-button-success"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowHeaderForm(true);                        
                      }}
                    />
                    </div>
                  )}
                  {showHeaderForm && <HeaderBlock />}
                </div>
                <div className="card mt-4 border-500 border-3 border-round p-4 mx-auto w-6 justify-content-center">
                  <h2 className="text-2xl text-center mb-4 text-emerald-400">Summary</h2>
                  {!showSummaryForm && (
                    <div className="flex justify-content-center m-4">
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
                  {showSummaryForm && <SummaryBlock />}
                </div>


                  <h2 className="text-2xl text-center m-4 text-emerald-400">Experience</h2>
          <Form onSubmit={onSubmit}
            initialValues={{ first_name: '', last_name: '', email: '', password: '', birthday: null, country: null, password_confirm: '' }}
            // validate={validate}
            render={({ handleSubmit }) => (
              <form
                className="p-fluid bg-slate-900 p-6 rounded shadow-md"
              >
                {experiences.map((experience, index) => (

                <div className="card mt-4 border-500 border-3 border-round p-4">

                  <div className="card">
                    <div className="formgrid grid">
                      <div className="field col">
                        <Field name="company" render={({ input, meta }) => (
                          <div className="field">
                            <span className="p-float-label">
                              <InputText
                                id={`company${index}`}
                                {...input}
                                autoFocus
                                className=""
                              />
                              <label
                                htmlFor={`company${index}`}
                                className="">
                                  company
                              </label>
                            </span>

                          </div>
                        )} />
                      </div>
                      <div className="field col">
                        <Field name="position" render={({ input, meta }) => (
                          <div className="field">
                            <span className="p-float-label">
                              <InputText
                                id={`position${index}`}
                                {...input}
                                autoFocus
                                className=""
                              />
                              <label
                                htmlFor={`position${index}`}
                                className="">
                                  position
                              </label>
                            </span>

                          </div>
                        )} />
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="formgrid grid">
                      <div className="field col">
                        <Field name="start_date" render={({ input, meta }) => (
                          <div className="field">
                            <span className="p-float-label">
                              <InputText
                                id={`start_date${index}`}
                                {...input}
                                autoFocus
                                className=""
                              />
                              <label
                                htmlFor={`start_date${index}`}
                                className="">
                                  start_date
                              </label>
                            </span>

                          </div>
                        )} />
                      </div>
                      <div className="field col">
                        <Field name="end_date" render={({ input, meta }) => (
                          <div className="field">
                            <span className="p-float-label">
                              <InputText
                                id={`end_date${index}`}
                                {...input}
                                autoFocus
                                className=""
                              />
                              <label
                                htmlFor={`end_date${index}`}
                                className="">
                                  end_date
                              </label>
                            </span>

                          </div>
                        )} />
                      </div>
                    </div>
                    <div className="card">
                      <div className="formgrid grid">
                        <Field name="description" render={({ input, meta }) => (
                            <div className="field col w-full">
                              <span className="p-float-label">
                                <InputTextarea
                                  id={`description${index}`}
                                  {...input}
                                  autoFocus
                                  className=""
                                />
                                <label
                                  htmlFor={`description${index}`}
                                  className="">
                                    description
                                </label>
                              </span>
                            </div>
                          )} />
                      </div>
                    </div>
                  </div>
                  <Button type="button" label="Save" icon="pi pi-check" onClick={() => this.addExperience()} />
                
                </div>

                ))}
                {/* add button which calls more work expreience
                 */}
                <Button 
                  label="+ Add Experience" 
                  className="p-button-raised p-button-rounded p-button-secondary"
                  id="add-experience"
                  onClick={
                    (e) => {
                      e.preventDefault();
                      setExperiences([...experiences, {id: experiences.length}]);
                    }
                  }
                />
                
                

              </form>
              )} />
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default CreateCVPage;