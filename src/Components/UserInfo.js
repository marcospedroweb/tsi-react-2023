import React from 'react';

const UserInfo = ({ data }) => {
  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.text}</p>
    </div>
  );
};

export default UserInfo;
