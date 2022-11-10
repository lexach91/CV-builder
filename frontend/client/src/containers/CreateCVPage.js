import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';



const onSubmit = (values) => {
  console.log(values);
};


const CreateCVPage = () => {
  const [header, setHeader] = useState({
    first_name: '',
    last_name: '',
    job_title: '',
    email: '',
    phone: '',
    address: '',
    url_link: '',
  });
  const [showHeaderForm, setShowHeaderForm] = useState(false);
  const [summary, setSummary] = useState("");
  const [experiences, setExperiences] = useState([]);

  const HeaderBlock = (
    <>
      <Form onSubmit={onSubmit}
        initialValues={{ first_name: '', last_name: '', email: '', password: '', birthday: null, country: null, password_confirm: '' }}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form
            className="p-fluid bg-slate-900 p-6 rounded shadow-md"
          >
            <div className="card">
              <div class="formgrid grid">
                <div class="field col">
                  <Field name="first_name" render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="first_name" {...input}
                          autoFocus
                          className=""
                        />
                        <label
                          htmlFor="first_name"
                          className="">
                            First name
                        </label>
                      </span>
                    </div>
                  )} />
                </div>
                <div class="field col">
                  <Field name="last_name" render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="last_name" {...input}
                          autoFocus
                          className=""
                        />
                        <label
                          htmlFor="last_name"
                          className="">
                            Last name
                        </label>
                      </span>
                    </div>
                  )} />
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div class="formgrid grid">
                <Field name="job_title" render={({ input, meta }) => (
                    <div className="field col w-full">
                      <span className="p-float-label">
                        <InputText
                          id="job_title" {...input}
                          autoFocus
                          className=""
                        />
                        <label
                          htmlFor="job_title"
                          className="">
                            job_title
                        </label>
                      </span>
                    </div>
                  )} />
              </div>
            </div>
            <div className="card">
              <div class="formgrid grid">
                <div class="field col">
                  <Field name="email" render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="email" {...input}
                          autoFocus
                          className=""
                        />
                        <label
                          htmlFor="email"
                          className="">
                            email
                        </label>
                      </span>

                    </div>
                  )} />
                </div>
                <div class="field col">
                  <Field name="phone" render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="phone" {...input}
                          autoFocus
                          className=""
                        />
                        <label
                          htmlFor="phone"
                          className="">
                            phone
                        </label>
                      </span>

                    </div>
                  )} />
                </div>
              </div>
            </div>

            <div className="card">
              <div class="formgrid grid">
                <Field name="address" render={({ input, meta }) => (
                    <div className="field col w-full">
                      <span className="p-float-label">
                        <InputText
                          id="address" {...input}
                          autoFocus
                          className=""
                        />
                        <label
                          htmlFor="address"
                          className="">
                            address
                        </label>
                      </span>
                    </div>
                  )} />
              </div>
            </div>

            <div className="card">
              <div class="formgrid grid">
                <Field name="url_link" render={({ input, meta }) => (
                    <div className="field col w-full">
                      <span className="p-float-label">
                        <InputText
                          id="url_link" {...input}
                          autoFocus
                          className=""
                        />
                        <label
                          htmlFor="url_link"
                          className="">
                            url_link
                        </label>
                      </span>
                    </div>
                  )} />
              </div>
            </div>
            </form>
              )} />
    </>
  );

  const SummaryBlock = (
    <>
      <Form onSubmit={onSubmit}
        initialValues={{ summary: '' }}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form
            className="p-fluid bg-slate-900 p-6 rounded shadow-md min-full-400px"
          >
                            <div className="card mt-4">
                  <div class="formgrid grid">
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
          </form>
        )} />
    </>
  );

  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Create CV page'>
      <div className="pt-4 container mx-auto">
        <div className="flex justify-content-center">
          <div className="card">
            <h1 className="text-center">Create CV</h1>


                <div className="card mt-4 border-500 border-3 border-round p-4 min-w-full w-screen md:min-w-0">
                  <h2 className="text-2xl text-center mb-4 text-emerald-400">Header</h2>
                  {/* add section header on button click */}
                  {!showHeaderForm && (
                    <Button 
                      label='Add header'
                      className="p-button-rounded p-button-success"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowHeaderForm(true);                        
                      }}
                    />
                  )}
                  {showHeaderForm && HeaderBlock}
                    

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
                    <div class="formgrid grid">
                      <div class="field col">
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
                      <div class="field col">
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
                    <div class="formgrid grid">
                      <div class="field col">
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
                      <div class="field col">
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
                      <div class="formgrid grid">
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
                
                
                <Button type="submit" label="Submit" className="mt-2" />
              </form>
              )} />
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default CreateCVPage;