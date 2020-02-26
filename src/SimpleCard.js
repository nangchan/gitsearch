import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

/**
 * Formatted Material-UI Card to display information
 * 
 * @param {number} number [optional] - Issue number
 * @param {string} title  [optional] - Issue title
 * @param {string} state  [optional] - Issue state (eg. open or closed)
 * @param {array} labels  [optional] - Issue Labels (eg. "Component: Developer Tools, Type: Needs Investigation")
 * 
 * @returns JSX Material-UI Card populated info specified by the above parameters
 */
export default function SimpleCard({number, title, state, body, url, labels}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {number}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {state}
        </Typography>
        <Typography variant="body2" component="p">
          <span dangerouslySetInnerHTML={{__html: body}} />
        </Typography>
        {labels.edges.map((label, index) => (
          <ul key={index}>
            <li>{label.node.name}</li>
          </ul>
        ))}
      </CardContent>
      <CardActions>
        <Link href={url} style={{textDecoration:'none'}} target="_blank">
          <Button size="small">GitHub</Button>
        </Link>
      </CardActions>
    </Card>
  );
}