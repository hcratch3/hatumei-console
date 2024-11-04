var config = {
  apiKey: "AIzaSyAz9Sk2JEjKWn7882ehr-paId_YtvkFJEg",
  authDomain: "toyota-hatumei-login-0001.firebaseapp.com",
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('auth user', user);
  } else {
    window.location.href = 'index.html';
  }
});
