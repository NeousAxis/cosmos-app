import React from 'react';

const CosmosLogo = ({ size = 40 }) => {
    // Sacred geometry symbol: Circle with cross and diagonals
    // 8 cardinal points + 1 center = 9 points total
    const radius = 45;
    const center = 50;

    // Calculate 8 points around the circle (N, NE, E, SE, S, SW, W, NW)
    const points = [
        { x: center, y: center - radius, label: 'N' },           // Top
        { x: center + radius * 0.707, y: center - radius * 0.707, label: 'NE' }, // Top-right
        { x: center + radius, y: center, label: 'E' },           // Right
        { x: center + radius * 0.707, y: center + radius * 0.707, label: 'SE' }, // Bottom-right
        { x: center, y: center + radius, label: 'S' },           // Bottom
        { x: center - radius * 0.707, y: center + radius * 0.707, label: 'SW' }, // Bottom-left
        { x: center - radius, y: center, label: 'W' },           // Left
        { x: center - radius * 0.707, y: center - radius * 0.707, label: 'NW' }, // Top-left
        { x: center, y: center, label: 'C' }                     // Center
    ];

    // Lines: Cross (N-S, E-W) + Diagonals (NE-SW, NW-SE)
    const lines = [
        [0, 4], // N to S (vertical)
        [2, 6], // E to W (horizontal)
        [1, 5], // NE to SW (diagonal)
        [3, 7], // SE to NW (diagonal)
    ];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={{ overflow: 'visible' }}
        >
            {/* Circle outline */}
            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
                opacity="0.6"
            />

            {/* Lines */}
            {lines.map((line, i) => (
                <line
                    key={i}
                    x1={points[line[0]].x}
                    y1={points[line[0]].y}
                    x2={points[line[1]].x}
                    y2={points[line[1]].y}
                    stroke="var(--text-main)"
                    strokeWidth="1.5"
                    opacity="0.5"
                />
            ))}

            {/* Points */}
            {points.map((p, i) => (
                <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={i === 8 ? "2.5" : "2"}
                    fill="var(--text-main)"
                />
            ))}
        </svg>
    );
};

export default CosmosLogo;
