import {AuthMethods, AuthProviders} from "angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyCe3YsD-yR0rxtaOG4UyatTv4Za6C8WMgQ",
    authDomain: "workiwi-efdf3.firebaseapp.com",
    databaseURL: "https://workiwi-efdf3.firebaseio.com",
    storageBucket: "workiwi-efdf3.appspot.com",
    messagingSenderId: "123664017983"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};