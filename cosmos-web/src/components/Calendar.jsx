import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const Calendar = () => {
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Specific moon phases for Dec 2025 as requested
    // Dec 5: Full Moon of Capricorn
    // Dec 19: New Moon of Aquarius
    const getPhaseInfo = (day) => {
        if (day === 5) return { type: 'full', label: 'Pleine Lune du Capricorne' };
        if (day === 19) return { type: 'new', label: 'Nouvelle Lune du Verseau' };

        // Approximation logic for other days
        if (day < 5) return { type: 'waxing', label: 'Gibbeuse Croissante' };
        if (day > 5 && day < 12) return { type: 'waning', label: 'Gibbeuse Décroissante' };
        if (day === 12) return { type: 'quarter', label: 'Dernier Quartier' };
        if (day > 12 && day < 19) return { type: 'waning', label: 'Dernier Croissant' };
        if (day > 19 && day < 26) return { type: 'waxing', label: 'Premier Croissant' };
        if (day === 26) return { type: 'quarter', label: 'Premier Quartier' };
        return { type: 'waxing', label: 'Gibbeuse Croissante' };
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

                            <div style={{ height: '14px', display: 'flex', alignItems: 'center' }}>
                                {phase.type === 'full' ? (
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isToday ? '#fff' : 'var(--text-main)' }} />
                                ) : phase.type === 'new' ? (
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: `1px solid ${isToday ? '#fff' : 'var(--text-main)'}` }} />
                                ) : (
                                    <div style={{ fontSize: '8px', color: isToday ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)', textAlign: 'center', lineHeight: '1' }}>
                                        {phase.type === 'waxing' ? '●' : '○'}
                                    </div>
                                )}
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
