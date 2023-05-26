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
  const selectRef = React.useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const category_id = selectRef.current.value;

    const response = await fetch(`http://localhost:3002/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        category_id,
      }),
    });
    const json = await response.json();
    if (json.product.modifiedCount) navigate('/mostrar');
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
    async function getData() {
      const response = await fetch(`http://localhost:3002/products/${id}`, {
        method: 'GET',
      });
      const json = await response.json();
      setData(json.products);
      nameRef.current.value = json.products.name;
      selectRef.current.value = json.products.category_id;
    }
    getCategories();
    getData();
  }, []);

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
              <div className="form-floating">
                <select
                  className="form-select"
                  id="categories"
                  aria-label="Floating label select example"
                  required
                  ref={selectRef}
                >
                  <option>Escolha uma opção</option>
                  {categories &&
                    categories.map(({ _id, name }) => {
                      return (
                        <option
                          value={_id}
                          key={_id}
                          selected={_id === data.category_id}
                        >
                          {name}
                        </option>
                      );
                    })}
                </select>
                <label htmlFor="categories">Escolha uma categoria</label>
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
