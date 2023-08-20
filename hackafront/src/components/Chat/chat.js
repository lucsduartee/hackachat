import { useState, useContext, useEffect } from 'react';
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


const sxGPT = { backgroundColor: '#f2eae6' };
// const sxUser = { backgroundColor: '#eceef4' };

export default function Chat() {
  const [message, setMessage] = useState('');
  const [validMessage, setValidMessage] = useState(true);
  const [messages, setMessages] = useState(
    [
      { author: 'gpt', content: 'Olá, tudo bem? Estou aqui para te ajudar a encontrar o curso perfeito. Me conta: você tem interesse em alguma área específica? Exemplo: humanas, exatas, biológicas, tecnologia...' },
    ]
  );
  const { setCourses } = useContext(globalContext);
  const [items, setItems] = useState([]);

  const isGPTMessage = (author) => author === 'gpt';

  const isValidMessage = (message) => {
    if (message.length === 0) {
      setValidMessage(false);
      return false;
    }

    setValidMessage(true);
    return true;
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const submit = async (e) => {
    e.preventDefault();
    
    if (!isValidMessage(message)) return;

    setMessage('');

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
        borderRadius: '10px',
        border: '1px solid #006494',
      }}
    >
      <Grid
        item
        sx={{
          overflow: 'auto',
          borderRadius: '10px',
        }}
        maxHeight={{ xs: '70%', md: '75%' }}
      >
        <List sx={{ padding: 0 }}>
          {messages.map(({ author, content }, index) => (
            <ListItem key={index} sx={isGPTMessage(author) && sxGPT}>
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
                label="Exemplo: Gostaria de estudar na área de exatas..."
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