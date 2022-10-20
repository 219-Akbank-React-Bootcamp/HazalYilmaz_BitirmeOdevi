import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Provider } from 'react-redux';
// pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BoardPage from './pages/BoardPage';
import {AppPage}  from './pages/AppPage';
// components
import Layout from './components/Layout';
import Auth from './components/Auth';
// features
import store from './features/store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<LoginPage />}/>
              <Route path='/login' element={<LoginPage />}/>
              <Route path='/register' element={<RegisterPage />}/>
              <Route path='/boards' element={<Auth><BoardPage /></Auth>}/>
              <Route path='/boards/:boardId' element={<Auth><AppPage /></Auth>}/>
            </Route>
            <Route path='*' element={<p>404!</p>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
