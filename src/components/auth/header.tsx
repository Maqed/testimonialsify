import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/consts/app-data";
const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export default function HeaderComponent({ label }: HeaderProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn("text-3xl font-semibold", poppinsFont.className)}>
        {APP_NAME}
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
