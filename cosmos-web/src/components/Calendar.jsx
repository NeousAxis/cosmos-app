import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import MoonIcon from './MoonIcon';
import { CALENDAR } from '../data/calendar';

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

        return { type, label, percentage: visualPercent, fraction };
    };

    const getManualPeak = (date) => {
        // Ajustement pour UTC/Locale : on compare YYYY-MM-DD
        // On utilise l'heure locale de date (qui est passée comme new Date(y, m, d, 12, 0, 0))
        // Donc toISOString() pourrait décaler s'il est minuit, mais ici on est à midi.
        // Le plus sûr :
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        for (const signCycle of CALENDAR) {
            if (signCycle.year === year || signCycle.year === year - 1 || signCycle.year === year + 1) {
                for (const phase of signCycle.phases) {
                    if (phase.peak === dateStr) {
                        return phase.id;
                    }
                }
            }
        }
        return null;
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

    // Paires de signes pour chaque mois (Logique Solaire / Émetteur)
    // Décembre = Capricorne / Verseau
    const monthSignsPairs = [
        "Verseau / Poissons",   // Janvier
        "Poissons / Bélier",    // Février
        "Bélier / Taureau",     // Mars
        "Taureau / Gémeaux",    // Avril
        "Gémeaux / Cancer",     // Mai
        "Cancer / Lion",        // Juin
        "Lion / Vierge",        // Juillet
        "Vierge / Balance",     // Août
        "Balance / Scorpion",   // Septembre
        "Scorpion / Sagittaire",// Octobre
        "Sagittaire / Capricorne",// Novembre
        "Capricorne / Verseau"  // Décembre
    ];

    const daysCount = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDayIndex; i++) {
        calendarDays.push(null);
    }
    for (let i = 1; i <= daysCount; i++) {
        calendarDays.push(i);
    }

    // Calcul des dates clés (NL et PL) pour la légende
    const getMoonEvents = () => {
        let bestNew = null;
        let bestFull = null;

        for (let d = 1; d <= daysCount; d++) {
            const date = new Date(year, month, d, 12, 0, 0);
            const peak = getManualPeak(date);

            if (peak === 'integration') bestNew = d; // Integration = Nouvelle Lune
            if (peak === 'contact') bestFull = d;    // Contact = Pleine Lune
        }

        return {
            newMoon: bestNew,
            fullMoon: bestFull
        };
    };

    const moonEvents = getMoonEvents();

    return (
        <div className="calendar-container" style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <button onClick={prevMonth} className="btn-ghost" style={{ padding: '4px' }}><ChevronLeft size={20} /></button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Playfair Display', fontSize: '18px' }}>{monthNames[month]} {year}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Mois {monthSignsPairs[month]}
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

                    // 1. Récupérer l'info algorithmique par défaut
                    let phase = getPhaseInfo(dateObj);

                    // 2. Vérifier si c'est un Peak Manuel (Force Override)
                    const manualPeak = getManualPeak(dateObj);
                    const isMainPhase = !!manualPeak;

                    if (manualPeak) {
                        if (manualPeak === 'alignement') phase = { ...phase, type: 'quarter-waxing', label: 'Premier Quartier', percentage: 50 };
                        if (manualPeak === 'contact') phase = { ...phase, type: 'full', label: 'Pleine Lune', percentage: 100 };
                        if (manualPeak === 'distribution') phase = { ...phase, type: 'quarter-waning', label: 'Dernier Quartier', percentage: 50 };
                        if (manualPeak === 'integration') phase = { ...phase, type: 'new', label: 'Nouvelle Lune', percentage: 0 };
                    }

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

            {/* Légende Phases de Cycle */}
            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '16px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Phases de Cycle
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

                    {/* Nouvelle Lune Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{ transform: 'scale(0.8)' }}>
                            <MoonIcon percentage={0} type="new" />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 500 }}>Nouvelle Lune</span>
                        {moonEvents.newMoon ? (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                {moonEvents.newMoon} {monthNames[month]}
                            </span>
                        ) : (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>-</span>
                        )}
                    </div>

                    {/* Separator / Decoration */}
                    <div style={{ width: '1px', height: '30px', background: 'rgba(0,0,0,0.1)' }}></div>

                    {/* Pleine Lune Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{ transform: 'scale(0.8)' }}>
                            <MoonIcon percentage={100} type="full" />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 500 }}>Pleine Lune</span>
                        {moonEvents.fullMoon ? (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                {moonEvents.fullMoon} {monthNames[month]}
                            </span>
                        ) : (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>-</span>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Calendar;
