import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

//make this the data that you need, no reason for extra info
interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(
          'https://jsonplaceholder.typicode.com/users'
        );
        setUsers(res.data);
      } catch (error) {
        setError((error as AxiosError).message);
      }
      fetchUsers();

      // .then((res) => setUsers(res.data))
      // .catch((err) => setError(err.message));
    };
  });

  return (
    <>
      {error && <p className='text-danger'>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}: {user.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
