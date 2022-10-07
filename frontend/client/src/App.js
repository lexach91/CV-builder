import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./containers/HomePage";
import RegisterPage from "./containers/RegisterPage";
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
