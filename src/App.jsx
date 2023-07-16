import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshUser, logOut } from './redux/auth/operations';
import { useAuth } from './hooks/index';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import LoadingBar from './components/LoadingBar/LoadingBar';
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import css from "./App.module.css";

function App() {
  const { isLoggedIn, isRefreshing, isLoading } = useAuth();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (isRefreshing || isLoading) {
    return <LoadingBar />
  }

  const handleLogout = () => {
      dispatch(logOut());
    }

  return <Routes>
    <Route path='/login' element={ <LoginPage />} />
    <Route path='/signup' element={ <RegisterPage />} />
    <Route 
      path='/'
      element={
        <ProtectedRoute isLoggedIn={isLoggedIn}>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm />
          <h2 className={css.title}>Contacts</h2>
          <Filter />
          <ContactList />
          <div>
            <button onClick={handleLogout}>Log out</button>
          </div>
        </ProtectedRoute>}
    />
    <Route path="*" element={<NotFound/>}/>
  </Routes>
}

export default App;