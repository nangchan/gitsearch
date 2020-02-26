import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    minHeight: 220,
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

/**
 * Formatted Material-UI Card to display issue information
 * 
 * @param {number} number [optional] - Issue number
 * @param {string} title  [optional] - Issue title
 * @param {string} state  [optional] - Issue state (eg. open or closed)
 * @param {array} labels  [optional] - Issue Labels (eg. "Component: Developer Tools, Type: Needs Investigation")
 * 
 * @returns JSX Material-UI Card populated info specified by the above parameters
 */
export default function IssueCard({number, title, state, author, body, url, labels}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="GitHub" className={classes.avatar}>
            {author.login.substring(0,1)}
          </Avatar>
        }
        title={number}
        subheader={state}
      />
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" component="p">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="div">
          {labels.edges.map((label, index) => (
            <ul key={index}>
              <li>{label.node.name}</li>
            </ul>
          ))}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link href={url} style={{textDecoration:'none'}} target="_blank">
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Link>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            <span dangerouslySetInnerHTML={{__html: body}} />
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}