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
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {courseName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {tag}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{url}</Button>
      </CardActions>
    </Card>
  );
}
