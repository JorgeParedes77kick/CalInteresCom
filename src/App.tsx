import { Modal } from 'components/Modal/Modal';
import { useModalContext } from 'contexts/ModalContext';
import { useApi } from 'hooks/useApi';
import { getCharacter } from 'services/api.service';
import './app.scss';

function App() {
  const { setIsOpen } = useModalContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { loading, error, data, fetch } = useApi<any, number>(getCharacter, {
    autoFetch: true,
    params: 1,
  });
  if (loading) {
    return <p>Cargando</p>;
  }

  if (error) {
    return <p>Ups {error.message}</p>;
  }

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <button onClick={() => fetch(2)}> OTRO BUTTON</button>

      <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
      <Modal>
        <h2>HOLA MUNDO MODAL</h2>
        <h3>OTRO MENSAJE</h3>
      </Modal>
    </>
  );
}

export default App;
