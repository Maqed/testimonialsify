import Image from "next/image";
import { APP_NAME } from "@/consts/app-data";

function Logo() {
  return (
    <>
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      <h1 className="hidden text-lg font-semibold md:block">{APP_NAME}</h1>
    </>
  );
}

export default Logo;
