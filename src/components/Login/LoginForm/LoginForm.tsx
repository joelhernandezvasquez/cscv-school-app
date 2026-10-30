"use client";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signInUser } from "@/lib/actions/auth/login";
import { getLoginFieldErrors } from "@/lib/utils";
import { toast, Toaster } from "sonner";
import Spinner from "@/components/ui/spinner/Spinner";
import style from "./style.module.css";
import form from "../../../styles/forms.module.css";
import button from "../../../styles/buttons.module.css";

interface Props {
  fontType: string;
}

interface FieldErrors {
  email?: string;
  password?: string;
}

const LoginForm = ({ fontType }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleAuthentication = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (isPending) return;
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const nextErrors: FieldErrors = getLoginFieldErrors(email, password);
    setErrors(nextErrors);
    setFormError("");

    if (nextErrors.email || nextErrors.password) {
      if (nextErrors.email) emailRef.current?.focus();
      else passwordRef.current?.focus();
      return;
    }
    startTransition(async () => {
      try {
        const result = await signInUser(email, password);

        if (!result.ok) {
          setFormError(result.message);
          toast.error(result.message);
          return;
        }

        router.replace("/dashboard");
        router.refresh();
      } catch (error) {
        setFormError(
          error instanceof Error && error.message
            ? error.message
            : "Login failed. Please try again.",
        );
      }
    });
  };

  return (
    <form
      className={style.form_container}
      onSubmit={handleAuthentication}
      noValidate
    >
      <div className={form.form_field}>
        <label className={`${form.bold_label} ${fontType}`} htmlFor="email">
          Email Address
        </label>
        <div className={`${form.input_wrapper} ${style.field_box}`}>
          <svg
            aria-hidden="true"
            focusable="false"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email to get started"
            autoComplete="username"
            aria-required="true"
            ref={emailRef}
            onChange={() => clearFieldError("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </div>
        {errors.email && (
          <p id="email-error" className={style.field_error}>
            {errors.email}
          </p>
        )}
      </div>

      <div className={form.form_field}>
        <label className={`${form.bold_label} ${fontType}`} htmlFor="password">
          Password
        </label>
        <div className={`${form.input_wrapper} ${style.field_box}`}>
          <svg
            aria-hidden="true"
            focusable="false"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            aria-required="true"
            ref={passwordRef}
            onChange={() => clearFieldError("password")}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
        </div>
        {errors.password && (
          <p id="password-error" className={style.field_error}>
            {errors.password}
          </p>
        )}
      </div>
      <p role="alert" className={formError ? style.form_error : undefined}>
        {formError}
      </p>
      <Toaster
        position="top-center"
        richColors
        closeButton
        style={{ "--error-text": "#b00000" } as React.CSSProperties}
      />
      <button
        type="submit"
        className={`${button.primary_btn} ${button.btn_login} ${fontType}`}
        aria-disabled={isPending}
        aria-busy={isPending}
      >
        {!isPending ? "Log in" : <Spinner text="Signing in…" />}
      </button>
    </form>
  );
};

export default LoginForm;
