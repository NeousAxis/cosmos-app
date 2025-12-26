import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEDITATION_STEPS } from '../data/signs';
import { X, Play, Pause, SkipForward } from 'lucide-react';
import { playGong } from '../soundUtils';

const Meditation = ({ sign, phase, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [timeLeft, setTimeLeft] = useState(MEDITATION_STEPS[0].duration);
    const [isActive, setIsActive] = useState(false);

    const step = MEDITATION_STEPS[currentStep];

    // Trigger Gong automatically when step changes (or on mount)
    useEffect(() => {
        // Just 1 gong per phase change as requested
        playGong(1);
    }, [currentStep]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Auto transition
            if (currentStep < MEDITATION_STEPS.length - 1) {
                handleNext();
            } else {
                setIsActive(false); // Finished
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, currentStep]);

    const handleNext = () => {
        if (currentStep < MEDITATION_STEPS.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            setTimeLeft(MEDITATION_STEPS[nextStep].duration);
        } else {
            onClose(); // Finish
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const getTotalDuration = () => {
        const total = MEDITATION_STEPS.reduce((acc, s) => acc + s.duration, 0);
        return Math.floor(total / 60);
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
                        Méditation : Alignement · Contact · Distribution · Intégration
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-main)', marginTop: '4px', fontWeight: 500 }}>
                        Durée Totale : {getTotalDuration()} minutes
                    </span>
                </div>
                <button onClick={onClose} className="btn-ghost" style={{ border: 'none', padding: '10px' }}>
                    <X size={24} color="var(--text-main)" />
                </button>
            </div>

            <div className="meditation-content">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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

                        <div className="meditation-timer">
                            {formatTime(timeLeft)}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '40px' }}>
                            <button
                                onClick={() => setIsActive(!isActive)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
                            >
                                {isActive ? <Pause size={48} /> : <Play size={48} onClick={() => setIsActive(true)} />}
                            </button>

                            <button
                                onClick={handleNext}
                                className="btn-ghost"
                            >
                                Passer
                            </button>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Meditation;
