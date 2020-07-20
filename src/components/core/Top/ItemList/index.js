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
  itemText: {
    wordBreak: 'break-all',
  }
}));

function AlignItemsList(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
        {/* lineの形式によって表示方法を変える */}
          {(() => {
            if (props.msgs.sender_type === 'user') {
              return (
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="ton"
                      src="https://secretldn.com/wp-content/uploads/2017/07/micropig-feature2.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={classes.itemText}
                    primary={JSON.stringify(props)}
                  />
                </ListItem>
              );
            } else {
              return (
                <ListItem alignItems="flex-start">
                  <ListItemText
                    className={classes.itemText}
                    primary={JSON.stringify(props)}
                  />
                  <ListItemAvatar>
                    <Avatar
                      alt="yo"
                      src="https://res.cloudinary.com/hnoomd34b/image/upload/v1595209655/test/sanoyo_zv73tx.jpg"
                    />
                  </ListItemAvatar>
                </ListItem>
              );
            }
          })()}
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default AlignItemsList;
