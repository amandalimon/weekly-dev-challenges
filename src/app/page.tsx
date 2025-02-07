import Link from "next/link";

const weeks = Array.from({ length: 10 }, (_, i) => `week-${i + 1}`);

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Weekly Challenges</h1>
      <ul className="space-y-4">
        {weeks.map((week) => (
          <li key={week}>
            <Link href={`/${week}`} className="text-blue-600 hover:underline">
              {week}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
