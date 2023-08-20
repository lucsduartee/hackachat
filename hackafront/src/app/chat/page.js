'use client'

import { Grid } from "@mui/material";
import Chat from '@/components/Chat';
import Card from "@/components/Card";

export default function ChatPage() {
  return (
    <Grid container>
      <Grid item>
        <Card />
      </Grid>
      <Grid item>
        <Chat />
      </Grid>
    </Grid>
  );
}
