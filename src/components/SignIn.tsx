"use client";

import { UserState } from "@/app/state";
import { IconBoxArrowInRight } from "@/assets/icons";
import { auth } from "@/lib/firebase";
import { withOnline } from "@/lib/online";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSetRecoilState } from "recoil";

function SignIn() {
  const setUser = useSetRecoilState(UserState);

  async function handleClick() {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    if (user) {
      setUser({
        displayName: user.displayName!,
        photoURL: user.photoURL!,
        email: user.email!,
        uid: user.uid,
      });
    }
  }

  return (
    <button className="block" onClick={withOnline(handleClick)}>
      <IconBoxArrowInRight className="w-7 text-white" />
    </button>
  );
}

export default SignIn;
