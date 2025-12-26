import React from 'react';

const constellations = {
    capricorn: {
        viewBox: "0 0 100 100",
        points: [
            { x: 20, y: 80 },  // Base tail
            { x: 35, y: 70 },
            { x: 45, y: 55 },
            { x: 30, y: 40 },  // Horn tip 1
            { x: 45, y: 55 },  // Back to center
            { x: 60, y: 50 },
            { x: 75, y: 30 },  // Head
            { x: 80, y: 20 },  // Horn tip 2
            { x: 75, y: 30 },
            { x: 90, y: 40 }   // Front leg
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [2, 5], [5, 6], [6, 7], [6, 8], [6, 9]
        ]
    },
    // Default simple triangle for others
    default: {
        viewBox: "0 0 100 100",
        points: [{ x: 20, y: 80 }, { x: 50, y: 20 }, { x: 80, y: 80 }],
        lines: [[0, 1], [1, 2], [2, 0]]
    }
};

const Constellation = ({ signId = 'capricorn' }) => {
    const data = constellations[signId] || constellations.default;

    return (
        <svg
            width="60"
            height="60"
            viewBox="0 0 100 100"
            style={{ overflow: 'visible', opacity: 0.8 }}
        >
            {/* Lines */}
            {data.lines.map((line, i) => (
                <line
                    key={i}
                    x1={data.points[line[0]].x}
                    y1={data.points[line[0]].y}
                    x2={data.points[line[1]].x}
                    y2={data.points[line[1]].y}
                    stroke="var(--text-main)"
                    strokeWidth="1.5"
                    opacity="0.6"
                />
            ))}
            {/* Points */}
            {data.points.map((p, i) => (
                <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="2.5"
                    fill="var(--text-main)"
                />
            ))}
        </svg>
    );
};

export default Constellation;
