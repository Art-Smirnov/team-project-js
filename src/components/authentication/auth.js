import getRefs from '../../services/get-refs.js';
// import { AuthUser } from './authentication.js';
import { LikeEvent } from './like-event.js';

const firebaseConfig = {
  apiKey: "AIzaSyCnMsJDer_0Gcb2_8fWu32IDAPP-hHTPtU",
  authDomain: "event-booster-70252.firebaseapp.com",
  databaseURL: "https://event-booster-70252-default-rtdb.firebaseio.com",
  projectId: "event-booster-70252",
  storageBucket: "event-booster-70252.appspot.com",
  messagingSenderId: "29788796303",
  appId: "1:29788796303:web:8e1ca3bf2ed020ca9587fa"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const refs = getRefs();
refs.btnProfile.addEventListener('click', onClickBtnProfile);
refs.backdropAuth.addEventListener('click', onCloseModalAuth);
window.addEventListener('keyup', onKeyModalAuthEscClose);

const formAuth = document.querySelector('.form-sign-in');
const nameUser = formAuth.querySelector('#name')
const inputEmail = formAuth.querySelector('#email');
const inputPassword = formAuth.querySelector('#password');
const btnSignIn = formAuth.querySelector('.btn-sign-in');
const btnSignRegister = formAuth.querySelector('.btn-register');
const btnSignUp = formAuth.querySelector('.btn-sign-up');
const formError = formAuth.querySelector('.form-auth-error');
let loggedIn = false;
let myUserId = '';

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userName =
      user.email.length > 10 ? user.email.slice(0, 7) + '...' : user.email;
    refs.btnProfile.textContent = userName;
      loggedIn = true;
      myUserId = firebase.auth().currentUser.uid;
      console.log('id', myUserId);
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


// function authWithEmailAndPassword(email, password) {
//     const apiKey = 'AIzaSyCnMsJDer_0Gcb2_8fWu32IDAPP-hHTPtU';
//     return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
//         method: 'POST',
//         body: JSON.stringify({
//             email, password,
//             returnSecureToken: true
//         }),
//         headers: {
//             'Content-Type': 'application/json'}
//     })
//         .then(response => response.json())
//         .then(data => data.idToken)
// }

function signUpWithEmailPassword() {
        var email = inputEmail.value;
        var password = inputPassword.value;
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
                formError.textContent = ''
            // authError.classList.remove('visually-hidden');
            });
}

// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

function writeUserData(userID, name) {
    database.ref('users/' + userID).set({
        userName: name
    });
}
