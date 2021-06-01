import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { User } from '../../components/User';
import { ModalAddUser } from '../../components/ModalAddUser';
import { ModalEditUser } from '../../components/ModalEditUser';
import { UsersContainer } from './styles';

interface UserData {
  id: number;
  name: string;
  data_nasc: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
};




export function Dashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [editingUser, setEditingUser] = useState<UserData>({} as UserData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    api.get('/users').then(response => setUsers(response.data));
  }, []);

  async function handleAddUser(user: UserData) {
    try {
      const response = await api.post('/users', {
        ...user,
      });

      setUsers([...users, response.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateUser(user: UserData) {
    try {
      const userUpdated = await api.put(`/users/${editingUser.id}`, {
        ...editingUser,
        ...user,
      });

      const usersUpdated = users.map(f =>
        f.id !== userUpdated.data.id ? f : userUpdated.data,
      );

      setUsers(usersUpdated);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteUser(id: number) {
    await api.delete(`/users/${id}`);

    const usersFiltered = users.filter(user => user.id !== id);

    setUsers(usersFiltered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditUser(user: UserData) {
    setEditingUser(user);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddUser
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddUser={handleAddUser}
      />
      <ModalEditUser
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingUser={editingUser}
        handleUpdateUser={handleUpdateUser}
      />

      <UsersContainer data-testid='users-list'>
        {users &&
          users.map(user => (
            <User
              key={user.id}
              user={user}
              handleDelete={handleDeleteUser}
              handleEditUser={handleEditUser}
            />
          ))}
      </UsersContainer>
    </>
  );
}
