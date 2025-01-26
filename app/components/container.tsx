import Header from "@/app/components/header/header";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-5 p-5 xl:flex-row xl:items-start">
      <Header />
      <div className="flex w-full max-w-2xl flex-col gap-5 md:flex-row">
        {children}
      </div>
    </main>
  );
};

export default Container;
