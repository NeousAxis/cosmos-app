import React from 'react';

const MoonIcon = ({ type, size = 16, color = 'currentColor', percentage = 50 }) => {
    // Simple and accurate moon phase rendering

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

        case 'waxing-crescent':
            // Waxing Crescent - thin crescent on the right
            return (
                <svg width={size} height={size} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
                    <path d="M 12 2 A 10 10 0 0 1 12 22 A 8 8 0 0 0 12 2" fill={color} />
                </svg>
            );

        case 'quarter-waxing':
            // First Quarter - right half lit
            return (
                <svg width={size} height={size} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
                    <path d="M 12 2 A 10 10 0 0 1 12 22 Z" fill={color} />
                </svg>
            );

        case 'waxing-gibbous':
            // Waxing Gibbous - mostly lit, small shadow on left
            return (
                <svg width={size} height={size} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill={color} />
                    <path d="M 12 2 A 10 10 0 0 0 12 22 A 8 8 0 0 1 12 2" fill="white" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
                </svg>
            );

        case 'waning-gibbous':
            // Waning Gibbous - mostly lit, small shadow on right
            return (
                <svg width={size} height={size} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill={color} />
                    <path d="M 12 2 A 10 10 0 0 1 12 22 A 8 8 0 0 0 12 2" fill="white" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
                </svg>
            );

        case 'quarter-waning':
            // Last Quarter - left half lit
            return (
                <svg width={size} height={size} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
                    <path d="M 12 2 A 10 10 0 0 0 12 22 Z" fill={color} />
                </svg>
            );

        case 'waning-crescent':
            // Waning Crescent - thin crescent on the left
            return (
                <svg width={size} height={size} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
                    <path d="M 12 2 A 10 10 0 0 0 12 22 A 8 8 0 0 1 12 2" fill={color} />
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
