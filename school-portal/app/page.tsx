import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>School portal</h1>
      <p>
        <Link href="/login">Login</Link>
      </p>
    </main>
  );
}
