import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { me } from '../../services/auth-service';


const HomeAluno = () => {
  const navigate = useNavigate();
  const { role, loading: authLoading } = useAuth();
  const [nomeUsuario, setNomeUsuario] = useState('usuário');
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

    if (!authLoading && role === 'ALUNO') {
      fetchNome();
    }
  }, [role, authLoading]);

  if (!authLoading && role !== 'ALUNO') {
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
        Esta é a sua plataforma para a reserva de equipamentos e salas do PPGTI do IFPB. Comece a explorar os recursos disponíveis para você.
      </Typography>
      <Box mt={4}>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate('/reservar-ativos')}
        >
          Fazer uma reserva
        </Button>
      </Box>
    </Box>
  );
};

export default HomeAluno;