import GoogleIcon from "@/app/(pages)/signin/components/auth/google-icon";
import SignInButtonText from "@/app/(pages)/signin/components/auth/signin-button-text";

const SignInButton = () => {
  return (
    <button className="w-full rounded-xl bg-gradient-to-l from-blue-300 via-blue-400 to-primary p-0.5">
      <div className="flex items-center gap-2.5 rounded-xl border bg-background p-1">
        <GoogleIcon />
        <SignInButtonText />
      </div>
    </button>
  );
};

export default SignInButton;
