import { useModalContext } from 'contexts/ModalContext';
import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

interface ModalProps {
  children: ReactNode;
}
const eventKey = 'keydown';

export const Modal = ({ children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useModalContext();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        throw new Error('Error de prueba para ErrorBoundary');
      }
    };
    if (isOpen) {
      document.addEventListener(eventKey, handleEsc);
    }
    return () => {
      document.removeEventListener(eventKey, handleEsc);
    };
  }, [isOpen, setIsOpen]);

  const modalRoot = document.getElementById('modalRoot');
  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div className="overlay" onClick={closeModal}>
      <div className="modal" onClick={handleContentClick} ref={modalRef}>
        {children}
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>,
    modalRoot,
  );
};
