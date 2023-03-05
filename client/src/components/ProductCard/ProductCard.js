import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from '../../images/sayri.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    margin: '10px',
  },
  title: {
    height: '60px',
  },
  media: {
    height: 0,
    paddingTop: '200px', // 16:9
    objectFit: 'contain',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProductCard({ props }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const string = 'SMOKING REGULAR (Diam 8mm / Long 15mm)';

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={props.image} title={props.name} />
      <CardContent>
        <Typography className={classes.title} gutterBottom variant="h6">
          {props.name.length > 32 ? props.name.substring(0, 32) + '...' : props.name}
        </Typography>
        <Typography variant="h5" color="textSecondary" component="p">
          {props.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Typography>
      </CardContent>
    </Card>
  );
}
