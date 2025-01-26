import Image from "next/image";

interface BankLogoProps {
  logo: string;
  name: string;
  size?: string;
}

const BankLogo = ({ logo, name, size }: BankLogoProps) => {
  return (
    <Image
      src={logo}
      alt={name}
      height={246}
      width={246}
      className={`rounded ${size ? size : "mt-0.5 h-3.5 w-3.5"}`}
    />
  );
};

export default BankLogo;
