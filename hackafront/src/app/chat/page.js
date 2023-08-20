'use client'

import { useContext } from 'react';
import { Grid } from "@mui/material";
import { globalContext } from '@/providers/GlobalProvider';
import Chat from '@/components/Chat';
import Card from "@/components/Card";

export default function ChatPage() {
  const { courses } = useContext(globalContext);
  
  const cardContainer = (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
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
      <Grid
        container
        columns={{ xs: 12, sm: 6, md: 12 }}
        sx={{
          height: '95vh',
          padding: '20px'
        }}  
        spacing={2}
        justifyContent="space-evenly"
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            overflow: 'auto',
            padding: '20px'
          }}
  
          maxHeight={{ xs: '50%', sm: '50%', md: '100%' }}
        >
          {cardContainer}
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          maxHeight={{ xs: '50%', sm: '50%', md: '100%' }}
        >
          <Chat />
        </Grid>
      </Grid>
  );
}
