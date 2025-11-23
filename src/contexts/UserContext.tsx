import { createContext, useContext, useState,type ReactNode } from 'react';

export interface User {
  name: string;
  email: string;
  phone: string;
  type_document?: string;
  document_name?: string;
  cpf?: string;
  birthdate?: string;
  mother_name?: string;
  register_number?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
}
