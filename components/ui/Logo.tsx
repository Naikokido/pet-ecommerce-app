import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <Image
        src="/logo-pet.png"
        alt="Pet Ecommerce Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span className="text-2xl font-extrabold text-white">
        Pet <span className="text-yellow-300">Ecommerce</span>
      </span>
    </Link>
  );
};

export default Logo;
