import Link from "next/link";
import Image from "next/image";

interface GetStartedButtonProps {
  href?: string;
  text?: string;
  icon?: string;
  className?: string;
  iconClassName?: string;
  containerClassName?: string;
}

export default function GetStartedButton({
  href = "#",
  text = "Get Started",
  icon = "/images/arrow-right.svg",
  className = "",
  iconClassName = "w-10 h-10",
  containerClassName = "bg-white w-fit text-gray-100 py-1 pl-1 font-semibold text-base rounded-full pr-1 mt-10 border border-surface-300",
}: GetStartedButtonProps) {
  return (
    <div className={containerClassName}>
      <Link
        href={href}
        className={`flex items-center gap-2 bg-transparent hover:bg-primary hover:text-white transition-colors duration-300 w-full pr-4 rounded-full ${className}`}
      >
        <div
          className={`flex items-center justify-center rounded-full bg-primary ${iconClassName}`}
        >
          <Image src={icon} alt="" width={24} height={24} className="w-6 h-6" />
        </div>
        <p>{text}</p>
      </Link>
    </div>
  );
}
