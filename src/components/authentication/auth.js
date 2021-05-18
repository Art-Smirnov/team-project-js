import getRefs from '../../services/get-refs.js';
import {LikeEvent} from './like-event.js'
const refs = getRefs();
const contentModalSign = `
<div class="modal-sign-in">
   <form action="submit" class="form-sign-in">
        <div class="form-field">
            <label for="email" class="label-field">E-mail</label>
            <input type="email" name="email" id="email" class="form-input" required>
        </div>
        <div class="form-field">
            <label for="password" class="label-field">Password</label>
            <input type="password" name="password" id="password" class="form-input" required>
        </div>
        <button type="submit" class="btn-sign-in">sign in</button>
        <button type="submit" class="btn-register">register</button>
        <button type="submit" class="btn-sign-up">sign up</button>
   </form>
</div>`;

refs.btnProfile.addEventListener('click', onClickBtnProfile);

// const formAuth = document.getElementById('form-sign-in');
// const userName = formAuth.querySelector('#user-name');
// const userEmail = formAuth.querySelector('#email');
// const userPassword = formAuth.querySelector('#password');
// const btnSignIn = formAuth.querySelector('.btn-sign-in');
// const btnSignRegister = formAuth.querySelector('.btn-register');
// const btnSignUp = formAuth.querySelector('.btn-sign-up');




function onClickBtnProfile() {
    refs.backdrop.innerHTML = contentModalSign;
    onToggleClassModal();
    document
        .querySelector('.form-sign-in')
        .addEventListener('submit', onHandlerAuthForm, {once: true})
}

function onToggleClassModal() {
    refs.backdrop.classList.toggle('is-hidden');
}

function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyCnMsJDer_0Gcb2_8fWu32IDAPP-hHTPtU';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'}
    })
        .then(response => response.json())
        .then(data => data.idToken)
}

function onHandlerAuthForm(e) {
    e.preventDefault();

    // const name = e.target.querySelector('#user-name').value;
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;

    authWithEmailAndPassword(email, password)
        .then(token => {
            LikeEvent.fetchIdLikeEvent(token)
        });
   
}





