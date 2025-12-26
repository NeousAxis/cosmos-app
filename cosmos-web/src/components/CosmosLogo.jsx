import React from 'react';

const CosmosLogo = ({ size = 40 }) => {
    // Sacred geometry symbol: Circle with cross, diagonals, and inner square
    // 12 points total: 8 cardinal + 4 square corners
    const radius = 45;
    const center = 50;
    const squareSize = 32; // Size of inner square

    // Calculate 8 points around the circle (N, NE, E, SE, S, SW, W, NW)
    const circlePoints = [
        { x: center, y: center - radius, label: 'N' },           // Top
        { x: center + radius * 0.707, y: center - radius * 0.707, label: 'NE' }, // Top-right
        { x: center + radius, y: center, label: 'E' },           // Right
        { x: center + radius * 0.707, y: center + radius * 0.707, label: 'SE' }, // Bottom-right
        { x: center, y: center + radius, label: 'S' },           // Bottom
        { x: center - radius * 0.707, y: center + radius * 0.707, label: 'SW' }, // Bottom-left
        { x: center - radius, y: center, label: 'W' },           // Left
        { x: center - radius * 0.707, y: center - radius * 0.707, label: 'NW' }, // Top-left
    ];

    // 4 corners of inner square
    const squarePoints = [
        { x: center - squareSize / 2, y: center - squareSize / 2, label: 'TL' }, // Top-left
        { x: center + squareSize / 2, y: center - squareSize / 2, label: 'TR' }, // Top-right
        { x: center + squareSize / 2, y: center + squareSize / 2, label: 'BR' }, // Bottom-right
        { x: center - squareSize / 2, y: center + squareSize / 2, label: 'BL' }, // Bottom-left
    ];

    const centerPoint = { x: center, y: center, label: 'C' };
    const allPoints = [...circlePoints, ...squarePoints, centerPoint];

    // Lines: Cross (N-S, E-W) + Diagonals (NE-SW, NW-SE)
    const lines = [
        [0, 4], // N to S (vertical)
        [2, 6], // E to W (horizontal)
        [1, 5], // NE to SW (diagonal)
        [3, 7], // SE to NW (diagonal)
    ];

    // Square lines
    const squareLines = [
        [0, 1],   // Top side
        [1, 2],  // Right side
        [2, 3], // Bottom side
        [3, 0],  // Left side
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

            {/* Lines - Cross and Diagonals */}
            {lines.map((line, i) => (
                <line
                    key={i}
                    x1={circlePoints[line[0]].x}
                    y1={circlePoints[line[0]].y}
                    x2={circlePoints[line[1]].x}
                    y2={circlePoints[line[1]].y}
                    stroke="var(--text-main)"
                    strokeWidth="1.5"
                    opacity="0.5"
                />
            ))}

            {/* Square Lines */}
            {squareLines.map((line, i) => (
                <line
                    key={`sq-${i}`}
                    x1={squarePoints[line[0]].x}
                    y1={squarePoints[line[0]].y}
                    x2={squarePoints[line[1]].x}
                    y2={squarePoints[line[1]].y}
                    stroke="var(--text-main)"
                    strokeWidth="1.5"
                    opacity="0.5"
                />
            ))}

            {/* Points */}
            {allPoints.map((p, i) => (
                <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={i === 12 ? "2.5" : "2"}
                    fill="var(--text-main)"
                />
            ))}
        </svg>
    );
};

export default CosmosLogo;
