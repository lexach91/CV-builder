import Layout from "../components/Layout";
import { Link } from "react-router-dom"; 

// Set up error messages


const LoginPage = () => {
  return (
    <Layout title='Register' content='Register to the app'>
      <div className='container flex flex-wrap justify-center flex-col content-center h-[90%] my-20 bg-slate-800 mx-auto max-w-120rem'>


        <form className="w-full max-w-lg bg-slate-900 py-9 px-10 rounded-xl">
          <h1 className='text-5xl text-center mb-6 text-emerald-400'>Login</h1>
          <p className='text-xl text-center'>
            Don't have an account? <Link className="ml-2 underline text-emerald-400 hover:text-emerald-600" to="/register">Register</Link>
          </p>
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
          <div className="flex w-full justify-center">
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
                  >
              Register
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default LoginPage;