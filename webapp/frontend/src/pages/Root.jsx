import { Outlet } from 'react-router-dom';

import { useDarkMode } from '../hooks/useDarkMode';
import TopNavBar from '../components/TopNavBar';

export default function RootLayout() {
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <div
            className={`${darkMode ? "dark" : undefined} min-h-screen flex flex-col inter-light dark:bg-gradient-to-br dark:from-[#2F4F4F] dark:to-black dark:text-white text-black`}
        >
            <TopNavBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="flex-grow">
                <div className="h-full px-6 py-4">
                    <Outlet />
                </div>
            </main>
        </ div>
    );
}
