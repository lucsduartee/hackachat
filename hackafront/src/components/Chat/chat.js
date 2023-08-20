import { useState, useContext } from 'react';
import {
  List,
  ListItem,
  Grid,
  ListItemText,
  TextField,
  Fab,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { globalContext } from '@/providers/GlobalProvider';
import validator from 'email-validator';


const sxGPT = { backgroundColor: '#b5bdd4' };
const sxUser = { backgroundColor: '#eceef4' };

export default function Chat() {
  const [message, setMessage] = useState('');
  const [validMessage, setValidMessage] = useState(true);
  const [validUser, setValidUser] = useState(false);
  const [messages, setMessages] = useState(
    [
      { author: 'gpt', content: 'Olá, tudo bem? É um prazer poder te ajudar na sua jornada! Antes de começarmos o atendimento, poderia nos dizer o seu email' },
    ]
  );
  const { setCourses } = useContext(globalContext);

  const isGPTMessage = (author) => author === 'gpt';

  const isValidEmail = (email) => {
    if (!validator.validate(email)) return false
  
    setValidUser(true);
    return true;
  };

  const isValidMessage = (message) => {
    if (message.length === 0) {
      setValidMessage(false);
      return false;
    }

    setValidMessage(true);
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!isValidMessage(message)) return;

    setMessage('');


    if (!validUser) {
      if (!isValidEmail(message)) {
        setMessages([...messages, { author: 'gpt', content: 'Email inválido, por favor digite novamente' }]);
      } else {
        setMessages([...messages, { author: 'gpt', content: 'Fico feliz em saber que você está interessado em fazer uma faculdade. Posso te ajudar a encontrar o curso ideal para você. Diga-me, qual é a área de conhecimento que mais desperta o seu interesse? Exatas, humanas, biológicas ou tecnológicas?' }]);
      }

      return;
    }

    const response = await fetch('http://localhost:8000/questions/', {
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
    if (!isValidMessage(message)) return;

    setMessages([...messages, { author: 'user', content: message }]);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={{
        height: '100%',
        borderRadius: '30px',
      }}
    >
      <Grid
        item
        sx={{
          overflow: 'auto',
          backgroundColor: '#e8f1f2',
          borderRadius: '10px',
        }}
        maxHeight={{ xs: '70%', md: '75%' }}
      >
        <List sx={{ padding: 0 }}>
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
            maxHeight={{ xs: '30%', md: '25%' }}
            sx={{ padding: '10px' }}
          >
            <Grid item sx={{ width: "80%"}}>
              <TextField
                label="Como posso ajudar-lhe"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                fullWidth
                color={validMessage ? 'primary' : 'error'}
                sx={{ backgroundColor: '#fff'}}
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