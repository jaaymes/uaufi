import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

type UsersData = {
  id: number;
  name: string;
  data_nasc: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
}

type UsersProps = {
  user: UsersData;
  handleDelete: (id: number) => Promise<void>;
  handleEditUser: (user: UsersData) => void;
}

export function User({ user, handleDelete, handleEditUser}: UsersProps){
 
  function setEditingUser(){
    handleEditUser(user)
  }

  return(
    <Container>
        <section className="body">
          <h2>{user.name}</h2>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={setEditingUser}
              data-testid={`edit-user-${user.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(user.id)}
              data-testid={`remove-user-${user.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>
        </section>
      </Container>
  )



}
