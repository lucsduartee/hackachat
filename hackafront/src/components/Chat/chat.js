import { useState } from 'react';
import {
  List,
  ListItem,
  Grid,
  ListItemText,
  TextField,
  Fab,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


const sxGPT = { backgroundColor: '#b5bdd4' };
const sxUser = { backgroundColor: '#eceef4' };

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(
    [
      { author: 'gpt', content: 'Olá, tudo bem?' },
      { author: 'user', content: 'Tudo bem sim e vc?' },
    ]
  );

  const isGPTMessage = (author) => author === 'gpt';

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={{
        height: '100%',
      }}
    >
      <Grid
        item
        sx={{
          overflow: 'auto',
        }}
        maxHeight={{ xs: '80%', md: '85%' }}
      >
        <List sx={{ padding: 0}}>
          {messages.map(({ author, content }, index) => (
            <ListItem key={index} sx={isGPTMessage(author) ? sxGPT : sxUser}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align={isGPTMessage(author) ? 'left' : 'right'} primary={content} />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align={isGPTMessage(author) ? 'left' : 'right'} secondary={author} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item>
        <form>
          <Grid
            container
            justifyContent="space-between"
          >
            <Grid item sx={{ width: "80%"}}>
              <TextField label="Como posso ajudar-lhe" fullWidth />
            </Grid>
            <Grid xs={2} align="center" alignSelf="center">
              <Fab color="primary" aria-label="add"><SendIcon /></Fab>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}