
import { CycleTracker } from "@/components/features/CycleTracker";
import { MoodTracker } from "@/components/features/MoodTracker";
import { BreathingExercise } from "@/components/features/BreathingExercise";
import { AffirmationGenerator } from "@/components/features/AffirmationGenerator";
import { Gallery } from "@/components/features/Gallery";
import { RantingJournal } from "@/components/features/RantingJournal";
import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import { logout } from "./login/actions";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <div className="space-y-12 pb-20">
      <header className="text-center py-8 relative">
        <div className="absolute top-0 right-4 flex gap-4">
           {user ? (
             <form action={logout}>
               <button className="text-sm font-bold text-romantic-text/70 hover:text-romantic-purple-500 transition-colors">Sign Out</button>
             </form>
           ) : (
             <Link href="/login" className="text-sm font-bold text-romantic-text/70 hover:text-romantic-purple-500 transition-colors">
               Sign In & Save Progress
             </Link>
           )}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-romantic-pink-400 to-romantic-lavender-400 bg-clip-text text-transparent mb-2 mt-4">
          Hello, Beautiful
        </h1>
        <p className="text-lg text-romantic-text opacity-80">
          Welcome to your safe space 🌸
        </p>
      </header>

      <section>
        <CycleTracker />
      </section>

      <section>
        <MoodTracker />
      </section>

      <section>
        <AffirmationGenerator />
      </section>

      <section>
        <RantingJournal />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
         <section>
            <BreathingExercise />
         </section>
         <section>
            <Gallery />
         </section>
      </div>

      <footer className="text-center text-sm opacity-60 pt-12">
        <p>Made with endless love for you 💕</p>
      </footer>
    </div>
  );
}
