import Header from "@/app/components/header/header";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-5 p-5 xl:flex-row xl:items-start">
      <Header />
      <div className="w-full max-w-2xl">{children}</div>
    </main>
  );
};

export default Container;
