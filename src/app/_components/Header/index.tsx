import Link from "next/link";


export const Header: React.FC = () => {
  return (
    <header className="w-full px-5 flex items-center justify-between h-[60px] border-b border-base-300">
      <Link href="/">
        <h1 className="text-3xl">🛹</h1>
      </Link>
      <Link href="/about" className="btn btn-sm">
        About
      </Link>
    </header>
  );
};
