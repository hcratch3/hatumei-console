function signout() {
  firebase.auth().signOut()
    .then(() => {
      console.log('Signed out')
    })
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('sign-in-status').innerText = 'Signed in'
    document.getElementById('sign-out').style.display = 'block'
  } else {
    document.getElementById('sign-in-status').innerText = 'Signed out'
    document.getElementById('sign-out').style.display = 'none'
  }
})

var ui = new firebaseui.auth.AuthUI(firebase.auth());
console.log(typeof ui)
ui.start('#firebaseui-auth-container', {
  signInFlow: 'popup',
  signInSuccessUrl: './',
  signInOptions: [
    // プロバイダーの設定
  ]
});
