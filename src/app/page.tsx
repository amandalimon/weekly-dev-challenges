import Link from "next/link";

const weeks = [
  { id: "week-1", title: "Hexadecimal Converter" },
  { id: "week-2", title: "Roman Numeral to Words" },
  { id: "week-3", title: "Binary Multiple of 5 Validator" },
  { id: "week-4", title: "Simple Web Navigator" },
  { id: "week-5", title: "Basic Calculator" },
  { id: "week-6", title: "Interactive Chat Interface" },
  { id: "week-7", title: "Notes App" },
  { id: "week-8", title: "Age Calculator" },
  { id: "week-9", title: "Pokémon Lazy Image Loader" },
  { id: "week-10", title: "Task Manager Board" },
  { id: "week-11", title: "Simple E-commerce Store" },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Weekly Challenges</h1>
      <ul className="space-y-4">
        {weeks.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/${id}`} className="text-blue-600 hover:underline">
              {id}: {title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
