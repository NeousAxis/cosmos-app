import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import MoonIcon from './MoonIcon';

const Calendar = () => {
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);


    // Specific moon phases for Dec 2025 as requested
    // Dec 5: Full Moon of Capricorn
    // Dec 19: New Moon of Aquarius
    // Dec 26: First Quarter (approximately)

    const getPhaseInfo = (day) => {
        // Calculate moon phase percentage (0 = new, 0.5 = full, 1 = new again)
        // Cycle: Dec 19 (new) -> Dec 26 (quarter) -> Jan 4 (full) -> Jan 11 (quarter) -> Jan 19 (new)

        let phase, label, percentage;

        if (day === 5) {
            return { type: 'full', label: 'Pleine Lune du Capricorne', percentage: 100 };
        } else if (day === 19) {
            return { type: 'new', label: 'Nouvelle Lune du Verseau', percentage: 0 };
        } else if (day === 12) {
            return { type: 'quarter-waning', label: 'Dernier Quartier', percentage: 50 };
        } else if (day === 26) {
            return { type: 'quarter-waxing', label: 'Premier Quartier', percentage: 50 };
        }

        // Progressive phases
        if (day < 5) {
            // Waxing from previous new moon (assume Dec -10) to full (Dec 5)
            percentage = 50 + (day / 5) * 50; // 50-100%
            if (day <= 2) {
                return { type: 'waxing-crescent', label: 'Premier Croissant', percentage };
            } else {
                return { type: 'waxing-gibbous', label: 'Gibbeuse Croissante', percentage };
            }
        } else if (day > 5 && day < 12) {
            // Waning from full (5) to last quarter (12)
            percentage = 100 - ((day - 5) / 7) * 50; // 100-50%
            return { type: 'waning-gibbous', label: 'Gibbeuse Décroissante', percentage };
        } else if (day > 12 && day < 19) {
            // Waning from last quarter (12) to new (19)
            percentage = 50 - ((day - 12) / 7) * 50; // 50-0%
            return { type: 'waning-crescent', label: 'Dernier Croissant', percentage };
        } else if (day > 19 && day < 26) {
            // Waxing from new (19) to first quarter (26)
            percentage = ((day - 19) / 7) * 50; // 0-50%
            return { type: 'waxing-crescent', label: 'Premier Croissant', percentage };
        } else {
            // After first quarter
            percentage = 50 + ((day - 26) / 9) * 50; // 50-100%
            return { type: 'waxing-gibbous', label: 'Gibbeuse Croissante', percentage };
        }
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
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--text-main)' }} />
                        <div style={{ flex: 1 }}>
                            <strong>5 Déc. :</strong> Pleine Lune du Capricorne
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid var(--text-main)' }} />
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
