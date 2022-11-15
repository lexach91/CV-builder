import React, { useEffect, useState } from "react";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button'
import { useSelector, useDispatch } from "react-redux";


const HeaderBlock = () => {
  const { isAuthenticated, user, registered, loading } = useSelector(
    (state) => state.user
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [header, setHeader] = useState({
    job_title: '',
    email: '',
    phone: '',
    address: '',
    url_link: '',
  });


  useEffect(() => {
    if (isAuthenticated && user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
    } else {
      setFirstName("");
      setLastName("");
    }
  }, [isAuthenticated, user]);

  const onSubmit = (values) => {
    console.log(values);
    // setHeaderFormData(values);
  };
  

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{ first_name: '', last_name: '', job_title: '', email: '', phone: '', address: '', url_link: '' }}
        // validate={validate}
        render={({ handleSubmit }) => (
          <form
            className="p-fluid bg-slate-900 p-6 rounded shadow-md"
          >
            <div className="card">
              <div className="formgrid grid">
                <div className="field col relative">
                  <div 
                    className="flex w-full align-items-start justify-content-end">
                    <Button
                        className="p-button-rounded p-button-text p-button-plain"
                        icon="pi pi-question-circle"
                        tooltip="Go to profile to change your First Name"
                        disabled
                        tooltipOptions={{ showOnDisabled: true }}
                      />
                  </div>
                  <Field name="first_name" render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="first_name" {...input}
                          value={firstName}
                          autoFocus
                          className="font-bold"
                          disabled
                          title="Go to profile to change your first name"
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

                <div className="field col">
                  <div 
                    className="flex w-full align-items-start justify-content-end">
                    <Button
                        className="p-button-rounded p-button-text p-button-plain"
                        icon="pi pi-question-circle"
                        tooltip="Go to profile to change your Last Name"
                        disabled
                        tooltipOptions={{ showOnDisabled: true }}
                      />
                  </div>
                  <Field name="last_name" title="GOVNO" render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="last_name" {...input}
                          value={lastName}
                          autoFocus
                          className="font-bold"
                          disabled
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
              <div className="formgrid grid">
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
              <div className="formgrid grid">
                <div className="field col">
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

                <div className="field col">
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
              <div className="formgrid grid">
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
              <div className="formgrid grid">
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

            <Button type="submit" label="Save" className="mt-2" />
          </form>
        )} />
    </>
  );
};

export default HeaderBlock;



