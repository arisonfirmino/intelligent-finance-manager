import Image from "next/image";

const ProjectLogo = ({ size }: { size: string }) => {
  return (
    <Image
      src="/logo.jpeg"
      alt="Intelligent Finance Manager"
      height={328}
      width={328}
      className={`rounded-xl ${size}`}
    />
  );
};

export default ProjectLogo;
