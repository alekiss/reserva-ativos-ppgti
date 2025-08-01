import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import Loading from '../../components/loading/loading';

const HomePage = () => {
  const { role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (role === 'ADMIN') {
        navigate('/home-admin');
      } else if (role === 'ALUNO') {
        navigate('/home-aluno');
      } else {
        navigate('/login');
      }
    }
  }, [role, loading, navigate]);

  if (loading) {
    return <Loading />;
  }
  return null;
};

export default HomePage;