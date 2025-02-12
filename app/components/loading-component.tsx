import Image from "next/image";

const LoadingComponent = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Image
        src="/loading.gif"
        alt="Loading Gif"
        height={512}
        width={512}
        className="w-52"
      />

      <div className="space-y-1.5 text-center">
        <p className="text-xl font-semibold">
          Preparando seu relatório financeiro
        </p>
        <p className="text-sm text-muted-foreground">
          Estamos atualizando tudo para que você tenha as melhores informações.
        </p>
      </div>
    </div>
  );
};

export default LoadingComponent;
