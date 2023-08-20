import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';


export default function CourseCard(course) {
  const { course: courseName, tag, url, price } = course;
  
  return (
    <Card sx={{ maxWidth: 300, minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {courseName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {tag}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          R$ {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={url} target='_blank'>SAIBA MAIS</Button>
      </CardActions>
    </Card>
  );
}
