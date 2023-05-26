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
import CreateCategory from './Pages/CreateCategory';
import ShowCategories from './Pages/ShowCategories';
import EditCategory from './Pages/EditCategory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mostrar" element={<Show />} />
        <Route path="/mostrar-categorias" element={<ShowCategories />} />
        <Route path="/criar" element={<Create />} />
        <Route path="/criar-categoria" element={<CreateCategory />} />
        <Route path="/editar/:id" element={<Edit />} />
        <Route path="/editar-categoria/:id" element={<EditCategory />} />
        <Route path="*" element={<Page404 />} />
        {/*<Route path="sobre" element={<Sobre />} />
        <Route path="contato" element={<Contato />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
