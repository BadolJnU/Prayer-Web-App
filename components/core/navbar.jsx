import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          UmmahConnect
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
          <Link href="/quran" className="hover:text-emerald-400 transition">Quran</Link>
          <Link href="/events" className="hover:text-emerald-400 transition">Events</Link>
          <Link href="/admin" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg text-xs transition">
            Admin Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}