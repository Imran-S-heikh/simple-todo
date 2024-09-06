import { useRecoilValue } from "recoil";
import { UserState } from "../state";
import SignIn from "@/components/SignIn";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/lib/firebase";

function Profile() {
  const user = useRecoilValue(UserState);

  if (!user) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <SignIn />
        </TooltipTrigger>
        <TooltipContent>Sign In</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <button className="block" onClick={() => auth.signOut()}>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-7 h-7 rounded-full"
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>Sign Out</TooltipContent>
    </Tooltip>
  );
}

export default Profile;
