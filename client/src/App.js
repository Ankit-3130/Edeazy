import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signin } from './components/Signin';
import { Register } from './components/Register';
import { Home } from './components/Home';
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<>
          <Navbar />
          <Home />
          </>}>
          <Route exact path="/home" element={<>
            <Navbar />
            <Home />
          </>} />
        </Route>
        <Route exact path="/signin" element={
          <>
            <Navbar />
            <Signin />
          </>} />
        <Route exact path="/register" element={
          <>
            <Navbar />
            <Register />
          </> }>
        </Route>
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>

    </>

  );
}

export default App;


