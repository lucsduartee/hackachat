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
import validator from 'email-validator';


const sxGPT = { backgroundColor: '#b5bdd4' };
const sxUser = { backgroundColor: '#eceef4' };

export default function Chat() {
  const [message, setMessage] = useState('');
  const [validUser, setValidUser] = useState(false);
  const [messages, setMessages] = useState(
    [
      { author: 'gpt', content: 'Olá, tudo bem? É um prazer poder te ajudar na sua jornada! Antes de começarmos o atendimento, poderia nos dizer o seu email' },
    ]
  );

  const isGPTMessage = (author) => author === 'gpt';

  const isValidEmail = (email) => {
    if (!validator.validate(email)) return false
  
    setValidUser(true);
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validUser) {
      if (!isValidEmail(message)) {
        setMessages([...messages, { author: 'gpt', content: 'Email inválido, por favor digite novamente' }]);
        return;
      }
    }

    const response = await fetch('http://localhost:8000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
      }),
    });

    const { data } = await response.json();

    if (data.courses) {
      setCourses(data.courses);
    }

    setMessages([...messages, { author: 'gpt', content: data.answer }]);
  };

  const handleClick = () => {
    setMessages([...messages, { author: 'user', content: message }]);
  };

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
        <form onSubmit={submit}>
          <Grid
            container
            justifyContent="space-between"
          >
            <Grid item sx={{ width: "80%"}}>
              <TextField
                label="Como posso ajudar-lhe"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                fullWidth
              />
            </Grid>
            <Grid
              align="center"
              alignSelf="center"
              onClick={handleClick}
              >
              <Fab color="primary" aria-label="add" type="submit"><SendIcon /></Fab>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}