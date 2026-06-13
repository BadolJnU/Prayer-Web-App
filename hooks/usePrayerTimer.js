import { useState, useEffect } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes, Prayer } from 'adhan';

export function usePrayerTimer() {
  const [cityName, setCityName] = useState('Detecting location...');
  const [currentPrayer, setCurrentPrayer] = useState('---');
  const [nextPrayerName, setNextPrayerName] = useState('---');
  const [countdown, setCountdown] = useState('00:00:00');
  const [prayersList, setPrayersList] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      fallbackToDefault();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          setCityName(data.city || data.locality || 'Detected Horizon');
        } catch {
          setCityName('My Location');
        }
        initializeCalculations(latitude, longitude);
      },
      () => fallbackToDefault()
    );
  }, []);

  const fallbackToDefault = () => {
    setCityName('Makkah, SA (Default)');
    initializeCalculations(21.4225, 39.8262);
  };

  const initializeCalculations = (lat, lon) => {
    const coords = new Coordinates(lat, lon);
    const params = CalculationMethod.MuslimWorldLeague();

    const ticker = setInterval(() => {
      const now = new Date();
      const instance = new PrayerTimes(coords, now, params);

      const f = (t) => t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

      setPrayersList([
        { id: 'fajr', name: 'Fajr', time: f(instance.fajr) },
        { id: 'dhuhr', name: 'Dhuhr', time: f(instance.dhuhr) },
        { id: 'asr', name: 'Asr', time: f(instance.asr) },
        { id: 'maghrib', name: 'Maghrib', time: f(instance.maghrib) },
        { id: 'isha', name: 'Isha', time: f(instance.isha) },
      ]);

      const current = instance.currentPrayer();
      let next = instance.nextPrayer();
      setCurrentPrayer(current === Prayer.None ? 'ISHA' : current.toUpperCase());

      let targetTime = instance.timeForPrayer(next);
      let nameLabel = next.toUpperCase();

      if (next === Prayer.None || current === Prayer.Isha) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowTimes = new PrayerTimes(coords, tomorrow, params);
        targetTime = tomorrowTimes.fajr;
        nameLabel = 'FAJR (TOMORROW)';
      }

      setNextPrayerName(nameLabel);

      if (targetTime) {
        const delta = targetTime.getTime() - new Date().getTime();
        const hrs = Math.floor(delta / 3600000).toString().padStart(2, '0');
        const mins = Math.floor((delta % 3600000) / 60000).toString().padStart(2, '0');
        const secs = Math.floor((delta % 60000) / 1000).toString().padStart(2, '0');
        setCountdown(`${hrs}:${mins}:${secs}`);
      }
    }, 1000);

    return () => clearInterval(ticker);
  };

  return { cityName, currentPrayer, nextPrayerName, countdown, prayersList };
}