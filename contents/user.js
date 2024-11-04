var config = {
  apiKey: "AIzaSyAz9Sk2JEjKWn7882ehr-paId_YtvkFJEg",
  authDomain: "toyota-hatumei-login-0001.firebaseapp.com",
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById('userH').innerText = user;
    console.log('auth user', user);
  } else {
    setTimeout(function(){window.location.href = '../index.html';}, 5*1000);
  }
});
