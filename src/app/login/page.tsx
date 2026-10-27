import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { DM_Serif_Display } from "next/font/google";
import Logo from "@/components/ui/logo/Logo";
import LoginForm from "@/components/Login/LoginForm/LoginForm";
import type { Metadata } from "next";
import style from "./style.module.css";

export const metadata: Metadata = {
  title: "Log in · CSCV Academy",
};

const DMSerifDisplay = DM_Serif_Display({
  weight: "400",
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
});

const LoginPage = async () => {
  const session = await auth();

  if (session && session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className={style.wrapper}>
        <div className={style.logo}>
          <Logo width={45} height={45} />
          <span className={"text-lg font-semibold md:text-2xl"}>
            Casa De La Anunciacion Brooklyn
          </span>
        </div>

        <h1 className={`${style.main_headline} ${DMSerifDisplay.className}`}>
          Welcome back.
        </h1>
        <LoginForm fontType={DMSerifDisplay.className} />

        <p className={`${style.footer_note}`}>
          By signing in you agree to our Terms &amp; Privacy Policy
        </p>
      </main>
    </>
  );
};

export default LoginPage;
