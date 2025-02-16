import { createContext, ReactNode, useContext, useState } from 'react';

// Estado global vacío
const EmptyGlobalState = null;

// Interfaces para el contexto example
interface ValuesContextType {
  isOpen: boolean | null;
}
interface FunctionsContextType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

type ModalContextType = ValuesContextType & FunctionsContextType;

// Creación del contexto global
export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  setIsOpen: () => null,
});

// Props para el proveedor del contexto
interface ModalContextProviderProps {
  children: ReactNode;
}

// Proveedor del contexto global
export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callOpen: any = (e: boolean) => {
    console.log('e:', e);
    setIsOpen(e);
  };

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen: callOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

// Hook para usar el contexto global
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalContextProvider');
  }
  return context;
};
