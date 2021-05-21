import getRefs from '../../services/get-refs.js';
import ApiService from '../../services/apiService.js';
import {
  onClickMyEventsBtn,
  renderDefaultEvents,
} from '../events-list/events-list.js';
import { onToggleModal } from '../modal/modal.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCnMsJDer_0Gcb2_8fWu32IDAPP-hHTPtU',
  authDomain: 'event-booster-70252.firebaseapp.com',
  databaseURL: 'https://event-booster-70252-default-rtdb.firebaseio.com',
  projectId: 'event-booster-70252',
  storageBucket: 'event-booster-70252.appspot.com',
  messagingSenderId: '29788796303',
  appId: '1:29788796303:web:8e1ca3bf2ed020ca9587fa',
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const refs = getRefs();

refs.btnProfile.addEventListener('click', onClickBtnProfile);
refs.backdropAuth.addEventListener('click', onCloseModalAuth);
window.addEventListener('keyup', onKeyModalAuthEscClose);
refs.btnCloseModalUser.addEventListener('click', e => {
  onToggleClassModal();
});

const formAuth = document.querySelector('.form-sign-in');
const inputEmail = formAuth.querySelector('#email');
const inputPassword = formAuth.querySelector('#password');
const hideInput = formAuth.querySelector('.modal-signin-inputs-js');
const btnSignIn = formAuth.querySelector('.btn-sign-in');
const btnSignRegister = formAuth.querySelector('.btn-register');
const btnSignOut = formAuth.querySelector('.btn-sign-out');
const formError = formAuth.querySelector('.form-auth-error');
let loggedIn = false;
let myUserId = '';
let dataIDLikeUsers = {};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userName =
      user.email.length > 10 ? user.email.slice(0, 7) + '...' : user.email;
    refs.greetingUser.textContent = `hi, ${userName}`;
    loggedIn = true;
    myUserId = firebase.auth().currentUser.uid;

    hideInput.classList.add('hide');
    btnSignIn.setAttribute('disabled', '');
    btnSignRegister.setAttribute('disabled', '');
    readUserData();
  } else {
    refs.greetingUser.textContent = 'sign in';
    loggedIn = false;
  }
});

function onClickBtnProfile() {
  onToggleClassModal();
}

btnSignIn.addEventListener('click', e => {
  e.preventDefault();
  formError.textContent = '';
  signInWithEmailPassword();
});
btnSignRegister.addEventListener('click', e => {
  e.preventDefault();
  formError.textContent = '';
  signUpWithEmailPassword();
});
btnSignOut.addEventListener('click', e => {
  e.preventDefault();
  formError.textContent = '';
  signOut();
});

function onToggleClassModal() {
  refs.backdropAuth.classList.toggle('is-hidden');
}
function onCloseModalAuth(e) {
  if (e.target.className !== 'backdrop-auth') {
    return;
  }
  onToggleClassModal();
}
function onKeyModalAuthEscClose(e) {
  if (e.key !== 'Escape') {
    return;
  }
  refs.backdropAuth.classList.add('is-hidden');
}

function signUpWithEmailPassword() {
  var email = inputEmail.value;
  var password = inputPassword.value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      var user = userCredential.user;
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      formError.textContent = errorMessage;
    });
}

function signInWithEmailPassword() {
  var email = inputEmail.value;
  var password = inputPassword.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      var user = userCredential.user;

      formError.textContent = 'registration completed successfully';

      loggedIn = true;
      onToggleClassModal();
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      formError.textContent = errorMessage;
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      loggedIn = false;
      onToggleClassModal();
      window.location.reload();
    })
    .catch(error => {
      formError.textContent = '';
    });
}

function readUserData() {
  var likeListRef = database.ref('users/' + myUserId + '/idLikeEvent');
  likeListRef.on('value', snapshot => {
    const data = snapshot.val();
    dataIDLikeUsers = data
      ? Object.keys(data).map(key => ({
          id: key,
          likeId: data[key],
        }))
      : [];
  });
}

function writeUserData(idLike) {
  var likeListRef = database.ref('users/' + myUserId + '/idLikeEvent');
  var newLikeEvent = likeListRef.push();
  newLikeEvent.set(idLike);

  likeListRef.on('value', snapshot => {
    const data = snapshot.val();
    dataIDLikeUsers = data
      ? Object.keys(data).map(key => ({
          id: key,
          likeId: data[key],
        }))
      : [];
  });
}

function deleteEventFromDataLikeUser(idLike) {
  try {
    const recordData = dataIDLikeUsers.find(us => us.likeId === idLike);
    var deleteDataRef = database.ref(
      'users/' + myUserId + '/idLikeEvent' + '/' + recordData.id,
    );
    deleteDataRef.remove();
    onClickMyEventsBtn();
    onToggleModal();
  } catch (error) {
    console.log(error);
  }
}

function deleteAllEventFromDataLikeUser(e) {
  var deleteDataRef = database.ref('users/' + myUserId);
  deleteDataRef.remove();
  onClickMyEventsBtn();
  onToggleModal();
}

async function fetchLikedEvnts() {
  const arr = dataIDLikeUsers.map(evt => evt.likeId);
  const result = await Promise.all(
    arr.map(evtId => ApiService.feachEventById(evtId)),
  );

  return result;
}

export {
  writeUserData,
  deleteEventFromDataLikeUser,
  fetchLikedEvnts,
  deleteAllEventFromDataLikeUser,
};
