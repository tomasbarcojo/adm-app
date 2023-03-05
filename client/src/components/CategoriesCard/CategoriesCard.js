import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    margin: '10px',
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ props }) {
  const classes = useStyles();

  return (
    <Link to={`category/${props.id}`}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            // image={`http://localhost:3001/images/${props.image}`} // uncomment if images are from server
            image={`${props.image}`} // uncomment if images aren't from server
            title="Product image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.categoryName}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
      </Card>
    </Link>
  );
}
