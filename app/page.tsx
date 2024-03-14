"use client";
import { gql, useQuery, useMutation } from "@apollo/client";

const hello = gql`
  query {
    hello
  }
`;

const getAllUsers = gql`
  query {
    getAllUsers {
      id
      name
      score
    }
  }
`;

const createUser = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      score
    }
  }
`;

const deleteUser = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const updateUser = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      score
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(hello);
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useQuery(getAllUsers);
  const [
    createUserMutation,
    { loading: createUserLoading, error: createUserError },
  ] = useMutation(createUser, { refetchQueries: [{ query: getAllUsers }] });

  const [
    deleteUserMutation,
    { loading: deleteUserLoading, error: deleteUserError },
  ] = useMutation(deleteUser, { refetchQueries: [{ query: getAllUsers }] });

  const [
    updateUserMutation,
    { loading: updateUserLoading, error: updateUserError },
  ] = useMutation(updateUser, { refetchQueries: [{ query: getAllUsers }] });

  const onCreateUser = (input: any) => {
    createUserMutation({ variables: { input } });
  };

  const onUpdateUser = (id: number, input: any) => {
    updateUserMutation({ variables: { id, input } });
  };

  const onDeleteUser = (id: number) => {
    deleteUserMutation({ variables: { id } });
  };

  const onAddToScore = (id: number, user: any) => {
    onUpdateUser(id, { name: user.name, score: user.score + 1 });
  };

  const onDelete = (id: number) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur avec l'id ${id} ?`
      )
    ) {
      onDeleteUser(id);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const newUser = {
      name: event.target.name.value,
      score: parseInt(event.target.score.value),
    };
    onCreateUser(newUser);
    event.target.reset();
  };

  if (loading || usersLoading) return <p>Chargement...</p>;

  if (error || usersError)
    return <p>Erreur : {error?.message || usersError?.message}</p>;
  return (
    <main>
      <h1>{data.hello}</h1>
      <form onSubmit={onSubmit}>
        <h3>Ajouter un utilisateur</h3>
        <label htmlFor="name">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Nom de l'utilisateur"
        />

        <label htmlFor="score">Score :</label>
        <input type="number" id="score" name="score" defaultValue={0} />

        <button type="submit">Enregistrer</button>
      </form>

      {users?.getAllUsers.map((user: User) => (
        <div
          key={user.id}
          style={{ display: "inline-list-item", margin: "10px" }}
        >
          <div
            style={{
              border: "1px solid black",
              padding: "10px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p> {user.id} -</p>
            <h3> {user.name}</h3>
            <p> : {user.score}</p>
            <button onClick={() => onAddToScore(user.id!, user)}>+1</button>
            <button onClick={() => onDelete(user.id!)}>Supprimer</button>
          </div>
        </div>
      ))}
    </main>
  );
}
