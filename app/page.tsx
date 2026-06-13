'use client';
import Navbar from '../components/core/navbar';
import HeroBanner from '../components/home/heroBanner';
import PrayerGrid from '../components/home/prayerGrid';
import { usePrayerTimer } from '../hooks/usePrayerTimer';

export default function Home() {
  const { cityName, nextPrayerName, countdown, currentPrayer, prayersList } = usePrayerTimer();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Navbar />
      <HeroBanner city={cityName} nextName={nextPrayerName} timer={countdown} current={currentPrayer} />
      <PrayerGrid prayers={prayersList} nextName={nextPrayerName} />
    </div>
  );
}