import firebase from '../../firebase/index';
// import { createAction } from 'redux-actions';

const getAdminUser = async () => {
  console.log('start auth');

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // ログインしている
      console.log(user); // null
      console.log(user.displayName); // null
      console.log(user.displayName); // null
      console.log(user.email);
      console.log(user.emailVerified); // false
      console.log(user.photoURL); // null
      console.log(user.isAnonymous); // false
      console.log(user.uid);
      console.log(user.providerData);
      console.log(user.refreshToken);

      // firestoreからuser情報を取得する
      // まずはauthenticationからユーザー情報を取得して、その後firestoreに問い合わせる必要がある
      await firebase
        .firestore()
        .collection('admin_users')
        .where('uid', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          console.log(querySnapshot.docs);
          console.log(querySnapshot.docs[0]);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
            user.name = doc.data().name;
          });
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });

      console.log('new user');
      console.log(user.name);
      console.log('new user');
      return user;
    } else {
      //ログインしてない
      // TODO: ここがnullを返すのでいいのかは要検討
      return null;
    }
  });
};

// export const auth = () => async dispatch => {
//   const adminUser = {}

//   getAdminUser()

//   console.log('getAdminUser');
//   console.log(adminUser);
//   console.log(getAdminUser);
//   console.log('getAdminUser');

// 	dispatch({ type: AUTH, adminUser });
// }
// const a = firebase.auth().onAuthStateChanged((user) => {console.log(user)});


console.log("getAdminUser");
console.log(getAdminUser);
console.log(typeof getAdminUser);

// var b = {}

// const c = async () => {
//   await firebase.auth().onAuthStateChanged((user) => {
//     b = user
//     console.log(user);
//   })
// };

// c()

// console.log(b);
// console.log(typeof b);

// console.log(a);
// console.log(a(1));
// console.log(typeof a);
console.log('getAdminUser');



// const { auth } = createActions(
//   {
//     auth: getAdminUser()
//   }
// );

// export const auth = firebase.auth().currentUser
export const auth = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log('start auth');

  // var adminUser = firebase.auth().currentUser;

  await firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // ログインしている
      console.log(user); // null
      console.log(user.displayName); // null
      console.log(user.displayName); // null
      console.log(user.email);
      console.log(user.emailVerified); // false
      console.log(user.photoURL); // null
      console.log(user.isAnonymous); // false
      console.log(user.uid);
      console.log(user.providerData);
      console.log(user.refreshToken);

      // firestoreからuser情報を取得する
      // まずはauthenticationからユーザー情報を取得して、その後firestoreに問い合わせる必要がある
      await firebase
        .firestore()
        .collection('admin_users')
        .where('uid', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot);
          console.log(querySnapshot.docs);
          console.log(querySnapshot.docs[0]);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
            user.name = doc.data().name;
          });
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });

      console.log('new user');
      console.log(user.name);
      console.log('new user');
    } else {
      //ログインしてない
      // TODO: ここがnullを返すのでいいのかは要検討
      user = { name: '' };
    }

    console.log('dispatch');
    console.log(user);
    console.log(typeof user);
    console.log('dispatch');

    dispatch({
      type: 'auth',
      payload: { name: user.name },
    });
  });
};

export const signIn = (values) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    console.log(values);

    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('login success');
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch((err) => {
        console.log('login error')
        dispatch({ type: 'LOGIN_ERROR' });
      });
  };
};
