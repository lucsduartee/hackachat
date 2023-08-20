import { AppBar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static">
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        indica AI
      </Typography>
    </AppBar>
  );
}
