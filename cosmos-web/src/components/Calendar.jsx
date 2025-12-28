import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import MoonIcon from './MoonIcon';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    // Fonction simple pour calculer la phase de lune (0.0 - 1.0)
    // 0 = Nouvelle Lune, 0.5 = Pleine Lune
    const getMoonPhaseFraction = (date) => {
        const synodic = 29.53058867;
        const knownNewMoon = new Date('2024-01-11T11:57:00Z').getTime(); // Une nouvelle lune de référence
        const time = date.getTime();
        const diff = time - knownNewMoon;
        const days = diff / (1000 * 60 * 60 * 24);
        const cycles = days / synodic;
        let phase = cycles % 1;
        if (phase < 0) phase += 1;
        return phase;
    };

    const getPhaseInfo = (date) => {
        const fraction = getMoonPhaseFraction(date);

        // Illumination visuelle
        const illumination = (1 - Math.cos(fraction * 2 * Math.PI)) / 2;
        const visualPercent = Math.round(illumination * 100);

        let type = 'new';
        let label = 'Nouvelle Lune';

        if (fraction < 0.02 || fraction > 0.98) { type = 'new'; label = 'Nouvelle Lune'; }
        else if (fraction < 0.23) { type = 'waxing-crescent'; label = 'Premier Croissant'; }
        else if (fraction < 0.27) { type = 'quarter-waxing'; label = 'Premier Quartier'; }
        else if (fraction < 0.48) { type = 'waxing-gibbous'; label = 'Gibbeuse Croissante'; }
        else if (fraction < 0.52) { type = 'full'; label = 'Pleine Lune'; }
        else if (fraction < 0.73) { type = 'waning-gibbous'; label = 'Gibbeuse Décroissante'; }
        else if (fraction < 0.77) { type = 'quarter-waning'; label = 'Dernier Quartier'; }
        else { type = 'waning-crescent'; label = 'Dernier Croissant'; }

        return { type, label, percentage: visualPercent };
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        // 0 = Dimanche, 1 = Lundi...
        const day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const getMonthSign = (m) => {
        const monthSigns = ["Capricorne", "Verseau", "Poissons", "Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire"];
        return monthSigns[m];
    };

    const daysCount = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDayIndex; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysCount; i++) {
        calendarDays.push(i);
    }

    return (
        <div className="calendar-container" style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <button onClick={prevMonth} className="btn-ghost" style={{ padding: '4px' }}><ChevronLeft size={20} /></button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Playfair Display', fontSize: '18px' }}>{monthNames[month]} {year}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Mois {month === 11 ? "du Sagittaire / Capricorne" : "du " + getMonthSign(month)}
                    </div>
                </div>
                <button onClick={nextMonth} className="btn-ghost" style={{ padding: '4px' }}><ChevronRight size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '12px' }}>
                {weekDays.map(d => (
                    <div key={d} style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>{d}</div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                {calendarDays.map((d, i) => {
                    if (d === null) return <div key={`empty-${i}`} />;

                    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    const dateObj = new Date(year, month, d, 12, 0, 0);
                    const phase = getPhaseInfo(dateObj);
                    const isMainPhase = phase.type === 'full' || phase.type === 'new';

                    return (
                        <div
                            key={d}
                            title={`${d} ${monthNames[month]} : ${phase.label}`}
                            style={{
                                height: '44px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '4px 0',
                                borderRadius: '8px',
                                background: isToday ? 'var(--text-main)' : 'rgba(0,0,0,0.02)',
                                color: isToday ? '#fff' : 'var(--text-main)',
                                border: isMainPhase && !isToday ? '1px solid var(--accent)' : 'none',
                                cursor: 'default'
                            }}
                        >
                            <span style={{ fontSize: '13px', fontWeight: isToday ? 600 : 400 }}>{d}</span>
                            <div style={{ transform: 'scale(0.7)' }}>
                                <MoonIcon
                                    percentage={Math.round(phase.percentage)}
                                    type={phase.type}
                                    color={isToday ? '#fff' : undefined}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', textAlign: 'center' }}>Cycles Lunaires</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', fontStyle: 'italic' }}>
                    Calculé dynamiquement selon le cycle synodique de 29.53 jours.
                </div>
            </div>
        </div>
    );
};

export default Calendar;
