import * as firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyDLg91-137RmU-w32im2GUyPsw3uhYq2X8",
    authDomain: "confess-45bfb.firebaseapp.com",
    databaseURL: "https://confess-45bfb.firebaseio.com",
    projectId: "confess-45bfb",
    storageBucket: "confess-45bfb.appspot.com",
    messagingSenderId: "786792892051",
    appId: "1:786792892051:web:13f2892278394fba4c2f66",
    measurementId: "G-WR85T6582J"
};

const app = firebase.initializeApp(config);

export default app;
