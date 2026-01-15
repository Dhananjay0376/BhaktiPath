import { useEffect, useState } from 'react';
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind, Droplets, ThermometerSun } from 'lucide-react';

interface WeatherWidgetProps {
    latitude: number;
    longitude: number;
    locationName: string;
}

interface WeatherData {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
}

const WeatherWidget = ({ latitude, longitude, locationName }: WeatherWidgetProps) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`
                );
                const data = await response.json();

                if (data.current) {
                    setWeather({
                        temperature: data.current.temperature_2m,
                        windSpeed: data.current.wind_speed_10m,
                        weatherCode: data.current.weather_code
                    });
                }
            } catch (err) {
                console.error("Failed to fetch weather:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [latitude, longitude]);

    // WMO Weather Code interpretation
    const getWeatherInfo = (code: number) => {
        if (code === 0) return { label: 'Clear Sky', icon: <Sun className="text-orange-500" size={32} /> };
        if (code >= 1 && code <= 3) return { label: 'Partly Cloudy', icon: <Cloud className="text-gray-400" size={32} /> };
        if (code >= 45 && code <= 48) return { label: 'Foggy', icon: <CloudFog className="text-blue-300" size={32} /> };
        if (code >= 51 && code <= 67) return { label: 'Rainy', icon: <CloudRain className="text-blue-500" size={32} /> };
        if (code >= 71 && code <= 77) return { label: 'Snowy', icon: <CloudSnow className="text-cyan-300" size={32} /> };
        if (code >= 80 && code <= 82) return { label: 'Heavy Rain', icon: <Droplets className="text-blue-600" size={32} /> };
        if (code >= 95) return { label: 'Thunderstorm', icon: <CloudLightning className="text-purple-500" size={32} /> };
        return { label: 'Fair', icon: <Sun className="text-orange-400" size={32} /> };
    };

    if (error) return null; // Hide if error

    return (
        <div className="bg-white/60 backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-6 w-full max-w-sm mx-auto transition-all hover:shadow-2xl hover:bg-white/70">
            <h3 className="text-saffron-dark font-serif font-bold text-lg mb-4 flex items-center gap-2">
                <ThermometerSun size={20} />
                Weather in {locationName}
            </h3>

            {loading ? (
                <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-saffron"></div>
                </div>
            ) : weather ? (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/50 rounded-full shadow-sm">
                            {getWeatherInfo(weather.weatherCode).icon}
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">{weather.temperature}°C</p>
                            <p className="text-sm text-gray-600 font-medium">{getWeatherInfo(weather.weatherCode).label}</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-gray-500 text-sm mb-1">
                            <Wind size={16} />
                            <span>Wind</span>
                        </div>
                        <p className="font-bold text-gray-700">{weather.windSpeed} km/h</p>
                    </div>
                </div>
            ) : null}

            <div className="mt-4 pt-3 border-t border-gray-200/50 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-wider">
                <span>Live Updates</span>
                <span>Open-Meteo</span>
            </div>
        </div>
    );
};

export default WeatherWidget;
