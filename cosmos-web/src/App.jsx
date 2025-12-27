import { useState, useEffect } from 'react';
import './index.css';
import { SIGNS } from './data/signs';
import { FESTIVALS } from './data/festivals';
import { COSMOSOPHIE_SECTIONS } from './data/splendeur';
import { getMeditationSign } from './utils';
import { getPhaseForDate } from './data/calendar';
import { CONTENTS_DB } from './data/contents_db';
import Meditation from './components/Meditation';
import Constellation from './components/Constellation';
import CosmosLogo from './components/CosmosLogo';
import Calendar from './components/Calendar';
import MoonPhase from './components/MoonPhase';
import { Sparkles, BookOpen, Calendar as CalendarIcon, Feather, Quote, Bell } from 'lucide-react';
import { CAPRICORN_QUOTES } from './data/quotes';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [sign, setSign] = useState(null);
  const [phase, setPhase] = useState(null);
  const [activeTab, setActiveTab] = useState('energie');
  const [isMeditationOpen, setIsMeditationOpen] = useState(false);
  const [phaseContent, setPhaseContent] = useState({
    lecture_reel: "Contenu à venir...",
    lecture_energetique: "Contenu à venir...",
    epreuve: "...",
    action: "..."
  });
  const [energyMode, setEnergyMode] = useState('individuel');

  useEffect(() => {
    // 1. Déterminer la date du jour
    const now = new Date();
    const currentYear = now.getFullYear().toString();

    // 2. Récupérer la phase active depuis le calendrier perpétuel
    const activePhase = getPhaseForDate(now);

    // 3. Charger les infos du signe
    let currentSign = null;
    let currentPhaseData = null;

    if (activePhase) {
      currentSign = SIGNS.find(s => s.id === activePhase.signId);
      currentPhaseData = {
        id: activePhase.phaseId,
        name: activePhase.phaseId.charAt(0).toUpperCase() + activePhase.phaseId.slice(1),
        start: activePhase.dates.start,
        end: activePhase.dates.end
      };

      // 4. Charger le contenu depuis la DB manuelle
      const dbYear = CONTENTS_DB[currentYear];
      if (dbYear && dbYear[activePhase.signId] && dbYear[activePhase.signId][activePhase.phaseId]) {
        setPhaseContent(dbYear[activePhase.signId][activePhase.phaseId]);
      } else {
        // Fallback si pas de texte rédigé pour cette année/phase
        setPhaseContent({
          lecture_reel: "Le contenu pour cette phase n'est pas encore disponible.",
          lecture_energetique: "...",
          epreuve: "...",
          action: "..."
        });
      }
    } else {
      // Hors phase (transition ?) -> On peut afficher le signe du mois par défaut
      const defaultSign = getMeditationSign();
      currentSign = defaultSign;
      currentPhaseData = { id: 'waiting', name: 'Transition', start: null, end: null };
      setPhaseContent({
        lecture_reel: "Nous sommes dans une période de transition entre deux cycles.",
        lecture_energetique: "...",
        epreuve: "...",
        action: "..."
      });
    }

    setSign(currentSign);
    setPhase(currentPhaseData);

  }, []);

  if (!sign || !phase) return <div className="app-container">Chargement...</div>;

  // Calculate generic percentage based on phase for display
  const getPhasePercentage = () => {
    if (!phase.start || !phase.end) return '0%';

    // Pour tester le dynamisme, on utilise new Date()
    // En prod, ça suivra l'heure réelle
    const now = new Date().getTime();
    const start = new Date(phase.start).getTime(); // YYYY-MM-DDT00:00:00...
    // Pour la fin, on ajoute 23h59:59 pour couvrir la journée
    const end = new Date(phase.end).getTime() + (24 * 60 * 60 * 1000) - 1;

    if (now < start) return '0%';
    if (now > end) return '100%';

    const total = end - start;
    const current = now - start;
    const percent = Math.round((current / total) * 100);
    return `${percent}%`;
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
          <CosmosLogo size={36} />
          <h1 style={{ margin: 0 }}>COSMOS</h1>
        </div>
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
                    <MoonPhase phaseId={phase.id} percentageStr={getPhasePercentage()} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>{getPhasePercentage()}</span>
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
                    Lecture Mondiale
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

              {energyMode === 'individuel' && (
                <>
                  <div className="teaching-section">
                    <span className="teaching-label">Ce qui est souvent confondu ou résisté</span>
                    <p className="teaching-text">
                      {phaseContent.epreuve}
                    </p>
                  </div>

                  <div className="action-highlight">
                    <div style={{ marginBottom: '12px', padding: '12px', background: 'rgba(var(--accent-rgb), 0.08)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', display: 'block', marginBottom: '6px' }}>Phrase clé du mois :</span>
                      <p style={{ fontSize: '14px', fontStyle: 'italic', margin: 0, color: 'var(--text-main)' }}>
                        « {sign.note_cle} »
                      </p>
                    </div>
                    <span className="teaching-label">Ce que cette phrase invite à ajuster concrètement</span>
                    <p className="teaching-text">
                      {phaseContent.action}
                    </p>
                  </div>
                </>
              )}
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

        {activeTab === 'cosmosophie' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <section className="vulgarisation-block" style={{ padding: '24px' }}>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '22px', marginBottom: '32px', textAlign: 'center' }}>Les Douze Notes de la Splendeur</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {COSMOSOPHIE_SECTIONS.map((section, index) => (
                  <details
                    key={section.id}
                    style={{
                      background: 'rgba(0,0,0,0.02)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid rgba(0,0,0,0.05)'
                    }}
                  >
                    <summary style={{
                      padding: '16px 20px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '15px',
                      color: 'var(--text-main)',
                      userSelect: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: 700,
                        flexShrink: 0
                      }}>
                        {section.id}
                      </span>
                      <span style={{ flex: 1 }}>{section.title}</span>
                    </summary>
                    <div style={{
                      padding: '0 20px 20px 60px',
                      fontSize: '14px',
                      lineHeight: '1.7',
                      color: 'var(--text-main)',
                      whiteSpace: 'pre-line',
                      textAlign: 'justify'
                    }}>
                      {section.content}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'inspiration' && (() => {
          // Get today's quote (rotate through quotes based on day of year)
          const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
          const todayQuote = CAPRICORN_QUOTES[dayOfYear % CAPRICORN_QUOTES.length];

          return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div style={{ padding: '20px' }}>
                <div style={{
                  background: 'rgba(var(--accent-rgb), 0.05)',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px solid var(--accent)'
                }}>
                  <Bell size={20} color="var(--accent)" />
                  <span style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 500 }}>
                    Citation envoyée chaque matin à 7h00
                  </span>
                </div>

                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '40px', textAlign: 'center' }}>L'Inspiration Quotidienne</h3>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: '#fff',
                    padding: '48px 32px',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                    position: 'relative',
                    border: '1px solid rgba(0,0,0,0.03)',
                    maxWidth: '600px',
                    margin: '0 auto'
                  }}
                >
                  <Quote size={60} style={{ position: 'absolute', top: '20px', left: '20px', opacity: 0.04 }} />
                  <p style={{
                    fontFamily: 'Playfair Display',
                    fontSize: '24px',
                    lineHeight: '1.7',
                    fontStyle: 'italic',
                    marginBottom: '32px',
                    color: 'var(--text-main)',
                    textAlign: 'center'
                  }}>
                    "{todayQuote.text}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <span style={{ fontWeight: 600, fontSize: '16px', color: 'var(--accent)' }}>— {todayQuote.author}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: '6px', fontWeight: 500 }}>
                      {todayQuote.energy}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })()}


        {activeTab === 'calendrier' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Calendar />

            <div style={{ marginTop: '24px', marginBottom: '40px' }}>
              <details style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '8px', overflow: 'hidden' }}>
                <summary style={{ padding: '16px', cursor: 'pointer', fontWeight: 500, fontSize: '15px', color: 'var(--text-main)', userSelect: 'none' }}>
                  Comprendre le Calendrier Solaire
                </summary>
                <div style={{ padding: '0 16px 16px 16px', fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                  <p style={{ marginBottom: '16px' }}>
                    La perception moderne des cycles célestes souffre d'un contresens symbolique majeur. Alors que notre civilisation repose sur un calendrier solaire calé sur le rythme des saisons, nous continuons souvent de nommer les événements lunaires selon la position de la Lune, alors que celle-ci n'est qu'un miroir passif.
                  </p>

                  <p style={{ marginBottom: '16px' }}>
                    Chaque mois, c'est l'énergie de la constellation qui s'infuse au travers du Soleil et rayonne sur l'ensemble du système solaire qui définit la nature de la période que nous traversons sur Terre. Lorsque la Pleine Lune survient, elle ne crée pas sa propre influence ; elle ne fait que refléter et rendre visible la puissance de ce flux solaire spécifique qui l'éclaire de plein fouet.
                  </p>

                  <p style={{ marginBottom: '16px' }}>
                    Se focaliser uniquement sur le signe où se projette la Lune revient à regarder le reflet dans un miroir plutôt que la source de la lumière elle-même. Ce passage d'une compréhension basée sur les cycles lunaires vers la maîtrise du calendrier solaire a marqué un tournant historique fondamental, symbolisant l'éveil de la conscience moderne.
                  </p>

                  <p style={{ marginBottom: '16px' }}>
                    Cette primauté de la lumière et de la raison a inspiré le Siècle des Lumières, favorisant l'essor de la pensée scientifique, des progrès de la médecine et des technologies contemporaines.
                  </p>

                  <p style={{ marginBottom: 0 }}>
                    En somme, il est nécessaire de distinguer l'émetteur de son reflet. Les gens désignent la Pleine Lune par le signe où elle se trouve par convention astronomique de position, mais les effets vécus appartiennent bien au mois solaire en cours. Nous confondons le contenu (l'énergie solaire du moment) avec le contenant (le signe où la Lune se projette).
                  </p>
                </div>
              </details>
            </div>

            <div className="festivals-container">
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '20px', marginBottom: '16px', textAlign: 'center' }}>Les 3 Fêtes Majeures</h3>

              <div style={{ marginBottom: '32px', padding: '16px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                <p style={{ marginBottom: '12px' }}>
                  Chaque année, trois rendez-vous marquent une progression vers une solidarité mondiale. En avril, la Fête de Pâques, du renouveau célèbre l'énergie de l'amour universel, nous invitant à privilégier la vie et la reconstruction sur la destruction.
                </p>

                <p style={{ marginBottom: '12px' }}>
                  En mai, le WESAK, la fête de la clarté. Elle apporte une impulsion de sagesse, aidant l'intelligence humaine à mieux comprendre les besoins du monde.
                </p>

                <p style={{ marginBottom: '12px' }}>
                  Enfin, en juin, la Fête de la Volonté de Bien est l'unité humaine célébrant notre volonté de vivre ensemble dans la fraternité. Ces moments ne sont pas des dogmes, mais des occasions de synchroniser nos intentions pour instaurer des relations humaines justes.
                </p>

                <p style={{ marginBottom: '12px' }}>
                  Ce cycle permet à chacun d'apprendre à aimer, à comprendre, puis à agir concrètement pour le bien de tous.
                </p>

                <p style={{ marginBottom: 0, fontStyle: 'italic', color: 'var(--accent)' }}>
                  Pour mieux comprendre ces fêtes, imaginez une grande respiration collective : en avril nous inspirons de la bienveillance, en mai nous y ajoutons de la réflexion, et en juin nous expirons cette force pour construire un monde plus uni.
                </p>
              </div>

              {FESTIVALS.map(festival => (
                <div key={festival.id} className="vulgarisation-block" style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                    <Sparkles size={18} color="var(--accent)" />
                    <div style={{ flex: 1 }}>
                      <span className="phase-name" style={{ fontSize: '16px', color: 'var(--text-main)' }}>{festival.name}</span>
                      {festival.date2026 && (
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                          📅 {festival.date2026}
                        </div>
                      )}
                    </div>
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
        <TabButton id="cosmosophie" icon={<BookOpen size={20} />} label="Cosmosophie" />
        <TabButton id="inspiration" icon={<Quote size={20} />} label="Inspiration" />
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
