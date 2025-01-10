import React from 'react'
import Header from './components/Header'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import ComicDetails from './components/ComicDetails';
import MarvelApp from './components/MarvelApp';



const App = () => {
  return (
    <Router>
    <div className='bg-red-500 h-full'> 
      <Header/>
      
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/comic/:id" element={<ComicDetails/>} />
      </Routes>        
    </div>
    
    </Router>
  )
}

export default App
