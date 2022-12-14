import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
// const email = document.querySelector('input[name="email"]');
// const message = document.querySelector('textarea[name="message"]');

const LOCALSTORAGE_KEY = 'feedback-form-state';
let objectToSave = {};
form.addEventListener(
  'input',
  throttle(e => {
    objectToSave[e.target.name] = e.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(objectToSave));
  }, 500)
);

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });
  form.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
});

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

// const storageData = load(LOCALSTORAGE_KEY);
// if (storageData) {
//   email.value = storageData.email;
//   message.value = storageData.message;
// }
const keys = Object.keys(objectToSave);
for (const key of keys) {
  form.form.elements[key].value = objectToSave[key];
}
