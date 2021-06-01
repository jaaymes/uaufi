import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';


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

type ModalAddUserProps = {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddUser: (data: UserData) => Promise<void>;
};

export function ModalAddUser({
  isOpen,
  setIsOpen,
  handleAddUser,
}: ModalAddUserProps) {
  const formRef = useRef(null);

  async function handleSubmit(data: UserData) {
    handleAddUser(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Cadastro</h1>
        <Input mask="" name='name' maxLength={20} placeholder='Nome' />

        <Input mask="data_nasc" prefix="DD/MM/AAAA" maxLength={10}  name='data_nasc' placeholder='Data Nascimento' />    

        <Input mask="" name='rua' maxLength={30} placeholder='Rua onde mora' />
        <Input mask="" name='numero' maxLength={5} placeholder='número' />

        <Input mask="" name='bairro' maxLength={10}  placeholder='Bairro' />
        <Input mask="" name='cidade' maxLength={10}  placeholder='Cidade' />
        <Input mask="" name='estado' maxLength={10}  placeholder='Estado' />
        <button type='submit' data-testid='add-food-button'>
          <p className='text'>Adicionar User</p>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
