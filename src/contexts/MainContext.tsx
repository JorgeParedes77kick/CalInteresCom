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

type MainContextType = ValuesContextType & FunctionsContextType;

// Creación del contexto global
export const MainContext = createContext<MainContextType>({
  value: 0,
  setValue: () => {},
});

// Props para el proveedor del contexto
interface MainContextProviderProps {
  children: ReactNode;
}

// Proveedor del contexto global
export const MainContextProvider = ({ children }: MainContextProviderProps) => {
  const [value, setValue] = useState<number | null>(EmptyGlobalState);

  return <MainContext.Provider value={{ value, setValue }}>{children}</MainContext.Provider>;
};

// Hook para usar el contexto global
export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('Global error context');
  }
  return context;
};
