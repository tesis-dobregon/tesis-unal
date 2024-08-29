import { AlertProvider } from '../../providers/alerts';
import Alerts from './Alerts';

export const AlertsPage: React.FC = () => {
  return (
    <AlertProvider>
      <Alerts />
    </AlertProvider>
  );
};
