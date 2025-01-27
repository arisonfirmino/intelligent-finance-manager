const Banner = () => {
  return (
    <div
      className="absolute right-0 hidden h-screen w-full bg-cover bg-center md:bottom-0 md:max-h-[50%] xl:flex xl:max-h-screen xl:max-w-[50%]"
      style={{
        backgroundImage: "url('/banner.png')",
      }}
    />
  );
};

export default Banner;
