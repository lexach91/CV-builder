import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Layout from "../components/Layout";
import { Link, Navigate } from "react-router-dom";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { login } from '../features/user';

// Set up error messages


const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, registered, errors } = useSelector(
		state => state.user
	);
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);


  const validate = (data) => {
    let errors = {};

    if (!data.email) {

        errors.email = 'Email is required.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Invalid email address. E.g. example@email.com';
  }

    if (!data.password) {
        errors.password = 'Password is required.';
    }

    return errors;
  }

  const onSubmit = (data, form) => {
    setFormData(data);
    const payload = {
      email: data.email,
      password: data.password
    }
    console.log(payload);
    dispatch(login(payload));
  }

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    let errorMessage = '';

      // return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
      if (isFormFieldValid(meta)) {
        errorMessage = meta.error;
      } else if (errors?.error) {
        errorMessage = errors.error;
      }
      return errorMessage && <small className="p-error">{errorMessage}</small>;

  };


  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
      <React.Fragment>
          <Divider />
          <p className="mt-2">Suggestions</p>
          <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
          </ul>
      </React.Fragment>
  );

  if (isAuthenticated) {
    return <Navigate to='/cvs' />;
  }

  return (
    <Layout title='CV-builder | Register' content='Register to the app'>
      <div className='form-demo'>
        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
          <div className="flex align-items-center flex-column pt-6 px-3">
            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
            <h5>Login Successful!</h5>
            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
              Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
            </p>
          </div>
        </Dialog>
        <div className="flex justify-content-center">
          <div className="card">
            <Form onSubmit={onSubmit} initialValues={{ email: '', password: ''}} validate={validate} render={({ handleSubmit }) => (
              <form
                className="p-fluid bg-slate-900 p-6 rounded shadow-md"
                onSubmit={handleSubmit}
              >
                <h1 className='text-5xl text-center mb-6 text-emerald-400'>Login</h1>
                <p className='text-xl text-center'>
                  Don't have an account? <Link className="ml-2 underline text-emerald-400 hover:text-emerald-600" to="/register">Register</Link>
                </p>
                <Field name="email" render={({ input, meta }) => (
                  <div className="field">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) || errors?.error })} />
                      <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                    </span>
                    {getFormErrorMessage(meta)}
                  </div>
                )} />
                <Field name="password" render={({ input, meta }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) || errors?.error })} header={passwordHeader} footer={passwordFooter} />
                      <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                    </span>
                    {getFormErrorMessage(meta)}
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

export default LoginPage;