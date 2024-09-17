import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { AxiosError, CanceledError } from 'axios';
import { useEffect, useState } from 'react';

//make this the data that you need, no reason for extra info
interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    // const fetchUsers = async () => {
    // try {
    // const res = await
    setLoading(true);
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users', {
        signal: controller.signal,
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false); // duplication to make it work in strict mode
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false); // duplication to make it work in strict mode
      });
    // .finally(() => setLoading(false)); // how its suppose to be done (does not work in strict mode)
    //   setUsers(res.data);
    // } catch (error) {
    //   setError((error as AxiosError).message);
    // }
    // fetchUsers();
    // };
    return () => controller.abort();
  }, []);

  function deleteUser(user: User) {
    const original = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    axios
      .delete('https://jsonplaceholder.typicode.com/users/' + user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(original);
      });
  }

  const addUser = () => {
    const original = [...users];
    const newUser: User = {
      id: 0,
      name: 'timmy',
    };
    setUsers([newUser, ...users]);
    axios
      .post<User>('https://jsonplaceholder.typicode.com/users', newUser)
      .then(({ data: savedUser }) => {
        setUsers([savedUser, ...users]);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(original);
      });
  };

  return (
    <>
      {error && <p className='text-danger'>{error}</p>}
      {isLoading && <div className='spinner-border'></div>}
      <button className='btn btn-primary mb3' onClick={addUser}>
        Add
      </button>
      <ul className='list-group'>
        {users.map((user) => (
          <li
            key={user.id}
            className='list-group-item d-flex justify-content-between'
          >
            {user.id}: {user.name}
            <button
              className='btn btn-outline-danger'
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
