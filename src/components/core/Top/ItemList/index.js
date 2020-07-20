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

function AdminAvatar(){
  return (
    <Avatar
      alt="yo"
      src="https://res.cloudinary.com/hnoomd34b/image/upload/v1595209655/test/sanoyo_zv73tx.jpg"
    />
  )
}

function UserAvatar() {
  return (
    <Avatar
      alt="ton"
      src="https://secretldn.com/wp-content/uploads/2017/07/micropig-feature2.jpg"
    />
  );
}

function FollowListItemText(className) {
  return <ListItemText className={className} primary="followされました" />;
}

function UnFollowListItemText(className) {
  return (
    <ListItemText className={className} primary="ブロックされました" />
  );
}

function TextListItemText(className, data) {
  if (data.message) {
    if (data.message.text) {
      return <ListItemText className={className} primary={data.message.text} />;
    } else {
      return <ListItemText className={className} primary={data.message["text"]} />;
    }
  } else {
    return (<div>いいいい</div>)
  }
}

function buttonListItemText(className, data) {
  if (data.message) {
    return (
      <ListItemText
        className={className}
        primary={data.message.template.text}
      />
    );
  } else {
    return (<div>うううう</div>)
  }
}


function EventListItemText(props) {
  if (props.data) {
    switch (props.data.message_type) {
      case 'follow':
        return FollowListItemText(props.className);
      case 'unfollow':
        return UnFollowListItemText(props.className);
      case 'text':
        return TextListItemText(props.className, props.data);
      case 'buttons':
        return buttonListItemText(props.className, props.data);
      default:
        return <div>あああああ</div>;
    }
  } else {
    return <div>あああああ</div>;
  }
}

function LineListItem(props) {
  if (props.data && props.data.sender_type == 'user') {
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <UserAvatar />
        </ListItemAvatar>
        <EventListItemText className={props.className} data={props.data} />
      </ListItem>
    );
  } else {
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <AdminAvatar />
        </ListItemAvatar>
        <EventListItemText className={props.className} data={props.data} />
      </ListItem>
    );
  }
}

function AlignItemsList(props) {
  const classes = useStyles();
  const data = props.data
  return (
    <List className={classes.root}>
      {/* lineの形式によって表示方法を変える */}
      <LineListItem
        className={classes.itemText}
        data={data}
      />
      <Divider variant="inset" component="li" />
    </List>
  );
}

export default AlignItemsList;
