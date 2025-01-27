import ProjectTitle from "@/app/(pages)/signin/components/project-title";
import SignInButton from "@/app/(pages)/signin/components/auth/signin-button";
import WelcomeMessage from "@/app/(pages)/signin/components/welcome-message";
import Banner from "@/app/(pages)/signin/components/banner";

const SignInPage = () => {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center gap-20 xl:items-start">
      <ProjectTitle />
      <div className="mt-60 w-full space-y-10 px-5 md:max-w-[400px] md:px-0 xl:ml-20 xl:max-w-[40%]">
        <WelcomeMessage />
        <div className="w-full space-y-2.5 xl:max-w-sm">
          <SignInButton />
          <p className="text-center text-xs text-muted-foreground">
            © 2024 Arison. All Rights Reserved
          </p>
        </div>
      </div>

      <Banner />
    </main>
  );
};

export default SignInPage;
