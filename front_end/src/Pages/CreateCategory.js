import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  const [categories, setCategories] = React.useState('');
  const nameRef = React.useRef();
  async function handleSubmit(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const response = await fetch('http://localhost:3002/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.categories.insertedId) navigate('/mostrar-categorias');
    else setError('Houve um erro');
  }

  React.useEffect(() => {
    async function getCategories() {
      const response = await fetch('http://localhost:3002/categories', {
        method: 'GET',
      });
      const json = await response.json();
      setCategories(json.categories);
    }
    getCategories();
  }, []);

  if (!categories) return <Loading />;
  else
    return (
      <section className="container-xl">
        <h2 className="text-center mt-4 mb-4">Criando</h2>

        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-lg-5">
            {error && (
              <div className="alert alert-danger" role="alert">
                <span className="fw-bold">{error}</span>
              </div>
            )}
            <form action="#" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="name@example.com"
                  required
                  ref={nameRef}
                />
                <label htmlFor="namme">Nome</label>
              </div>
              <div className="text-center">
                <button type="submit" className="mt-3 btn btn-primary">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
};

export default CreateCategory;
