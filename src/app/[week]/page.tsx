import { ComponentType } from "react";
import dynamic from "next/dynamic";

type ChallengeComponent = ComponentType<{}>;
type ChallengeComponents = Record<string, ChallengeComponent>;

const challengeComponents: ChallengeComponents = {
  "week-9": dynamic(() => import("@/components/challenges/Week9")),
  "week-10": dynamic(() => import("@/components/challenges/Week10")),
};

export default async function WeekPage({
  params,
}: {
  params: { week: string };
}) {
  const { week } = await params;

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
