import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
import { useParams } from "react-router-dom";


const HeaderFormBlock = (props) => {
  const { isAuthenticated, user, registered, loading } = useSelector(
    (state) => state.user
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [headerExists, setHeaderExists] = useState(false);
  const [showHeaderForm, setShowHeaderForm] = useState(false);

  const [headerFormData, setHeaderFormData] = useState({});

  const [headerData, setHeaderData] = useState({
    first_name: '',
    last_name: '',
    job_title: '',
    email: '',
    phone: '',
    address: '',
    url_link: '',
  });

  // Props from CreateCVPage
  const { cvId } = props;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFirstName(user.first_name);
      console.log(user.first_name);
      console.log(firstName)
      setLastName(user.last_name);
    } else {
      setFirstName("");
      setLastName("");
    }
  }, [isAuthenticated, user]);



  useEffect(() => {
    if (cvId) {
      const getCVDetails = async () => {
        console.log(window.location.origin);
        const res = axios.get(`cvs/?id=${cvId}`);

        const data = await res.data;
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
      };
      getCVDetails();
    }
  }, [cvId]);


  // const CreateCVPage = () => {
  

  const responseHeader = async (data, form) => {
    console.log(data);
    setHeaderFormData(data);
    const payloadHeader = {
      id : cvId,
      job_title: data.job_title,
      email: data.email,
      phone: data.phone,
      address: data.address,
      url_link: data.url_link,
    };
    console.log(payloadHeader);

    if (!headerExists) {
      // If create, then use POST
      try {
        console.log("We are in the header form block with id_exist = false");
        const response = axios.post(`cvs/header/`);
        const data = await response.data;
        console.log(data);
        setHeaderExists(true);
        setShowHeaderForm(false);
        // set data from response to headerData
        setHeaderData({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          url_link: data.url_link,
          job_title: data.job_title,
        });
        // navigate(`/cvs/${data.id}`);
        console.log("We are in the header form block with success on create");
      }
      catch (error) {
        console.log(error);
      }
    } else {
      // If update, then use PUT
      setHeaderExists(true);
      try {
        console.log("We are in the header form block with id_exist = true");
        const response = await fetch(`/api/cvs/header/`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
          body: JSON.stringify(payloadHeader),
        });
        const data = await response.json();
        console.log(data);
        setShowHeaderForm(false);
        // navigate(`/cvs/${data.id}`);
        // set data from response to headerData
        setHeaderData({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          url_link: data.url_link,
          job_title: data.job_title,
        });
        console.log("We are in the header form block with success on update");
      }
      catch (error) {
        console.log(error);
      }
    }
  };
  


  return (
    <>
      {/* Header block */}
      {!showHeaderForm && (
        <div className="flex justify-content-center m-4">
          {/* Check if header exist */}
          {headerExists ? (
            <div className="flex justify-content-center flex-column align-content-center mb-4">
              <div>
                {/* headerData */}
                <div className="flex justify-content-center flex-column align-content-center m-4">
                  <h2  className="text-2xl text-center mb-4 uppercase">
                    {firstName} {lastName}
                  </h2>
                  <div className="flex justify-content-center flex-column align-content-center">
                    <h3 className="text-xl text-center mb-4 capitalize text-blue-100">job title: 
                      <span className="font-medium text-900 ml-2"> 
                        {headerData.job_title}
                      </span>
                    </h3>
                  </div>
                  <div className="flex justify-content-center flex-column align-content-center">
                    <h3 className="text-xl text-center mb-4 capitalize text-blue-100">email:
                      <span className="font-medium lowercase text-900 ml-2"> 
                        {headerData.email}
                      </span>
                    </h3>
                  </div>
                  <div className="flex justify-content-center flex-column align-content-center">
                    <h3 className="text-xl text-center mb-4 capitalize text-blue-100">phone:
                      <span className="font-medium lowercase text-900 ml-2"> 
                        {headerData.phone}
                      </span>
                    </h3>
                  </div>
                  <div className="flex justify-content-center flex-column align-content-center">
                    <h3 className="text-xl text-center mb-4 capitalize text-blue-100">address:
                      <span className="font-medium lowercase text-900 ml-2"> 
                        {headerData.address}
                      </span>
                    </h3>
                  </div>
                  <div className="flex justify-content-center flex-column align-content-center">
                    <h3 className="text-xl text-center mb-4 capitalize text-blue-100">url:
                      <span className="font-medium lowercase text-900 ml-2"> 
                        {headerData.url_link}
                      </span>
                    </h3>
                  </div>

                </div>
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
      {showHeaderForm && (
              <Form
              onSubmit={responseHeader}
              // get initialValues() from the headerData
              initialValues={headerData}
              // validate={validate}
              render={({ handleSubmit }) => (
                <form
                  className="p-fluid bg-slate-900 p-6 rounded shadow-md"
                  onSubmit={handleSubmit}
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
                        <Field name="last_name" render={({ input, meta }) => (
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
      
                  <Button
                    label="Save Header"
                    className="mt-2"
                    type="submit"
                  />
                </form>
              )} />
        )
      }
    </>
  );
};

export default HeaderFormBlock;