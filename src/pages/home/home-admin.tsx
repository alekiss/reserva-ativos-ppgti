import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { me } from '../../services/auth-service';

const HomeAdmin = () => {
  const navigate = useNavigate();
  const { role, loading: authLoading } = useAuth();
  const [nomeUsuario, setNomeUsuario] = useState('Administrador');
  const [loadingNome, setLoadingNome] = useState(true);

  useEffect(() => {
    const fetchNome = async () => {
      setLoadingNome(true);
      try {
        const response = await me();
        setNomeUsuario(response.data.nome);
      } catch (err) {
        console.error("Erro ao buscar nome do usuário:", err);
      } finally {
        setLoadingNome(false);
      }
    };

    if (!authLoading && role === 'ADMIN') {
      fetchNome();
    }
  }, [role, authLoading]);

  if (!authLoading && role !== 'ADMIN') {
    return <Typography variant="h5" color="error">Acesso não autorizado.</Typography>;
  }

  if (authLoading || loadingNome) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      height="80vh"
      textAlign="center"
      p={4}
    >
      <Typography variant="h3" gutterBottom>
        Bem-vindo(a), {nomeUsuario}!
      </Typography>
      <Typography variant="h6" color="text.secondary" maxWidth="600px">
        Bem-vindo ao painel de administração de ativos do PPGTI do IFPB. Aqui você pode gerenciar os equipamentos, salas e reservas do sistema.
      </Typography>
      <Box mt={4}>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate('/gestao-ativos')}
        >
          Gerenciar Ativos
        </Button>
      </Box>
    </Box>
  );
};

export default HomeAdmin;