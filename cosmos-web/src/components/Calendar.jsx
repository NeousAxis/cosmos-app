import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import MoonIcon from './MoonIcon';

const Calendar = () => {
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);


    // Moon phase calculation for December 2025
    // Dec 5: Full Moon (100%)
    // Dec 12: Last Quarter (50%)
    // Dec 19: New Moon (0%)
    // Dec 26: First Quarter (50%)

    const getPhaseInfo = (day) => {
        // Key dates
        if (day === 5) {
            return { type: 'full', label: 'Pleine Lune du Capricorne', percentage: 100 };
        } else if (day === 19) {
            return { type: 'new', label: 'Nouvelle Lune du Verseau', percentage: 0 };
        } else if (day === 12) {
            return { type: 'quarter-waning', label: 'Dernier Quartier', percentage: 50 };
        } else if (day === 26) {
            return { type: 'quarter-waxing', label: 'Premier Quartier', percentage: 50 };
        }

        // Progressive phases between key dates
        let percentage, type, label;

        if (day < 5) {
            // Before full moon: waxing from ~70% to 100%
            percentage = 70 + (day / 5) * 30;
            type = 'waxing-gibbous';
            label = 'Gibbeuse Croissante';
        } else if (day > 5 && day < 12) {
            // After full moon, before last quarter: waning from 100% to 50%
            const daysSinceFull = day - 5;
            const totalDays = 12 - 5;
            percentage = 100 - (daysSinceFull / totalDays) * 50;
            type = 'waning-gibbous';
            label = 'Gibbeuse Décroissante';
        } else if (day > 12 && day < 19) {
            // After last quarter, before new moon: waning from 50% to 0%
            const daysSinceQuarter = day - 12;
            const totalDays = 19 - 12;
            percentage = 50 - (daysSinceQuarter / totalDays) * 50;
            type = 'waning-crescent';
            label = 'Dernier Croissant';
        } else if (day > 19 && day < 26) {
            // After new moon, before first quarter: waxing from 0% to 50%
            const daysSinceNew = day - 19;
            const totalDays = 26 - 19;
            percentage = (daysSinceNew / totalDays) * 50;
            type = 'waxing-crescent';
            label = 'Premier Croissant';
        } else {
            // After first quarter (26-31): waxing from 50% to ~80%
            const daysSinceQuarter = day - 26;
            const totalDays = 31 - 26;
            percentage = 50 + (daysSinceQuarter / totalDays) * 30;
            type = 'waxing-gibbous';
            label = 'Gibbeuse Croissante';
        }

        return { type, label, percentage };
    };


    return (
        <div className="calendar-container" style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <button className="btn-ghost" style={{ padding: '4px' }}><ChevronLeft size={20} /></button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Playfair Display', fontSize: '18px' }}>Décembre 2025</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Mois du Capricorne</div>
                </div>
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
                    const phase = getPhaseInfo(d);
                    const isMainPhase = phase.type === 'full' || phase.type === 'new';

                    return (
                        <div
                            key={d}
                            title={phase.label}
                            style={{
                                height: '44px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                position: 'relative',
                                borderRadius: '8px',
                                backgroundColor: isToday ? 'var(--text-main)' : isMainPhase ? 'rgba(0,0,0,0.03)' : 'transparent',
                                color: isToday ? '#fff' : 'inherit',
                                border: isMainPhase ? '1px solid rgba(0,0,0,0.1)' : 'none',
                                padding: '4px 0'
                            }}
                        >
                            <span style={{ fontSize: '12px', fontWeight: isToday ? 600 : 400 }}>{d}</span>

                            <div style={{ height: '16px', display: 'flex', alignItems: 'center' }}>
                                <MoonIcon
                                    type={phase.type}
                                    size={14}
                                    color={isToday ? '#fff' : 'var(--text-main)'}
                                    percentage={phase.percentage || 50}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', textAlign: 'center' }}>Cycles du Mois</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px' }}>
                        <span style={{ fontSize: '16px' }}>🌕</span>
                        <div style={{ flex: 1 }}>
                            <strong>5 Déc. :</strong> Pleine Lune du Capricorne
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px' }}>
                        <span style={{ fontSize: '16px' }}>🌑</span>
                        <div style={{ flex: 1 }}>
                            <strong>19 Déc. :</strong> Nouvelle Lune du Verseau
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '10px', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
                    Les phases intermédiaires (○/●) marquent le flux de l'énergie entre ces deux portes.
                </div>
            </div>
        </div>
    );
};

export default Calendar;
