import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">Welcome to Suraagh</h1>
      <p className="mt-2 text-lg text-zinc-700 dark:text-zinc-400">
        Your one-stop solution for all your gaming needs.
      </p>
    </div>
  );
}
