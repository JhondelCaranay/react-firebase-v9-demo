import { auth, googleProvider } from "../config/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      // await signInWithPopup(auth, googleProvider);
      signInWithRedirect(auth, googleProvider);
      // signInWithPopup(auth, googleProvider)
      //   .then((result) => {
      //     // This gives you a Google Access Token. You can use it to access the Google API.
      //     const credential = GoogleAuthProvider.credentialFromResult(result);
      //     const token = credential.accessToken;
      //     // The signed-in user info.
      //     const user = result.user;
      //     console.log("====================================");
      //     console.log("result", result);
      //     console.log("====================================");
      //     // IdP data available using getAdditionalUserInfo(result)
      //     // ...
      //   })
      //   .catch((error) => {
      //     // Handle Errors here.
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     // The email of the user's account used.
      //     const email = error.customData.email;
      //     // The AuthCredential type that was used.
      //     const credential = GoogleAuthProvider.credentialFromError(error);
      //     // ...
      //   });
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-700 rounded p-10 flex gap-5 justify-between">
      <div className="bg-slate-600 rounded p-5 flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Auth</h1>
        {auth.currentUser && (
          <div className="bg-slate-500 rounded p-5 flex flex-col gap-5">
            <h3 className="text-xl font-bold">Current User</h3>
            <p className="text-xl font-bold cursor-pointer">Email: {auth.currentUser.email}</p>
            <p className="text-xl font-bold cursor-pointer">UID: {auth.currentUser.uid}</p>
          </div>
        )}
      </div>
      <div className="bg-slate-600 rounded p-5 flex flex-col gap-5">
        <input
          className="bg-slate-500 rounded p-5 flex flex-col gap-5"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-slate-500 rounded p-5 flex flex-col gap-5"
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="bg-slate-600 rounded p-5 flex flex-col gap-5">
        <button className="bg-slate-500 rounded p-5 flex flex-col gap-5" onClick={signIn}>
          Sign In
        </button>

        <button className="bg-slate-500 rounded p-5 flex flex-col gap-5" onClick={signInWithGoogle}>
          Sign In With Google
        </button>

        <button className="bg-slate-500 rounded p-5 flex flex-col gap-5" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
