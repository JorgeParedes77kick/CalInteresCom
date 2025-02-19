import { createContext, ReactNode, useContext, useState } from 'react';

// Estado global vacío
const EmptyGlobalState = null;

// Interfaces para el contexto example
interface ValuesContextType {
  value: number | null;
}
interface FunctionsContextType {
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
}

type GlobalContextType = ValuesContextType & FunctionsContextType;

// Creación del contexto global
export const GlobalContext = createContext<GlobalContextType>({
  value: 0,
  setValue: () => {},
});

// Props para el proveedor del contexto
interface GlobalContextProviderProps {
  children: ReactNode;
}

// Proveedor del contexto global
export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [value, setValue] = useState<number | null>(EmptyGlobalState);

  return <GlobalContext.Provider value={{ value, setValue }}>{children}</GlobalContext.Provider>;
};

// Hook para usar el contexto global
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Global error context');
  }
  return context;
};
