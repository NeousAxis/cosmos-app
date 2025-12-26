import React from 'react';

const MoonIcon = ({ type, size = 16, color = 'currentColor', percentage = 50 }) => {
    // Use Unicode moon emojis for guaranteed accuracy
    let moonChar;

    switch (type) {
        case 'full':
            moonChar = '🌕'; // Full moon
            break;
        case 'new':
            moonChar = '🌑'; // New moon
            break;
        case 'waxing-crescent':
            moonChar = '🌒'; // Waxing crescent
            break;
        case 'quarter-waxing':
            moonChar = '🌓'; // First quarter
            break;
        case 'waxing-gibbous':
            moonChar = '🌔'; // Waxing gibbous
            break;
        case 'waning-gibbous':
            moonChar = '🌖'; // Waning gibbous
            break;
        case 'quarter-waning':
            moonChar = '🌗'; // Last quarter
            break;
        case 'waning-crescent':
            moonChar = '🌘'; // Waning crescent
            break;
        default:
            moonChar = '🌑';
    }

    return (
        <span style={{
            fontSize: `${size}px`,
            lineHeight: 1,
            display: 'inline-block'
        }}>
            {moonChar}
        </span>
    );
};

export default MoonIcon;
