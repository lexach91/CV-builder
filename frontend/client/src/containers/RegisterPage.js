import Layout from "../components/Layout";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Link, Navigate } from "react-router-dom"; 
import { classNames } from 'primereact/utils';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/user';
// https://reactdatepicker.com/
import "react-datepicker/dist/react-datepicker.css";


// Set up error messages


const RegisterPage = () => {

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const { registered, loading } = useSelector((state) => state.user);
  const [showMessage, setShowMessage] = useState(false);

  const [formData, setFormData] = useState({});

  const validate = (data) => {
    let errors = {};

    if (!data.first_name) {
        errors.first_name = 'First Name is required.';
    }

    if (!data.last_name) {

        errors.last_name = 'Last Name is required.';
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

  const { first_name, last_name, birthday, country, email, password, password_confirm } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (data, form) => {
    // set birthday
    const birthDateFormatted2 = startDate.toISOString().slice(0, 10);
    console.log(birthDateFormatted2);
    formData.birthday = birthDateFormatted2;

		dispatch(register({ first_name, last_name, birthday, country, email, password, password_confirm }));
    console.log(formData);
    setShowMessage(true);

    form.restart();

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
      <div className='container flex flex-wrap justify-center flex-col content-center h-[90%] my-20 bg-slate-800 mx-auto max-w-120rem '>

      <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: '', date: null, country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
        <form
          className="w-full max-w-lg bg-slate-900 py-9 px-6 rounded-xl"
          onSubmit={handleSubmit}
        >
          <h1 className='text-5xl text-center mb-6 text-emerald-400'>Register</h1>
          <p className='text-xl text-center'>
            Already have an account? <Link className="ml-2 underline text-emerald-400 hover:text-emerald-600" to="/login">Login</Link>
          </p>
          <Field name="first_name" render={({ input, meta }) => (
              <div className="field">
                  <span className="p-float-label">
                      <InputText id="first_name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                      <label htmlFor="first_name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>First name*</label>
                  </span>
                  {getFormErrorMessage(meta)}
              </div>
          )} />
          <Field name="last_name" render={({ input, meta }) => (
              <div className="field">
                  <span className="p-float-label">
                      <InputText id="last_name" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                      <label htmlFor="last_name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Last name*</label>
                  </span>
                  {getFormErrorMessage(meta)}
              </div>
          )} />
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
                htmlFor="country">
                  Country
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' 
                id="country"
                name="country"
                type="text"
                onChange={onChange}
                value={country}
                placeholder="Albuquerque"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
                htmlFor="birthday">
                  birthday
              </label>
              <div className="flex items-center justify-center">
                <DatePicker
                  className="text-black appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  selected={startDate}
                  onChange={((date) => setStartDate(date))}
                  dateFormat="yyyy/MM/dd"
                  value={startDate}
                  id="birthday"
                  name="birthday"
                />
              </div>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6'>
            <div className="w-full px-3">
              <label
                htmlFor="email"
                className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                onChange={onChange}
                value={email}
                name="email"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder='Enter email' />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
                htmlFor="password">
                  Password
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' 
                id="password"
                name="password"
                onChange={onChange}
                value={password}
                type="password"
                placeholder="******************"/>
              <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
                htmlFor="password_confirm">
                  Confirm Password
              </label>
              <input
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' 
                id="password_confirm"
                name="password_confirm"
                onChange={onChange}
                value={password_confirm}
                type="password"
                placeholder="******************"/>
              <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
          </div>
          <div className="flex w-full justify-center">
          {loading ? (
            // add loading tailwind spinner
            <button
              className="flex items-center bg-emerald-400 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded focus:outline-none focus:shadow-outline"
              type="button"
              disabled
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle

                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"

                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1zm0 0h1v1a7 7 0 007-7H4v1zm0 0v1h1a7 7 0 007 7V4h-1zm0 0h1a8 8 0 018 8h-1a7 7 0 00-7-7z"
                ></path>
              </svg>
              Loading...
            </button>
          ) : (
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
              Register
            </button>
          )}
          </div>
        </form>
        )} />
      </div>
    </Layout>
  );
}

export default RegisterPage;