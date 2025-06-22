import { Backdrop, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Backdrop
      open={true}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CircularProgress color="inherit" />
      <Typography
        variant="h6"
        sx={{ marginTop: 3, color: "white" }}
      >
        Carregando...
      </Typography>
    </Backdrop>
  );
};

export default Loading;