import "./App.css";
import { lazy, Suspense } from "react";
import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuth, resetErrors, resetMessages } from './features/user';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { useRef } from "react";


const HomePage = lazy(() => import("./containers/HomePage"));
const RegisterPage = lazy(() => import("./containers/RegisterPage"));
const LoginPage = lazy(() => import("./containers/LoginPage"));
const MyCVsPage = lazy(() => import("./containers/MyCVsPage"));
const CreateCVPage = lazy(() => import("./containers/CreateCVPage"));
const ProfilePage = lazy(() => import("./containers/ProfilePage"));

function App() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user, errors, messages } = useSelector(state => state.user);
  const toast = useRef(null);

  useEffect(() => {
    try {
      dispatch(checkAuth());
    }
    catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (errors) {
      console.log(errors);
      toast.current.show({ severity: 'error', summary: 'Error', detail: errors });
      setTimeout(() => {
        dispatch(resetErrors());
      }, 5000);
    }
  }, [errors]);

  useEffect(() => {
    if (messages) {
      console.log(messages);
      toast.current.show({ severity: 'success', summary: 'Success', detail: messages });
      setTimeout(() => {
        dispatch(resetMessages());
      }, 5000);
    }
  }, [messages]);

  return (
    <>
      <Toast ref={toast} />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/cvs' element={<MyCVsPage />} />
            <Route path='/create-cv' element={<CreateCVPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>       
    </>
  );
}

export default App;
