import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>){
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "soft" | "ghost";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type LinkLikeProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> &
  CommonProps & { href: ComponentPropsWithoutRef<typeof Link>["href"] };
type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> &
  CommonProps & { href?: undefined };

type ButtonProps = LinkLikeProps | NativeButtonProps;

function getVariantClass(variant: ButtonVariant){
  if(variant === "soft") return "button--soft";
  if(variant === "ghost") return "button--ghost";
  return "";
}

export default function Button(props: ButtonProps){
  const variant = props.variant ?? "primary";
  const variantClass = getVariantClass(variant);
  const composedClassName = cx("button", variantClass, props.className);
  const { children } = props;

  if("href" in props && props.href !== undefined){
    const { href, variant: _variant, className: _className, children: _children, ...linkProps } = props as LinkLikeProps;
    return (
      <Link {...linkProps} href={href} className={composedClassName}>
        {children}
      </Link>
    );
  }

  const { variant: _variant, className: _className, children: _children, type = "button", ...buttonProps } = props as NativeButtonProps;
  return (
    <button {...buttonProps} type={type} className={composedClassName}>
      {children}
    </button>
  );
}
