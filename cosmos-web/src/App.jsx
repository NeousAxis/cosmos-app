import { useState, useEffect } from 'react';
import './index.css';
import { SIGNS } from './data/signs';
import { FESTIVALS } from './data/festivals';
import { SPLENDEUR_TEXT } from './data/splendeur';
import { getMeditationSign, getCurrentPhase } from './utils';
import Meditation from './components/Meditation';
import Constellation from './components/Constellation';
import Calendar from './components/Calendar';
import MoonPhase from './components/MoonPhase';
import { Sparkles, BookOpen, Calendar as CalendarIcon, Feather } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [sign, setSign] = useState(null);
  const [phase, setPhase] = useState(null);
  const [activeTab, setActiveTab] = useState('energie'); // 'energie', 'enseignement', 'calendrier', 'symbolique'
  const [isMeditationOpen, setIsMeditationOpen] = useState(false);
  const [phaseContent, setPhaseContent] = useState(null);
  const [energyMode, setEnergyMode] = useState('individuel'); // 'individuel' | 'global'

  useEffect(() => {
    const s = getMeditationSign();
    const p = getCurrentPhase();
    setSign(s);
    setPhase(p);

    if (s && s.phases_content && s.phases_content[p.id]) {
      setPhaseContent(s.phases_content[p.id]);
    } else {
      setPhaseContent({
        lecture_reel: "Contenu à venir...",
        epreuve: "...",
        action: "..."
      });
    }
  }, []);

  if (!sign || !phase) return <div className="app-container">Chargement...</div>;

  // Calculate generic percentage based on phase for display
  const getPhasePercentage = (pid) => {
    switch (pid) {
      case 'alignement': return '15%';
      case 'contact': return '50%';
      case 'distribution': return '100%';
      case 'integration': return '75%';
      default: return '40%';
    }
  };

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        background: 'none',
        border: 'none',
        fontFamily: 'Inter',
        fontSize: '10px',
        fontWeight: activeTab === id ? 600 : 400,
        color: activeTab === id ? 'var(--text-main)' : 'var(--text-muted)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '0 8px',
        opacity: activeTab === id ? 1 : 0.6
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="app-container" style={{ paddingBottom: '90px' }}>
      <header>
        <h1>COSMOS</h1>
        <div className="current-date">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </header>

      <main>
        {activeTab === 'energie' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <section className="sign-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                <Constellation signId={sign.id} />
                <div className="section-title" style={{ margin: 0 }}>Énergie du Mois · {sign.name}</div>
              </div>

              <h2 className="key-note">« {sign.note_cle} »</h2>
            </section>

            <section className="vulgarisation-block">
              <div className="phase-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="section-title" style={{ marginBottom: 0 }}>Phase Actuelle</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MoonPhase phaseId={phase.id} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>{getPhasePercentage(phase.id)}</span>
                  </div>
                  <span className="phase-name">{phase.name}</span>
                </div>
              </div>

              {/* Toggle Switch */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{
                  display: 'flex',
                  background: 'rgba(0,0,0,0.05)',
                  padding: '4px',
                  borderRadius: '24px',
                  gap: '4px'
                }}>
                  <button
                    onClick={() => setEnergyMode('individuel')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: 'none',
                      background: energyMode === 'individuel' ? 'var(--text-main)' : 'transparent',
                      color: energyMode === 'individuel' ? '#fff' : 'var(--text-muted)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Lecture Individuelle
                  </button>
                  <button
                    onClick={() => setEnergyMode('global')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: 'none',
                      background: energyMode === 'global' ? 'var(--text-main)' : 'transparent',
                      color: energyMode === 'global' ? '#fff' : 'var(--text-muted)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Lecture Globale
                  </button>
                </div>
              </div>

              <div className="teaching-section">
                <span className="teaching-label">
                  {energyMode === 'individuel' ? 'Ce qui se joue intérieurement' : 'Lecture Énergétique Mondiale'}
                </span>
                <p className="teaching-text">
                  {energyMode === 'individuel' ? phaseContent.lecture_reel : phaseContent.lecture_energetique || "Contenu global à venir..."}
                </p>
              </div>

              <div className="teaching-section">
                <span className="teaching-label">Ce qui est souvent confondu ou résisté</span>
                <p className="teaching-text">
                  {phaseContent.epreuve}
                </p>
              </div>

              <div className="action-highlight">
                <span className="teaching-label">Ce que cette phrase invite à ajuster concrètement</span>
                <p className="teaching-text">
                  {phaseContent.action}
                </p>
              </div>
            </section>

            <section style={{ textAlign: 'center' }}>
              <button
                className="btn-primary"
                onClick={() => setIsMeditationOpen(true)}
              >
                Lancer la Pratique (10 min)
              </button>
            </section>
          </motion.div>
        )}

        {activeTab === 'enseignement' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <section className="vulgarisation-block" style={{ padding: '24px' }}>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '22px', marginBottom: '24px', textAlign: 'center' }}>Les Douze Notes de la Splendeur</h3>
              <div style={{ whiteSpace: 'pre-line', lineHeight: '1.7', fontSize: '15px', color: 'var(--text-main)', textAlign: 'justify' }}>
                {SPLENDEUR_TEXT}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'calendrier' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Calendar />

            <div style={{ marginTop: '24px', marginBottom: '40px' }}>
              <details style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '8px', overflow: 'hidden' }}>
                <summary style={{ padding: '16px', cursor: 'pointer', fontWeight: 500, fontSize: '15px', color: 'var(--text-main)', userSelect: 'none' }}>
                  Comprendre le Calendrier Solaire
                </summary>
                <div style={{ padding: '0 16px 16px 16px', fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
                  La perception moderne des cycles célestes souffre d'un contresens symbolique majeur. Alors que notre civilisation repose sur un calendrier solaire calé sur le rythme des saisons, nous continuons souvent de nommer les événements lunaires selon la position de la Lune, alors que celle-ci n'est qu'un miroir passif.
                  Chaque mois, c’est l’énergie de la constellation qui s’infuse au travers du Soleil et rayonne sur l’ensemble du système solaire qui définit la nature de la période que nous traversons sur Terre. Lorsque la Pleine Lune survient, elle ne crée pas sa propre influence ; elle ne fait que refléter et rendre visible la puissance de ce flux solaire spécifique qui l’éclaire de plein fouet. Se focaliser uniquement sur le signe où se projette la Lune revient à regarder le reflet dans un miroir plutôt que la source de la lumière elle-même.
                  Ce passage d'une compréhension basée sur les cycles lunaires vers la maîtrise du calendrier solaire a marqué un tournant historique fondamental, symbolisant l'éveil de la conscience moderne. Cette primauté de la lumière et de la raison a inspiré le Siècle des Lumières, favorisant l'essor de la pensée scientifique, des progrès de la médecine et des technologies contemporaines.
                  En somme, il est nécessaire de distinguer l'émetteur de son reflet. Les gens désignent la Pleine Lune par le signe où elle se trouve par convention astronomique de position, mais les effets vécus appartiennent bien au mois solaire en cours. Nous confondons le contenu (l'énergie solaire du moment) avec le contenant (le signe où la Lune se projette).
                </div>
              </details>
            </div>

            <div className="festivals-container">
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '20px', marginBottom: '24px', textAlign: 'center' }}>Les 3 Portes Majeures</h3>

              {FESTIVALS.map(festival => (
                <div key={festival.id} className="vulgarisation-block" style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                    <Sparkles size={18} color="var(--accent)" />
                    <span className="phase-name" style={{ fontSize: '16px', color: 'var(--text-main)' }}>{festival.name}</span>
                  </div>

                  <div className="teaching-section">
                    <span className="teaching-label">Énergie</span>
                    <p className="teaching-text">{festival.energy}</p>
                  </div>

                  <div className="teaching-section">
                    <span className="teaching-label">Sens Simplifié</span>
                    <p className="teaching-text">{festival.meaning}</p>
                  </div>

                  <div className="action-highlight" style={{ marginTop: '12px', padding: '12px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
                    <span className="teaching-label" style={{ color: 'var(--accent)' }}>Pratiques</span>
                    <p className="teaching-text" style={{ fontWeight: 500, margin: 0 }}>{festival.app_focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'symbolique' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <section className="sign-card" style={{ padding: '32px 24px' }}>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '24px', textAlign: 'center', marginBottom: '24px' }}>Symbolique du Signe</h3>

              {sign.intro_splendeur && (
                <div style={{ marginBottom: '32px', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '16px', textAlign: 'center', lineHeight: '1.6' }}>
                  "{sign.intro_splendeur}"
                </div>
              )}

              <div style={{ width: '40px', height: '1px', background: 'var(--text-muted)', margin: '0 auto 32px' }} />

              {sign.poeme && (() => {
                const separatorRegex = /(L['’][AaâÂ]me parle\s*[:;])/i;
                const parts = sign.poeme.split(separatorRegex);

                if (parts.length >= 3) {
                  return (
                    <div style={{ fontFamily: 'Playfair Display', fontSize: '18px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                      <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                        {parts[0].trim()}
                      </div>
                      <div style={{ textAlign: 'left', fontStyle: 'italic', paddingLeft: '16px', borderLeft: '3px solid var(--accent)', color: 'var(--text-main)' }}>
                        <strong>{parts[1]}</strong> {parts[2].trim()}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div style={{ fontFamily: 'Playfair Display', fontSize: '18px', lineHeight: '1.8', whiteSpace: 'pre-line', textAlign: 'center' }}>
                      {sign.poeme}
                    </div>
                  );
                }
              })()}
            </section>
          </motion.div>
        )}
      </main>

      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0 20px 0',
        zIndex: 1000,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.03)'
      }}>
        <TabButton id="energie" icon={<Sparkles size={20} />} label="Énergie" />
        <TabButton id="enseignement" icon={<BookOpen size={20} />} label="Enseignement" />
        <TabButton id="calendrier" icon={<CalendarIcon size={20} />} label="Calendrier" />
        <TabButton id="symbolique" icon={<Feather size={20} />} label="Symbolique" />
      </nav>

      <AnimatePresence>
        {isMeditationOpen && (
          <Meditation
            sign={sign}
            phase={phase}
            onClose={() => setIsMeditationOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
