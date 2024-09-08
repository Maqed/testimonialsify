"use client";
import Link from "next/link";
// import { Menu } from "lucide-react";
import NavbarAuth from "./navbar-auth";
import Logo from "@/components/testimonialsify/logo";
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="container flex h-16 items-center justify-between bg-background">
      <Link href="/" className="flex items-center gap-2">
        <Logo />
      </Link>
      <nav className="flex items-center gap-x-2">
        <NavbarAuth />
        {/* Mobile Nav */}
        {/* <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent className="pt-10">
            <VisuallyHidden>
              <SheetHeader>
                <SheetTitle>Nav Links</SheetTitle>
              </SheetHeader>
            </VisuallyHidden>
          </SheetContent>
        </Sheet> */}
      </nav>
    </header>
  );
}
