import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
//import BeerList from './pages/BeerList/BeerList';
import Favorites from './pages/Favorites/Favorites';
import RandomBeer from './pages/RandomBeer/RandomBeer';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {


  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<BeerList />} /> */}
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/random-beer" element={<RandomBeer />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
