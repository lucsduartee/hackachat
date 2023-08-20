'use client'

import { useContext } from 'react';
import { Grid, CssBaseline, Container } from "@mui/material";
import { globalContext } from '@/providers/GlobalProvider';
import Chat from '@/components/Chat';
import Card from "@/components/Card";
import Header from "@/components/Header";

export default function ChatPage() {
  const { courses } = useContext(globalContext);
  
  const cardContainer = (
    <Grid container>
      {
        courses.map((course, index) =>
          <Grid key={index} item>
            <Card {...course} />
          </Grid>
        )
      }
    </Grid>
  );
  
  return (
    <Container width="lg">
      <CssBaseline />
      <Header/>
      <Grid container>
        <Grid item>
          {cardContainer}
        </Grid>
        <Grid item>
          <Chat />
        </Grid>
      </Grid>
    </Container>

  );
}
