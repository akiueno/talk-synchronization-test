import { Top } from '../../templates';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { actions } from '../../redux/actions';

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts,
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      posts: bindActionCreators(actions.messages, dispatch),
      messages: bindActionCreators(actions.messages, dispatch),
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // firestoreConnect([{ collection: 'projects' }])
)(Top.Main);
