export default function PrayerGrid({ prayers, nextName }) {
  return (
    <section className="max-w-5xl mx-auto px-6 -mt-16 relative z-20 grid grid-cols-2 sm:grid-cols-5 gap-4">
      {prayers.map((p) => {
        const isTarget = p.name.toUpperCase() === nextName;
        return (
          <div 
            key={p.id} 
            className={`p-5 rounded-xl border backdrop-blur-md transition ${
              isTarget ? 'bg-emerald-600/20 border-emerald-500 scale-105 shadow-lg shadow-emerald-950/50' : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <p className={`text-xs uppercase tracking-wider font-semibold ${isTarget ? 'text-emerald-400' : 'text-slate-400'}`}>{p.name}</p>
            <p className="text-lg font-bold font-mono mt-1">{p.time}</p>
          </div>
        );
      })}
    </section>
  );
}