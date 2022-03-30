import { gql, useQuery } from '@apollo/client';
import { CreateNewUser } from './components/CreateNewUser';

export const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

type User = {
  id: string;
  name: string;
};

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) return <h1>Carregando...</h1>;
  return (
    <div>
      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <CreateNewUser />
    </div>
  );
}

export default App;
