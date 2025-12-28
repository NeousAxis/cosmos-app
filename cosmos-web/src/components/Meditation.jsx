import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEDITATION_STEPS } from '../data/signs';
import { X, Play, Pause, SkipForward } from 'lucide-react';
import { playGong } from '../soundUtils';

const Meditation = ({ sign, phase, onClose }) => {
    // Calculer la durée totale une fois
    const TOTAL_DURATION = useMemo(() => MEDITATION_STEPS.reduce((acc, s) => acc + s.duration, 0), []);

    // Timer global (compte à rebours du total)
    const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION);
    const [isActive, setIsActive] = useState(false);

    // Trouver l'étape actuelle basée sur le temps écoulé
    const getCurrentStepIndex = () => {
        const elapsed = TOTAL_DURATION - timeLeft;
        let cumulative = 0;
        for (let i = 0; i < MEDITATION_STEPS.length; i++) {
            cumulative += MEDITATION_STEPS[i].duration;
            if (elapsed < cumulative) return i;
        }
        return MEDITATION_STEPS.length - 1;
    };

    const currentStepIndex = getCurrentStepIndex();
    const step = MEDITATION_STEPS[currentStepIndex];

    // Play Gong logic when timer is active
    useEffect(() => {
        if (isActive) {
            playGong(1);
        }
    }, [isActive]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => {
                    const newTime = time - 1;
                    // Check triggers for gong or transitions here if needed
                    return newTime;
                });
            }, 1000);
        } else if (timeLeft <= 0) {
            setIsActive(false); // Finished
            playGong(3); // End sound
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Fonction pour sauter à l'étape suivante (avancer le temps)
    const handleSkip = () => {
        // Calculer quand commence la prochaine étape
        let cumulative = 0;
        for (let i = 0; i <= currentStepIndex; i++) {
            cumulative += MEDITATION_STEPS[i].duration;
        }

        // Le temps restant cible est (Total - Fin de l'étape actuelle)
        const nextTimeLeft = TOTAL_DURATION - cumulative;

        if (nextTimeLeft > 0) {
            setTimeLeft(nextTimeLeft);
        } else {
            // Fin de méditation
            onClose();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <motion.div
            className="meditation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="meditation-header">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)' }}>
                        Méditation
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-main)', marginTop: '4px', fontWeight: 500 }}>
                        Durée Totale : {Math.floor(TOTAL_DURATION / 60)} minutes
                    </span>
                </div>
                <button onClick={onClose} className="btn-ghost" style={{ border: 'none', padding: '10px' }}>
                    <X size={24} color="var(--text-main)" />
                </button>
            </div>

            <div className="meditation-content">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentStepIndex} // Clé sur l'étape pour animer les transitions de TEXTE, pas de TIMER
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        style={{ width: '100%' }}
                    >
                        <div className="meditation-step-title">{step.title}</div>

                        <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '40px' }}>
                            {step.title.includes('CONTACT') ? (
                                <div className="meditation-instruction">
                                    « {sign.note_cle} »
                                </div>
                            ) : step.title.includes('DISTRIBUTION') ? (
                                <div className="meditation-instruction" style={{ fontSize: '24px' }}>
                                    Visualisez : "{sign.note_cle}"<br />rayonnant sur le monde.
                                </div>
                            ) : (
                                <div className="meditation-instruction" style={{ fontSize: '24px' }}>
                                    {step.instructions.map((inst, i) => (
                                        <div key={i} style={{ marginBottom: ('10px') }}>{inst}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Le timer est sorti de motion.div pour ne pas clignoter/resetter visuellement à chaque étape */}
                <div className="meditation-timer">
                    {formatTime(timeLeft)}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '40px' }}>
                    <button
                        onClick={() => setIsActive(!isActive)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
                    >
                        {isActive ? <Pause size={48} /> : <Play size={48} />}
                    </button>

                    <button
                        onClick={handleSkip}
                        className="btn-ghost"
                        title="Passer à l'étape suivante"
                    >
                        Succession
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Meditation;
