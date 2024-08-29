import { useState } from 'react';
import { AlertContext, AlertPage } from '../../types/alerts/providers';

interface AlertProviderProps {
  children: React.ReactNode;
}
export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertPage, setAlert] = useState<AlertPage | null>({
    drawerMode: {
      showDrawer: false,
    },
    alert: undefined,
  });

  return (
    <AlertContext.Provider value={{ alertPage, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
