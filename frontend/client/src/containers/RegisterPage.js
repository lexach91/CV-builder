import Layout from "../components/Layout";
import React, { useState } from "react";


import "react-datepicker/dist/react-datepicker.css";

const RegisterPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Layout title='Register' content='Register to the app'>
      <div className='container mx-auto flex flex-col justify-center items-center container w-full min-h-full'>


        <form className="w-full max-w-lg bg-slate-900 py-9 px-6 rounded-xl">
          <h1 className='text-5xl text-center mb-6 text-emerald-400'>Register</h1>
          <p className='text-xl text-center'>
            Already have an account? <a className="ml-2 underline text-emerald-400 hover:text-emerald-600" href="/login">Login</a>
          </p>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
               htmlFor="grid-first-name">
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"/>
              <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
               htmlFor="grid-last-name">
                  Last Name
              </label>
              <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name" type="text" placeholder="Doe"/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"htmlFor="grid-city">
                Country
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Albuquerque"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"htmlFor="grid-state">
                birthday
              </label>

              <div className="flex items-center justify-center">



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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder='Enter email' />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2"
               htmlFor="grid-password">
                  Password
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password" type="password" placeholder="******************"/>
              <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
          </div>

            
        </form>
      </div>
    </Layout>
  );
}

export default RegisterPage;