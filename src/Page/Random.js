import React from 'react';
import Card from '../Components/Card';

const Random = ({ data }) => {
  if (data)
    return (
      <div className="container-xl">
        <h1 className="text-center mt-3">Usuario Gerado</h1>
        <Card
          img={data.picture.large}
          name={`${data.name.first} ${data.name.last}`}
          email={data.email}
          birth={data.dob.date}
          address={`${data.location.street.number} ${data.location.street.name}`}
          tel={data.cell}
          password={data.login.password}
        />
      </div>
    );
  else <div>Carregando...</div>;
};

export default Random;
