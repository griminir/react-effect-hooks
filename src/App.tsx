import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import userService, { User } from './services/user-service';
import useUsers from './hooks/useUsers';

//make this the data that you need, no reason for extra info

function App() {
  const { users, error, isLoading, setUsers, setError } = useUsers();

  function deleteUser(user: User) {
    const original = [...users];
    setUsers(users.filter((u) => u.id !== user.id));
    userService.delete(user.id).catch((err) => {
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

    userService
      .create(newUser)
      .then(({ data: savedUser }) => {
        setUsers([savedUser, ...users]);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(original);
      });
  };

  const updateUser = (user: User) => {
    const updatedUser: User = { ...user, name: 'updated name' };
    const original = [...users];
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    userService.update(updatedUser).catch((err) => {
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
            <div>
              <button
                className='btn btn-outline-secondary mx-1'
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className='btn btn-outline-danger'
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
