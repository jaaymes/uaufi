import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

type ModalEditUserProps = {
  isOpen: boolean;
  editingUser: UserData;
  setIsOpen: () => void;
  handleUpdateUser: (user: UserData) => Promise<void>;
};

type UserData = {
  id: number;
  name: string;
  data_nasc: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
};

export function ModalEditUser({
  isOpen,
  setIsOpen,
  handleUpdateUser,
  editingUser,
}: ModalEditUserProps) {
  const formRef = useRef(null);

  function handleSubmit(data: UserData) {
    handleUpdateUser(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingUser}>
        <h1>Editar User</h1>
        <Input mask="" name='name' maxLength={15} placeholder='Nome' />

        <Input mask="data_nasc" prefix="DD/MM/AAAA" maxLength={10}  name='data_nasc' placeholder='Data Nascimento' />    

        <Input mask="" name='rua' maxLength={30} placeholder='Rua onde mora' />
        <Input mask="" name='numero' maxLength={5} placeholder='número' />

        <Input mask="" name='bairro' maxLength={10}  placeholder='Bairro' />
        <Input mask="" name='cidade' maxLength={10}  placeholder='Cidade' />
        <Input mask="" name='estado' maxLength={10}  placeholder='Estado' />

        <button type='submit' data-testid='edit-food-button'>
          <div className='text'>Editar Usuário</div>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
