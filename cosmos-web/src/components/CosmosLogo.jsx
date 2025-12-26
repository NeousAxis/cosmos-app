import React from 'react';

const CosmosLogo = ({ size = 40 }) => {
    // Sacred geometry: Cross + Square + Circle
    const center = 50;
    const crossLength = 40; // Length from center to edge

    // 4 points of the cross (N, E, S, W)
    const crossPoints = [
        { x: center, y: center - crossLength, label: 'N' },      // Top
        { x: center + crossLength, y: center, label: 'E' },      // Right
        { x: center, y: center + crossLength, label: 'S' },      // Bottom
        { x: center - crossLength, y: center, label: 'W' },      // Left
    ];

    const centerPoint = { x: center, y: center, label: 'C' };

    // Circle radius - touches the 4 sides of the square
    const circleRadius = crossLength;

    // All points for rendering
    const allPoints = [...crossPoints, centerPoint];

    // Lines forming the square (connecting the 4 cross endpoints)
    const squareLines = [
        [0, 1], // N to E
        [1, 2], // E to S
        [2, 3], // S to W
        [3, 0], // W to N
    ];

    // Cross lines (from center to each endpoint)
    const crossLines = [
        [4, 0], // Center to N
        [4, 1], // Center to E
        [4, 2], // Center to S
        [4, 3], // Center to W
    ];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            style={{ overflow: 'visible' }}
        >
            {/* Circle touching the 4 sides of the square */}
            <circle
                cx={center}
                cy={center}
                r={circleRadius}
                fill="none"
                stroke="var(--text-main)"
                strokeWidth="1.5"
                opacity="0.6"
            />

            {/* Cross lines */}
            {crossLines.map((line, i) => (
                <line
                    key={`cross-${i}`}
                    x1={allPoints[line[0]].x}
                    y1={allPoints[line[0]].y}
                    x2={allPoints[line[1]].x}
                    y2={allPoints[line[1]].y}
                    stroke="var(--text-main)"
                    strokeWidth="1.5"
                    opacity="0.5"
                />
            ))}

            {/* Square lines (connecting cross endpoints) */}
            {squareLines.map((line, i) => (
                <line
                    key={`sq-${i}`}
                    x1={crossPoints[line[0]].x}
                    y1={crossPoints[line[0]].y}
                    x2={crossPoints[line[1]].x}
                    y2={crossPoints[line[1]].y}
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
                    r={i === 4 ? "2.5" : "2"}
                    fill="var(--text-main)"
                />
            ))}
        </svg>
    );
};

export default CosmosLogo;
