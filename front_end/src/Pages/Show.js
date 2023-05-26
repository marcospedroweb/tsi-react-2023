import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Components/Loading';

const Show = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState('');
  const [success, setSuccess] = React.useState('');
  async function getData() {
    const response = await fetch('http://localhost:3002/tasks', {
      method: 'GET',
    });
    const json = await response.json();
    setData(json.tasks);
  }
  React.useEffect(() => {
    getData();
  }, []);

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:3002/tasks/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    if (!json.tasks) {
      setSuccess('Dado apagado com sucesso!');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      getData();
    }
  }

  async function handleComplete(id, name) {
    const response = await fetch(`http://localhost:3002/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        concluded: true,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.tasks.modifiedCount) {
      setSuccess('Voce completou a tarefa com sucesso!');
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
          <h2>Mostrando tarefas</h2>
          <Link to="/criar" className="btn btn-primary">
            <button className="btn btn-primary">Criar tarefa</button>
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
                <th scope="col">Tarefa</th>
                <th scope="col">Status</th>
                <th scope="col">Ação</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(({ _id, name, concluded }) => {
                  return (
                    <tr key={_id}>
                      <th scope="row">{_id}</th>
                      <td>{name}</td>
                      <td className="fw-bold">
                        {concluded ? 'Completo' : 'Não completa'}
                      </td>
                      <td>
                        {!concluded && (
                          <button
                            className="btn btn-success me-3"
                            onClick={() => {
                              handleComplete(_id, name);
                            }}
                          >
                            Concluir
                          </button>
                        )}

                        <button
                          className="btn btn-secondary me-3"
                          onClick={() => {
                            navigate(`/editar/${_id}`);
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

export default Show;
