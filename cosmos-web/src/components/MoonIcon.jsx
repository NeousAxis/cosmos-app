import React from 'react';

const MoonIcon = ({ type, size = 16, color = 'currentColor', percentage = 50 }) => {
    // Accurate Moon Phase SVGs with proper illumination based on percentage

    // Helper function to calculate the ellipse rx based on percentage
    // The key is: smaller rx = more illuminated, larger rx = less illuminated
    const getEllipseRx = (pct) => {
        // For waxing: 0% (new) -> rx=10, 50% (quarter) -> rx=0, 100% (full) -> rx=-10 (flip)
        // For waning: reverse
        if (pct <= 50) {
            return 10 - (pct / 50) * 10; // 10 to 0 (new to quarter)
        } else {
            return -((pct - 50) / 50) * 10; // 0 to -10 (quarter to full)
        }
    };

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
        case 'waxing-gibbous':
            // Waxing phases - right side illuminated, growing from right
            const waxRx = Math.abs(getEllipseRx(percentage));
            const waxFill = percentage > 50;

            return (
                <svg width={size} height={size} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
                    {waxFill ? (
                        // Gibbous - mostly lit, dark shadow on left
                        <>
                            <circle cx="12" cy="12" r="10" fill={color} />
                            <ellipse cx="12" cy="12" rx={waxRx} ry="10" fill="white" transform="scale(-1, 1) translate(-24, 0)" />
                        </>
                    ) : (
                        // Crescent - mostly dark, lit crescent on right
                        <ellipse cx="12" cy="12" rx={waxRx} ry="10" fill={color} transform="translate(12, 0)" />
                    )}
                </svg>
            );

        case 'waning-crescent':
        case 'waning-gibbous':
            // Waning phases - left side illuminated, shrinking from left
            const wanRx = Math.abs(getEllipseRx(percentage));
            const wanFill = percentage > 50;

            return (
                <svg width={size} height={size} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
                    {wanFill ? (
                        // Gibbous - mostly lit, dark shadow on right
                        <>
                            <circle cx="12" cy="12" r="10" fill={color} />
                            <ellipse cx="12" cy="12" rx={wanRx} ry="10" fill="white" transform="translate(12, 0)" />
                        </>
                    ) : (
                        // Crescent - mostly dark, lit crescent on left
                        <ellipse cx="12" cy="12" rx={wanRx} ry="10" fill={color} transform="scale(-1, 1) translate(-24, 0)" />
                    )}
                </svg>
            );

        case 'quarter-waxing':
            // First Quarter - 50% illuminated (right half)
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <path d="M12 2 A10 10 0 0 1 12 22 L12 2" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
                </svg>
            );

        case 'quarter-waning':
            // Last Quarter - 50% illuminated (left half)
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                    <path d="M12 2 A10 10 0 0 0 12 22 L12 2" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.2" />
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
