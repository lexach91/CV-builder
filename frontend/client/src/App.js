import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from "./containers/HomePage";
import RegisterPage from "./containers/RegisterPage";
import LoginPage from "./containers/LoginPage";
import 'semantic-ui-css/semantic.min.css'

import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
