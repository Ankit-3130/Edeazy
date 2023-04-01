import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Signin } from './components/Signin';
import { Register } from './components/Register';
import { Home } from './components/Home';
import {Dashboard} from "./components/Dashboard";

function App() {
  return (
    <div className="App">
                <Dashboard/>
    </div>

  );
}

export default App;
  <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navbar />}>
                        <Route path="/signin" element={<Signin />}/>
                        {/* <Route path="/register" element={<Register/>}></Route> */}
                        </Route>
                        <Route exact path="/register"element={
                          <>
                          <Navbar/>
                          <Register/>
                          </>
                          
                        }>
                        </Route>
                    </Routes>
                </BrowserRouter> 
