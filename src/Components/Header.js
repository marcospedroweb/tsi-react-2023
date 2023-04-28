import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-secondary">
      <div className="container-xl">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Gerador de users</h1>
          <nav>
            <NavLink to="/" className={'text-dark'}>
              Home
            </NavLink>{' '}
            |{' '}
            <NavLink to="/random" className={'text-dark'}>
              Gerar
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
