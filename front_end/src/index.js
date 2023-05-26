import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Edit from './Pages/Edit';
import Show from './Pages/Show';
import Page404 from './Pages/Page404';
import Header from './Components/Header';
import Create from './Pages/Create';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mostrar" element={<Show />} />
        <Route path="/criar" element={<Create />} />
        <Route path="/editar/:id" element={<Edit />} />
        <Route path="*" element={<Page404 />} />
        {/*<Route path="sobre" element={<Sobre />} />
        <Route path="contato" element={<Contato />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
