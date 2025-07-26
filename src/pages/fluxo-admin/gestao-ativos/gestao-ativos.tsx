import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ComputerIcon from "@mui/icons-material/Computer";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AssignmentIcon from "@mui/icons-material/Assignment";

const GestaoAtivos = () => {
  return (
    <Box p={4}>
      <Box display="flex" alignItems="center" mb={4}>
        <AssignmentIcon sx={{ mr: 1 }} />
        <Typography variant="h5">Gestão de Ativos</Typography>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="flex-start"
        mb={4}
      >
        <Box flex="1 1 300px" maxWidth="350px">
          <Card
            variant="outlined"
            sx={{ textAlign: "center", borderRadius: 4 }}
          >
            <CardActionArea component={Link} to="equipamentos">
              <CardContent
                sx={{
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ComputerIcon sx={{ fontSize: 48 }} />
                <Typography variant="subtitle1" mt={2}>
                  Equipamentos
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

        <Box flex="1 1 300px" maxWidth="350px">
          <Card
            variant="outlined"
            sx={{ textAlign: "center", borderRadius: 4 }}
          >
            <CardActionArea component={Link} to="salas">
              <CardContent
                sx={{
                  minHeight: 180,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MeetingRoomIcon sx={{ fontSize: 48 }} />
                <Typography variant="subtitle1" mt={2}>
                  Salas
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default GestaoAtivos;
