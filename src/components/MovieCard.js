import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Container from '@mui/material/Container';

export default function MovieCard({ id, image, title, price, description }) {
  return (
    <Card sx={{ maxWidth: 170 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {/* Lizard */}
            {title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary"> */}
            {/* Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica */}
            {/* {description} */}
          {/* </Typography> */}
          <Typography gutterBottom variant="body2" component="div">
            {/* Lizard */}
            Ticket Price: Rp{price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="outlined" size="small" href={`book/${id}`}>
          Book
        </Button>
      </CardActions>
    </Card>
  );
}