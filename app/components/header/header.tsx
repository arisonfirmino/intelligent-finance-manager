import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";

import FooterText from "@/app/components/header/footer-text";
import ProjectLogo from "@/app/components/project-logo";
import Menu from "@/app/components/header/menu/menu";
import User from "@/app/components/header/user/user";
import { redirect } from "next/navigation";

const Header = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { banks: true },
  });

  if (!user) return null;

  return (
    <header className="relative h-fit w-full max-w-2xl xl:w-fit">
      <FooterText />
      <div className="h-fit w-full rounded-xl border border-input bg-muted p-1 xl:w-auto">
        <div className="flex items-center justify-between rounded-xl border p-2.5 xl:flex-col xl:justify-normal xl:gap-20">
          <ProjectLogo size="hidden h-10 w-10 xl:h-14 xl:w-14 md:flex" />
          <Menu
            userId={user.id}
            banks={JSON.parse(JSON.stringify(user.banks))}
          />
          <User user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
