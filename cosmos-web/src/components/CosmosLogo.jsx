import React from 'react';

const CosmosLogo = ({ size = 40 }) => {
    // Simple elegant constellation pattern for the logo
    const points = [
        { x: 30, y: 20 },
        { x: 50, y: 15 },
        { x: 70, y: 20 },
        { x: 60, y: 40 },
        { x: 50, y: 60 },
        { x: 40, y: 40 },
    ];

    const lines = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 4]
    ];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 80"
            style={{ overflow: 'visible' }}
        >
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
                    r="2"
                    fill="var(--text-main)"
                />
            ))}
        </svg>
    );
};

export default CosmosLogo;
