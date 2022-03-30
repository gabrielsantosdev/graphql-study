import { gql, useMutation } from '@apollo/client';
import React, { FormEvent, useState } from 'react';
import { GET_USERS } from '../App';
import { client } from '../lib/apollo';

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export function CreateNewUser() {
  const [name, setName] = useState('');
  const [createUser] = useMutation(CREATE_USER);

  async function handleNewUser(e: FormEvent) {
    e.preventDefault();
    if (!name) return;

    createUser({
      variables: {
        name,
      },
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: {
            users: [...users, createUser],
          },
        });
      },
    });
  }

  return (
    <form onSubmit={handleNewUser}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
