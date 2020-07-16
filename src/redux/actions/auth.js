import firebase from '../../firebase/index';
import { createActions } from 'redux-actions';

const getAdminUser = () => {
  console.log("start auth")
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

      console.log("new user");
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

console.log("getAdminUser");
console.log(getAdminUser);
console.log(typeof getAdminUser);
console.log('getAdminUser');

const { auth } = createActions(
  {
    auth: getAdminUser()
  }
);

// export const auth = () => async (dispatch) => {
//   const adminUser = await getAdminUser();
//   dispatch({ type: 'auth', adminUser });
// };

export { auth };
