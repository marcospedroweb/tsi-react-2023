import React from 'react';
import Loading from '../Components/Loading';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    navigate('/mostrar');
  }
  const [data, setData] = React.useState('');
  const [error, setError] = React.useState('');
  const [categories, setCategories] = React.useState('');
  const nameRef = React.useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    const name = nameRef.current.value;

    const response = await fetch(`http://localhost:3002/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });
    const json = await response.json();
    if (json.tasks.modifiedCount) navigate('/mostrar');
    else setError('Houve um erro');
  }

  React.useEffect(() => {
    async function getData() {
      const response = await fetch(`http://localhost:3002/tasks/${id}`, {
        method: 'GET',
      });
      const json = await response.json();
      setData(json.tasks);
    }

    getData();
  }, []);

  React.useEffect(() => {
    if (nameRef.current) nameRef.current.value = data.name;
  }, [data.name]);

  if (!categories && !data) return <Loading />;
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

export default Edit;