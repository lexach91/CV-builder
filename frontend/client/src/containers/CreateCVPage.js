import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';



const onSubmit = (values) => {
  console.log(values);
};


const CreateCVPage = () => {
  return (
    <Layout title='CV-builder | My CVs' content='Welcome to the Create CV page'>
      <div className="pt-4 container mx-auto">
        <h1 className="text-6xl text-center my-6 text-emerald-400 ">
          Create New CV
        </h1>
        <p  className="text-xl text-center">
          Here goes the create CV Page
        </p>
        <div className="flex justify-content-center">
          <div className="card">
          <Form onSubmit={onSubmit}
            initialValues={{ first_name: '', last_name: '', email: '', password: '', birthday: null, country: null, password_confirm: '' }}
            // validate={validate}
            render={({ handleSubmit }) => (
              <form
                className="p-fluid bg-slate-900 p-6 rounded shadow-md"
              >
                <h1 className='text-5xl text-center mb-6 text-emerald-400'>Create CV</h1>

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
                          First name*
                      </label>
                    </span>

                  </div>
                )} />
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
                          First name*
                      </label>
                    </span>

                  </div>
                )} />
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