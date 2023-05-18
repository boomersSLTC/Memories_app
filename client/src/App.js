import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/home";
import Auth from "./components/Auth/Auth";

const App = () => (
    <GoogleOAuthProvider clientId="510905509883-t8n94rieqmidg9ntn13u3d0vtf976a3k.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/auth' element={<Auth/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    </GoogleOAuthProvider>
); 

export default App;