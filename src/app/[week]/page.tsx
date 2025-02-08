import dynamic from "next/dynamic";

const challengeComponents: Record<string, React.ComponentType> = {
  "week-1": dynamic(() => import("@/components/challenges/Week1")),
  "week-2": dynamic(() => import("@/components/challenges/Week2")),
  "week-3": dynamic(() => import("@/components/challenges/Week3")),
  "week-4": dynamic(() => import("@/components/challenges/Week4")),
  "week-5": dynamic(() => import("@/components/challenges/Week5")),
  "week-6": dynamic(() => import("@/components/challenges/Week6")),
  "week-7": dynamic(() => import("@/components/challenges/Week7")),
  "week-8": dynamic(() => import("@/components/challenges/Week8")),
  "week-9": dynamic(() => import("@/components/challenges/Week9")),
  "week-10": dynamic(() => import("@/components/challenges/Week10")),
};

export default async function WeekPage({
  params,
}: {
  params: { week: string };
}) {
  const { week } = params;

  const ChallengeComponent = challengeComponents[week];

  if (!ChallengeComponent) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold">Challenge not found</h1>
        <p className="mt-4">There is no challenge for this week.</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <ChallengeComponent />
    </main>
  );
}
