import getRefs from '../../services/get-refs.js';

const refs = getRefs();
const contentModalSign = `
<div class="modal-sign-in">
   <form action="submit" id="form-sign-in">
        <div class="form-field">
            <label for="user-name" class="label-field">Name</label>
            <input type="text" name="user-name" id="user-name" class="form-input" required>
        </div>
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

refs.backdrop.innerHTML = contentModalSign;


const formAuth = document.getElementById('form-sign-in');
const userName = formAuth.querySelector('#user-name');
const userEmail = formAuth.querySelector('#email');
const userPassword = formAuth.querySelector('#password');
const btnSignIn = formAuth.querySelector('.btn-sign-in');
const btnSignRegister = formAuth.querySelector('.btn-register');
const btnSignUp = formAuth.querySelector('.btn-sign-up');


refs.btnSignIn.addEventListener('click', onClickBtnSignIn);

function onClickBtnSignIn() {
    refs.backdrop.innerHTML = contentModalSign;
    onToggleClassModal();
}

function onToggleClassModal() {
    refs.backdrop.classList.toggle('is-hidden');
}




