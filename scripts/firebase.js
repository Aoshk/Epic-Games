  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBZDbhptmWRsjZFpfQmF5h1a4JQ36acF74",
    authDomain: "epic-store-72502.firebaseapp.com",
    projectId: "epic-store-72502",
    storageBucket: "epic-store-72502.appspot.com",
    messagingSenderId: "509566163963",
    appId: "1:509566163963:web:e899a3a54952a88ade895e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage();
    