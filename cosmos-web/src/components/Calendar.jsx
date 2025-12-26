import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const Calendar = () => {
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    // Dec 2025 fake calendar for demo
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div className="calendar-container" style={{ width: '100%', maxWidth: '320px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <button className="btn-ghost" style={{ padding: '4px' }}><ChevronLeft size={20} /></button>
                <span style={{ fontFamily: 'Playfair Display', fontSize: '18px' }}>Décembre 2025</span>
                <button className="btn-ghost" style={{ padding: '4px' }}><ChevronRight size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '12px' }}>
                {weekDays.map(d => (
                    <div key={d} style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>{d}</div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {days.map(d => {
                    const isToday = d === 26;
                    // Demo Moon Phases
                    const isFullMoon = d === 5;
                    const isNewMoon = d === 19;
                    const isSpecial = isFullMoon;

                    return (
                        <div
                            key={d}
                            style={{
                                height: '32px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                borderRadius: '50%',
                                backgroundColor: isToday ? 'var(--text-main)' : isSpecial ? 'rgba(0,0,0,0.05)' : 'transparent',
                                color: isToday ? '#fff' : 'inherit',
                                border: isSpecial ? '1px solid var(--text-muted)' : 'none'
                            }}
                        >
                            <span style={{ fontSize: '14px' }}>{d}</span>
                            {isFullMoon && <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-main)', position: 'absolute', bottom: '2px' }} />}
                            {isNewMoon && <div style={{ width: '6px', height: '6px', borderRadius: '50%', border: '1px solid var(--text-main)', position: 'absolute', bottom: '2px' }} />}
                        </div>
                    );
                })}
            </div>
            <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-main)' }} />
                    Pleine Lune du Sagittaire
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '1px solid var(--text-main)' }} />
                    Nouvelle Lune du Sagittaire
                </span>
            </div>
        </div>
    );
};

export default Calendar;
