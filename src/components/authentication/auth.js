import getRefs from '../../services/get-refs.js';
import ApiService from '../../services/apiService.js';

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

const formAuth = document.querySelector('.form-sign-in');
const inputName = formAuth.querySelector('#name');
const inputEmail = formAuth.querySelector('#email');
const inputPassword = formAuth.querySelector('#password');
const btnSignIn = formAuth.querySelector('.btn-sign-in');
const btnSignRegister = formAuth.querySelector('.btn-register');
const btnSignUp = formAuth.querySelector('.btn-sign-up');
const formError = formAuth.querySelector('.form-auth-error');
let loggedIn = false;
let myUserId = '';
let dataIDLikeUsers = {};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userName =
      user.email.length > 10 ? user.email.slice(0, 7) + '...' : user.email;
    refs.btnProfile.textContent = userName;
    loggedIn = true;
    myUserId = firebase.auth().currentUser.uid;
    readUserData();
  } else {
    refs.btnProfile.textContent = 'Profile';
    loggedIn = false;
  }
});

function onClickBtnProfile() {
  // refs.backdrop.innerHTML = contentModalSign;
  onToggleClassModal();
  // onHandlerAuthForm();
  // formAuth.addEventListener('submit', onHandlerAuthForm)
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
  //функция записи нового пользователя в бд
});
btnSignUp.addEventListener('click', e => {
  e.preventDefault();
  formError.textContent = '';
  signOut();
});

function onToggleClassModal() {
  refs.backdropAuth.classList.toggle('is-hidden');
}
function onCloseModalAuth(e) {
  if (
    // e.target.className !== 'close-button' &&
    e.target.className !== 'backdrop-auth'
  ) {
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
  var name = inputName.value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // authError.classList.add('visually-hidden');
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
      // authError.classList.add('visually-hidden');
      formError.textContent = 'registration completed successfully';
      // authError.classList.remove('visually-hidden');
      loggedIn = true;
      onToggleClassModal();
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      formError.textContent = errorMessage;
      // authError.classList.remove('visually-hidden');
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      loggedIn = false;
      onToggleClassModal();
    })
    .catch(error => {
      formError.textContent = '';
      // authError.classList.remove('visually-hidden');
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
    // console.log(Object.values(data));
    dataIDLikeUsers = data
      ? Object.keys(data).map(key => ({
          id: key,
          likeId: data[key],
        }))
      : [];
  });
}

function deleteEventFromDataLikeUser(idLike) {
  const recordData = dataIDLikeUsers.find(us => us.likeId === idLike);
  var deleteDataRef = database.ref(
    'users/' + myUserId + '/idLikeEvent' + '/' + recordData.id,
  );
  deleteDataRef.remove();
}

async function fetchLikedEvnts() {
  const arr = dataIDLikeUsers.map(evt => evt.likeId);
  console.log(arr);
  const result = await Promise.all(
    arr.map(evtId => ApiService.feachEventById(evtId)),
  );

  console.log(result);
  return result;
}

export { writeUserData, deleteEventFromDataLikeUser, fetchLikedEvnts };
