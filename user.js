var config = {
  apiKey: "AIzaSyAz9Sk2JEjKWn7882ehr-paId_YtvkFJEg",
  authDomain: "toyota-hatumei-login-0001.firebaseapp.com",
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {  if (user) {
    // ログイン状態の場合
  } else {
    // 未ログイン状態の場合
  }
});
