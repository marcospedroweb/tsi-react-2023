import React from 'react';
import UserInfo from './UserInfo';

const Card = ({ img, name, email, tel, address, birth, password }) => {
  const [data, setData] = React.useState({
    title: 'Olá, meu nome é',
    text: name,
  });

  const birthAtt = new Date(birth);

  return (
    <div className="d-flex flex-column justify-content-between align-items-center text-center">
      <img src={img} alt={name} className="mb-4" />
      <div className="mb-3">
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setData({ title: 'Olá, meu nome é', text: name });
          }}
        >
          Nome
        </span>{' '}
        |{' '}
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setData({ title: 'Meu email é', text: email });
          }}
        >
          Email
        </span>{' '}
        |{' '}
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setData({
              title: 'Meu Aniversário é',
              text: `${birthAtt.getDay()}/${birthAtt.getMonth()}/${birthAtt.getFullYear()}`,
            });
          }}
        >
          Aniversário
        </span>{' '}
        |{' '}
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setData({
              title: 'Meu endereço é',
              text: address,
            });
          }}
        >
          Endereço
        </span>{' '}
        |{' '}
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setData({ title: 'Meu telefone é', text: tel });
          }}
        >
          Telefone
        </span>{' '}
        |{' '}
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setData({ title: 'Minha senha é', text: password });
          }}
        >
          Senha
        </span>
      </div>
      <UserInfo data={data} />
    </div>
  );
};

export default Card;
