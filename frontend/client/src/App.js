import "./App.css";
import { lazy, Suspense } from "react";
import "primereact/resources/themes/mdc-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { getUser } from './features/user';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const HomePage = lazy(() => import("./containers/HomePage"));
const RegisterPage = lazy(() => import("./containers/RegisterPage"));
const LoginPage = lazy(() => import("./containers/LoginPage"));
const MyCVsPage = lazy(() => import("./containers/MyCVsPage"));
const CreateCVPage = lazy(() => import("./containers/CreateCVPage"));
const ProfilePage = lazy(() => import("./containers/ProfilePage"));

function App() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector(state => state.user);

  useEffect(() => {
    try {
      dispatch(getUser());
    }
    catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
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
  );
}

export default App;
