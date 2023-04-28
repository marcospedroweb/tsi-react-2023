import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Page/Home';
import NotFound from './Page/NotFound';
import Random from './Page/Random';

function App() {
  const [data, setData] = React.useState('');

  function getData() {
    fetch('https://randomuser.me/api')
      .then((r) => r.json())
      .then((json) => {
        setData(json.results[0]);
      });
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/random" element={<Random data={data} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
