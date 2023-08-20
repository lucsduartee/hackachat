import { AppBar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" sx={{ height: '50px', display: 'flex'}}>
      <Typography sx={{ margin: "0 auto", verticalAlign: 'center', marginTop: '10px', fontWeight: 'bold' }} variant="h5">
        EstudAI
      </Typography>
    </AppBar>
  );
}
