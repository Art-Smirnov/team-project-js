export class AuthUser {
  static signUpWithEmailPassword() {
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

  static signInWithEmailPassword() {
    var email = inputEmail.value;
    var password = inputPassword.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        var user = userCredential.user;

        formError.textContent = 'registration completed successfully';

        loggedIn = true;
        onCloseModalAuth();
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        formError.textContent = errorMessage;
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
      });
  }
}
