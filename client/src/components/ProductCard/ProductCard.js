import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Image from '../../images/sayri.png'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    margin: '10px'
  },
  title: {
    height: '60px'
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

export default function RecipeReviewCard({ props }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const string = 'SMOKING REGULAR (Diam 8mm / Long 15mm)'

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.image}
        title={props.articleName}
      />
      <CardContent>
        <Typography className={classes.title} gutterBottom variant="h6">
          {props.articleName.length > 32 ? props.articleName.substring(0, 32) + '...' : props.articleName}
        </Typography>
        <Typography variant="h5" color="textSecondary" component="p">
          {props.price.toLocaleString('en-US', {style: 'currency',currency: 'USD'})}
        </Typography>
      </CardContent>
    </Card>
  );
}