import React from 'react';

const MoonIcon = ({ type, size = 16, color = 'currentColor' }) => {
    // Standard Moon Phase SVGs
    // Full Circle for Full Moon, Stroked/Masked for others

    switch (type) {
        case 'full':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <circle cx="12" cy="12" r="10" />
                </svg>
            );
        case 'new':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            );
        case 'waxing': // Waxing Gibbous approximation
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.2" />
                    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10c-3.35 0-6.3-1.64-8.12-4.15C11.5 16.5 15 13.5 15 12s-3.5-4.5-9.12-5.85A9.94 9.94 0 0 1 12 2z" />
                </svg>
            );
        case 'waning': // Waning Gibbous approximation
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.2" />
                    <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10c3.35 0 6.3-1.64 8.12-4.15C12.5 16.5 9 13.5 9 12s3.5-4.5 9.12-5.85A9.94 9.94 0 0 0 12 2z" />
                </svg>
            );
        case 'quarter': // First/Last Quarter (Half Moon)
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <path d="M12 2v20c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
                </svg>
            );
        default:
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" opacity="0.5">
                    <circle cx="12" cy="12" r="1" />
                </svg>
            );
    }
};

export default MoonIcon;
