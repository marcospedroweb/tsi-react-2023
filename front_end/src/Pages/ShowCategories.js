import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

const ShowCategories = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState('');
  const [success, setSuccess] = React.useState('');
  async function getData() {
    const response = await fetch('http://localhost:3002/categories', {
      method: 'GET',
    });
    const json = await response.json();
    setData(json.categories);
  }
  React.useEffect(() => {
    getData();
  }, []);

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:3002/categories/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    if (!json.categories) {
      setSuccess('Dado apagado com sucesso!');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      getData();
    }
  }

  if (!data) return <Loading />;
  else
    return (
      <section className="container-xl mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Mostrando Categorias</h2>
          <Link to="/criar-categoria" className="btn btn-success">
            <button className="btn btn-success">Cadastrar</button>
          </Link>
        </div>
        {success && (
          <div className="alert alert-success mt-3" role="alert">
            <span>{success}</span>
          </div>
        )}
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Nome</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(({ _id, name }) => {
                  return (
                    <tr key={_id}>
                      <th scope="row">{_id}</th>
                      <td>{name}</td>
                      <td>
                        <button
                          className="btn btn-primary me-3"
                          onClick={() => {
                            navigate(`/editar-categoria/${_id}`);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(_id);
                          }}
                        >
                          Apagar
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    );
};

export default ShowCategories;
