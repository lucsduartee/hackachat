import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';


export default function CourseCard(_course) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {"Course Name"}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {"Course Tag"}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          {"Course Price"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{"Course URL"}</Button>
      </CardActions>
    </Card>
  );
}
