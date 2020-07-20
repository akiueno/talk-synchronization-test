import { Line } from '../../templates';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { actions } from '../../redux/actions';

const mapStateToProps = (state) => {
	console.log('line state');
	console.log(state)
	console.log('line state');

  return {
    posts: {
      value: '',
      data: state.firestore.ordered.user_posts,
      image: '',
      msgs: [],
    },
    messages: state.messages,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      posts: bindActionCreators(actions.posts, dispatch),
      messages: bindActionCreators(actions.messages, dispatch),
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'user_posts' }])
)(Line);
