import { login, signup } from './actions'
import { Link } from 'lucide-react'

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-20">
      <div className="glass-card p-8 group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-romantic-purple-300/10 blur-3xl -mr-16 -mt-16 group-hover:bg-romantic-purple-300/20 transition-colors duration-500" />
        
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-romantic-text relative z-10">
          <div className="text-center mb-6">
             <h1 className="text-3xl font-bold bg-gradient-to-r from-romantic-pink-400 to-romantic-lavender-400 bg-clip-text text-transparent">
               Welcome Back
             </h1>
             <p className="text-romantic-text/70 mt-2 text-sm">Your safe space awaits</p>
          </div>

          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-2xl px-4 py-3 bg-white/40 border-2 border-romantic-purple-100 backdrop-blur-sm mb-4 focus:outline-none focus:ring-4 focus:ring-romantic-purple-300/30 transition-all font-medium"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-2xl px-4 py-3 bg-white/40 border-2 border-romantic-purple-100 backdrop-blur-sm mb-6 focus:outline-none focus:ring-4 focus:ring-romantic-purple-300/30 transition-all font-medium"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button
            formAction={login}
            className="bg-gradient-to-r from-romantic-pink-400 to-romantic-lavender-400 text-white rounded-2xl px-4 py-3 text-sm font-bold mb-3 shadow-[0_0_20px_rgba(255,182,193,0.4)] hover:shadow-[0_0_25px_rgba(255,182,193,0.6)] hover:-translate-y-1 transition-all duration-300"
          >
            Sign In
          </button>
          <button
            formAction={signup}
            className="border-2 border-romantic-purple-200 text-romantic-text rounded-2xl px-4 py-3 text-sm font-bold shadow-sm hover:bg-white/50 transition-all duration-300"
          >
            Create Account
          </button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-red-100/50 text-red-600 text-center rounded-2xl text-sm italic font-medium">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
