import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './components/Login/Login';
import Header from './components/Header/Header';
import BeerList from './pages/BeerList/BeerList';
import Favorites from './pages/Favorites/Favorites';
import RandomBeer from './pages/RandomBeer/RandomBeer';
import Logout from './pages/Logout/Logout';
import Footer from './components/Footer/Footer';

import { store } from './store/store'

import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const account = localStorage.getItem('defaultAccount');
    setIsLoggedIn(!!account);
  }, []);

  return (
    <>
      <Provider store={store}>
        {!isLoggedIn ? (
          <Login onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<BeerList />} />
              <Route path="/favorite" element={<Favorites />} />
              <Route path="/random-beer" element={<RandomBeer />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
            <Footer />
          </>
        )}
      </Provider>
    </>
  );
}

export default App;
