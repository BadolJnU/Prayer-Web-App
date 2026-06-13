export default function HeroBanner({ city, nextName, timer, current }) {
  return (
    <header className="relative h-[70vh] flex items-center justify-center overflow-hidden pt-16">
      <div 
        className="absolute inset-0 bg-cover bg-center transform scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />
      <div className="relative z-10 text-center px-4">
        <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-medium mb-4">
          📍 {city}
        </span>
        <h1 className="text-sm md:text-base uppercase tracking-widest text-slate-400 font-medium">
          Countdown to <span className="text-emerald-400 font-bold">{nextName}</span>
        </h1>
        <div className="text-6xl md:text-8xl font-mono font-black my-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
          {timer}
        </div>
        <p className="text-xs text-slate-400">Current Phase: {current}</p>
      </div>
    </header>
  );
}