import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function AlignItemsList(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        {/* lineの形式によって表示方法を変える */}
        <ListItemAvatar>
          <Avatar
            alt="ton"
            src="https://secretldn.com/wp-content/uploads/2017/07/micropig-feature2.jpg"
          />
        </ListItemAvatar>
        <ListItemText primary={JSON.stringify(props)} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default AlignItemsList;
