import React, { useEffect, useState } from 'react';

export const ThemeChanger = () => {
    const [theme, setTheme] = useState('dracula');

    useEffect(() => {
        const rootElement = document.documentElement;
        rootElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    return (
        <div className='flex justify-end content-center'>
            <label htmlFor="theme-select" className=' justify-self-center'>Theme:</label>
            <select id="theme-select" value={theme} onChange={handleThemeChange}>
                <option value="dracula" selected>Dracula Theme</option>
                <option value="luxury">Luxury Theme</option>
                <option value="cyberpunk">Cyberpunk Theme</option>
                <option value="synthwave">Synthwave Theme</option>
                <option value="retro">Retro Theme</option>
                <option value="nord">Nord Theme</option>
                <option value="emerald">Emerald Theme</option>
            </select>
        </div>
    );
};