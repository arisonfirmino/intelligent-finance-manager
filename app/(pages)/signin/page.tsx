import ProjectTitle from "@/app/(pages)/signin/components/project-title";
import SignInButton from "@/app/(pages)/signin/components/auth/signin-button";
import WelcomeMessage from "@/app/(pages)/signin/components/welcome-message";

const SignInPage = () => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center p-5 xl:items-start">
      <ProjectTitle />

      <div className="mt-60 flex flex-col items-center gap-10 xl:ml-20 xl:items-start">
        <WelcomeMessage />
        <div className="w-full max-w-sm space-y-2.5">
          <SignInButton />
          <p className="text-center text-xs text-muted-foreground">
            © 2024 Arison. All Rights Reserved
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
