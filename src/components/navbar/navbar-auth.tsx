import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { getFirstLettersOfWords } from "@/lib/utils";
import { CircleGauge, Settings, LogOut, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DEFAULT_LOGOUT_REDIRECT } from "@/consts/routes";

type listItem = {
  name: string;
  href: string;
};

const unauthenticatedLinks: listItem[] = [
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Login",
    href: "/login",
  },
];

function NavbarAuth() {
  const { data: session, status } = useSession();
  if (status === "loading")
    return (
      <div className="flex items-center justify-center gap-5">
        <Skeleton className="h-5 w-10 rounded-none" />
        <Skeleton className="h-5 w-10 rounded-none" />
        <Skeleton className="h-10 w-32" />
      </div>
    );

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          <AvatarImage src={session.user.image} />
          <AvatarFallback>
            {getFirstLettersOfWords(session.user.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-lg">
          Hello
          <div className="text-xl font-bold md:text-2xl">
            {session.user.name} 👋
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard">
          <DropdownMenuItem>
            <CircleGauge className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
        </Link>
        <Link href="/user-settings">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="focus:text-desctructive-foreground relative flex cursor-pointer select-none items-center rounded-sm bg-destructive px-2 py-1.5 text-sm text-destructive-foreground outline-none transition-colors focus:bg-destructive/80 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          onClick={() =>
            signOut({ redirect: true, callbackUrl: DEFAULT_LOGOUT_REDIRECT })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex items-center justify-center gap-5">
      {unauthenticatedLinks.map((item) => {
        return <Link href={item.href}>{item.name}</Link>;
      })}
      <Button asChild className="group font-bold">
        <Link href="/register">
          Try it now!
          <ArrowRight className="ms-1 h-5 w-5 transition-all group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}

export default NavbarAuth;
