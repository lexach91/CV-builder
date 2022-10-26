import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { CountryService } from "../service/CountryService";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/user';
// https://reactdatepicker.com/
import "react-datepicker/dist/react-datepicker.css";


// Set up error messages


const RegisterPage = () => {

  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const { registered, loading, errors } = useSelector((state) => state.user);
  const [showMessage, setShowMessage] = useState(false);
  const countryservice = new CountryService();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  useEffect(() => {
      countryservice.getCountries().then(data => setCountries(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const validate = (data) => {
    let errors = {};

    if (!data.first_name) {
        errors.first_name = 'First Name is required.';
    }

    if (!data.last_name) {

        errors.last_name = 'Last Name is required.';
    }
    if (data.country === "empty") {
        errors.country = 'Country is required.';
    }

    if (!data.email) {
        errors.email = 'Email is required.';
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Invalid email address. E.g. example@email.com';
    }

    if (!data.password) {
        errors.password = 'Password is required.';
    }

    if (!data.password_confirm) {
        errors.password_confirm = 'Password confirmation is required.';
    }

    if (data.password !== data.password_confirm) {
        errors.password_confirm = 'Passwords do not match.';
    }

    return errors;
};

  const onSubmit = async (data, form) => {
    setFormData(data);
    const payloadUser = {
      first_name: data.first_name,
      last_name: data.last_name,
      birthday: data.date.toISOString().substring(0, 10),
      country: data.country,
      email: data.email,
      password: data.password,
      password_confirm: data.password_confirm,
    };
    console.log(payloadUser);
    dispatch(register(payloadUser));
	};

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
      return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
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

  if (registered) {
    return <Navigate to='/login' />;
  }

  return (
    <Layout title='CV-builder | Register' content='Register to the app'>
      <div className='form-demo'>
        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
          <div className="flex align-items-center flex-column pt-6 px-3">
            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
            <h5>Registration Successful!</h5>
            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
              Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
            </p>
          </div>
        </Dialog>
        <div className="flex justify-content-center">
          <div className="card">
            <Form onSubmit={onSubmit} initialValues={{ first_name: '', last_name: '', email: '', password: '', birthday: null, country: null, password_confirm: '' }} validate={validate} render={({ handleSubmit }) => (
              <form
                className="p-fluid bg-slate-900 p-6 rounded shadow-md"
                onSubmit={handleSubmit}
              >
                <h1 className='text-5xl text-center mb-6 text-emerald-400'>Register</h1>
                <p className='text-xl text-center'>
                  Already have an account? <Link className="ml-2 underline text-emerald-400 hover:text-emerald-600" to="/login">Login</Link>
                </p>
                <Field name="first_name" render={({ input, meta }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <InputText id="first_name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) || errors?.error })} />
                      <label htmlFor="first_name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>First name*</label>
                    </span>
                    {getFormErrorMessage(meta)}
                  </div>
                )} />
                <Field name="last_name" render={({ input, meta }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <InputText id="last_name" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) || errors?.error })} />
                      <label htmlFor="last_name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Last name*</label>
                    </span>
                    {getFormErrorMessage(meta)}
                  </div>
                )} />
                <Field name="country" render={({ input }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <Dropdown id="country" {...input} options={countries} />
                      <label htmlFor="country">Country</label>
                    </span>
                  </div>
                )} />
                <Field name="date" render={({ input }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                      <label htmlFor="date">Birthday</label>
                    </span>
                  </div>
                )} />
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
                      <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                      <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                    </span>
                    {getFormErrorMessage(meta)}
                  </div>
                )} />
                <Field name="password_confirm" render={({ input, meta }) => (
                  <div className="field">
                    <span className="p-float-label">
                      <Password id="password_confirm" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                      <label htmlFor="password_confirm" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Confirm password*</label>
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

export default RegisterPage;