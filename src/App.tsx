import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header/Header';
import BeerList from './pages/BeerList/BeerList';
import Favorites from './pages/Favorites/Favorites';
import RandomBeer from './pages/RandomBeer/RandomBeer';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import { store } from './store/store'

import './App.css';


function App() {


  return (
    <>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<BeerList />} />
          < Route path="/favorite" element={<Favorites />} />
          <Route path="/random-beer" element={<RandomBeer />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Provider>
    </>
  )
}

export default App
