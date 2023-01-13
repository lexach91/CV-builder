import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'



const ExperienceFormBlock = () => {
  const { isAuthenticated, user, registered, loading } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [experienceSectionExists, setExperienceSectionExists] = useState(false);
  const [experienceSectionData, setExperienceSectionData] = useState({});

  const onSubmit = (values) => {
    console.log(values);
    // setHeaderFormData(values);
  };
  

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{ first_name: '', last_name: '', email: '', password: '', birthday: null, country: null, password_confirm: '' }}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form
            className="p-fluid bg-slate-900 p-6 rounded shadow-md"
          >
            <div className="card mt-4 border-500 border-3 border-round p-4">
              <div className="card">
                <div className="formgrid grid">
                  <div className="field col">
                    <Field name="company" render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id={`company-new`}
                            {...input}
                            autoFocus
                            className=""
                          />
                          <label
                            htmlFor={`company-new`}
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
                            id={`position-new`}
                            {...input}
                            autoFocus
                            className=""
                          />
                          <label
                            htmlFor={`position-new`}
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
                            id={`start_date-new`}
                            {...input}
                            autoFocus
                            className=""
                          />
                          <label
                            htmlFor={`start_date-new`}
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
                            id={`end_date-new}`}
                            {...input}
                            autoFocus
                            className=""
                          />
                          <label
                            htmlFor={`end_date-new`}
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
                              id={`description-new`}
                              {...input}
                              autoFocus
                              className=""
                            />
                            <label
                              htmlFor={`description-new`}
                              className="">
                                description
                            </label>
                          </span>
                        </div>
                      )} />
                  </div>
                </div>
              </div>


  <Button type="button" label="Submit" icon="pi pi-check" onClick={() => this.addExperience()} />

            </div>



            <Button type="submit" label="Save" className="mt-2" />
          </form>
        )} />
    </>
  );
};

export default ExperienceFormBlock;



