import UserAvatar from "@/app/components/header/user/user-avatar";

interface UserInfoProps {
  name: string;
  email: string;
  image: string;
}

const UserInfo = ({ name, email, image }: UserInfoProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <UserAvatar name={name} image={image} />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-xs font-normal text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
