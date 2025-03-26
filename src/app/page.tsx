import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">Travel Together</h1>
        <p className="text-xl mb-8">Plan and organize trips with friends and family</p>
        <div className="flex gap-4">
          <Link
            href="/register"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
} 