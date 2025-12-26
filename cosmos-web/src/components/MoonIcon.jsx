import React from 'react';

const MoonIcon = ({ type, size = 16, color = 'currentColor' }) => {
    // Accurate Moon Phase SVGs with proper illumination

    switch (type) {
        case 'full':
            // Full Moon - 100% illuminated
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <circle cx="12" cy="12" r="10" />
                </svg>
            );

        case 'new':
            // New Moon - 0% illuminated (just outline)
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            );

        case 'waxing':
            // Waxing Crescent/Gibbous - 25-75% illuminated (right side lit)
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <defs>
                        <mask id={`waxing-mask-${size}`}>
                            <circle cx="12" cy="12" r="10" fill="white" />
                            <ellipse cx="12" cy="12" rx="6" ry="10" fill="black" />
                        </mask>
                    </defs>
                    <circle cx="12" cy="12" r="10" mask={`url(#waxing-mask-${size})`} />
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
                </svg>
            );

        case 'waning':
            // Waning Crescent/Gibbous - 25-75% illuminated (left side lit)
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <defs>
                        <mask id={`waning-mask-${size}`}>
                            <circle cx="12" cy="12" r="10" fill="white" />
                            <ellipse cx="12" cy="12" rx="6" ry="10" fill="black" />
                        </mask>
                    </defs>
                    <g transform="scale(-1, 1) translate(-24, 0)">
                        <circle cx="12" cy="12" r="10" mask={`url(#waning-mask-${size})`} />
                    </g>
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
                </svg>
            );

        case 'quarter':
            // First/Last Quarter - 50% illuminated (half moon)
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <path d="M12 2 A10 10 0 0 1 12 22 L12 2" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
                </svg>
            );

        default:
            // Tiny dot for undefined phases
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" opacity="0.5">
                    <circle cx="12" cy="12" r="2" fill={color} />
                </svg>
            );
    }
};

export default MoonIcon;
