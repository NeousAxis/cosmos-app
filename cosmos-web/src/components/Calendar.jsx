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

        return { type, label, percentage: visualPercent, fraction };
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

    // Paires de signes pour chaque mois
    const monthSignsPairs = [
        "Capricorne / Verseau", // Janvier
        "Verseau / Poissons",   // Février
        "Poissons / Bélier",    // Mars
        "Bélier / Taureau",     // Avril
        "Taureau / Gémeaux",    // Mai
        "Gémeaux / Cancer",     // Juin
        "Cancer / Lion",        // Juillet
        "Lion / Vierge",        // Août
        "Vierge / Balance",     // Septembre
        "Balance / Scorpion",   // Octobre
        "Scorpion / Sagittaire",// Novembre
        "Sagittaire / Capricorne" // Décembre
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
    // On cherche les jours où la fraction est la plus proche de 0 (NL) et 0.5 (PL)
    // Attention : il peut y avoir 2 NL ou 2 PL dans un mois (très rare mais possible, ex: Blue Moon)
    // Ici on simplifie en prenant les principales
    const getMoonEvents = () => {
        const events = [];
        for (let d = 1; d <= daysCount; d++) {
            const date = new Date(year, month, d, 12, 0, 0);
            const frac = getMoonPhaseFraction(date);

            // Nouvelle Lune (proche de 0 ou 1)
            // Seuil très strict pour ne pas détecter plusieurs jours
            // Le cycle est continu. Le minimum local de distance à 0/1 indique le jour J.
            // Simplification : on utilise getPhaseInfo avec un seuil strict

            // Meilleure approche : détecter le passage ou utiliser getPhaseInfo
            // On va utiliser getPhaseInfo et ne garder que le jour qui est 'new' ou 'full' ET le plus proche de l'idéal
        }

        // Approche par recherche du min/max local de précision
        let bestNew = { dist: 1, day: null };
        let bestFull = { dist: 1, day: null };

        // On scanne les jours pour trouver le jour le plus "New" et le plus "Full"
        for (let d = 1; d <= daysCount; d++) {
            const date = new Date(year, month, d, 12, 0, 0);
            const frac = getMoonPhaseFraction(date);

            const distNew = Math.min(frac, 1 - frac);
            const distFull = Math.abs(frac - 0.5);

            // Si on a plusieurs occurrences (ex début et fin de mois), on peut avoir besoin d'une liste
            // Pour l'instant, prenons la première occurrence significative.
            // Une NL/PL dure ~1-2 jours visuellement, mais mathématiquement 1 instant.

            // On va simplement chercher les jours qui sont typés 'new' ou 'full' par notre algo principal
            const info = getPhaseInfo(date);

            if (info.type === 'new') {
                if (bestNew.day === null || distNew < bestNew.dist) {
                    bestNew = { dist: distNew, day: d };
                }
            }
            if (info.type === 'full') {
                if (bestFull.day === null || distFull < bestFull.dist) {
                    bestFull = { dist: distFull, day: d };
                }
            }
        }

        // Raffinement : si on veut supporter 2 PL dans le mois, il faudrait détecter les changements de pente.
        // Pour l'instant, affichons au moins une de chaque si elles existent.

        return {
            newMoon: bestNew.day,
            fullMoon: bestFull.day
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
