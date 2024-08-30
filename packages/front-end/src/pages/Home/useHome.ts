import { useNavigate } from 'react-router-dom';

export const useHome = () => {
  const navigate = useNavigate();
  const redirectToAlerts = () => {
    navigate('/alertas');
  };

  const redirectToSensors = () => {
    navigate('/sensores');
  };

  const redirecToAqi = () => {
    navigate('/calidad-aire');
  };

  return {
    redirectToAlerts,
    redirectToSensors,
    redirecToAqi,
  };
};
