export class AuthUser {
  static signUpWithEmailPassword() {
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

  static signInWithEmailPassword() {
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
        onCloseModalAuth();
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        formError.textContent = errorMessage;
        // authError.classList.remove('visually-hidden');
      });
  }

  static signOut() {
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
}
