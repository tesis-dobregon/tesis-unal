import { useNavigate } from 'react-router-dom';

export const useHome = () => {
  const navigate = useNavigate();
  const redirectToAlerts = () => {
    navigate('/alertas');
  };

  const redirectToSensors = () => {
    navigate('/sensores');
  };

  return {
    redirectToAlerts,
    redirectToSensors,
  };
};
