import { useState } from 'react';
import {
  List,
  ListItem,
  Grid,
  ListItemText,
  Divider,
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
    <Grid item>
      <List>
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
      <Divider />
      <Grid item>
        <form>
          <Grid container>
            <Grid item>
              <TextField label="Como posso ajudar-lhe" fullWidth />
            </Grid>
            <Grid item>
              <Fab color="primary" aria-label="add"><SendIcon /></Fab>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}