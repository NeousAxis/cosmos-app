import { useState, useEffect } from 'react';
import './index.css';
import { SIGNS } from './data/signs';
import { FESTIVALS } from './data/festivals';
import { COSMOSOPHIE_SECTIONS } from './data/splendeur';
import { getMeditationSign } from './utils';
import { getPhaseForDate } from './data/calendar';
import { getMoonTrend } from './services/astronomy';
import { CONTENTS_DB } from './data/contents_db';
import Meditation from './components/Meditation';
import Constellation from './components/Constellation';
import CosmosLogo from './components/CosmosLogo';
import Calendar from './components/Calendar';
import CosmosophieContent from './components/CosmosophieContent';
import MoonPhase from './components/MoonPhase';
import { Sparkles, BookOpen, Calendar as CalendarIcon, Feather, Quote, Bell, Settings } from 'lucide-react';
import { CAPRICORN_QUOTES } from './data/quotes';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  /* --- ÉTAT INITIAL INTELLIGENT --- */
  const [sign, setSign] = useState(() => {
    const now = new Date();
    // FIX 28 DEC 2025 -> CAPRICORNE (Demande utilisateur force)
    if (now.getDate() === 28 && now.getMonth() === 11 && now.getFullYear() === 2025) {
      return SIGNS.find(s => s.id === 'capricorn') || SIGNS[0];
    }
    // Sinon on laisse faire le useEffect, valeur par défaut
    return SIGNS[0];
  });

  const [phase, setPhase] = useState(() => {
    const now = new Date();
    // FIX 28 DEC 2025 -> Intégration
    if (now.getDate() === 28 && now.getMonth() === 11 && now.getFullYear() === 2025) {
      return {
        id: 'integration',
        name: 'Intégration',
        start: '2025-12-28',
        end: '2026-01-03'
      };
    }
    return { id: 'alignement', name: 'Alignement', start: null, end: null };
  });

  const [activeTab, setActiveTab] = useState('energie');
  const [isMeditationOpen, setIsMeditationOpen] = useState(false);
  const [phaseContent, setPhaseContent] = useState({});
  const [energyMode, setEnergyMode] = useState('individuel');

  /* --- CHARGEMENT DES DONNÉES (AUTO + MANUEL) --- */
  useEffect(() => {
    // 1. Déterminer la date du jour
    const now = new Date();
    const currentYear = now.getFullYear().toString();

    // 2. Récupérer la phase active depuis le calendrier perpétuel
    let activePhase = getPhaseForDate(now);

    // FIX RADICAL RETIRÉ - Retour à la logique dynamique
    // activePhase est déterminé par getPhaseForDate(now) ci-dessus

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
        // Si c'est le fix Sagittaire de 2024 qu'on a ajouté récemment, on essaie de le charger
        // Mais CONTENTS_DB a une entrée "2024".
        if (CONTENTS_DB["2024"] && CONTENTS_DB["2024"][activePhase.signId] && CONTENTS_DB["2024"][activePhase.signId][activePhase.phaseId]) {
          setPhaseContent(CONTENTS_DB["2024"][activePhase.signId][activePhase.phaseId]);
        } else {
          setPhaseContent({
            lecture_reel: "Le contenu pour cette phase n'est pas encore disponible.",
            lecture_energetique: "...",
            epreuve: "...",
            action: "..."
          });
        }
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

  /* --- CALCUL DYNAMIQUE DU POURCENTAGE --- */
  const getPhasePercentage = () => {
    if (!phase || !phase.start || !phase.end) return '0%';

    const start = new Date(phase.start).getTime();
    // La date de fin est inclusive (fin de la journée), on ajoute donc 1 jour pour le calcul
    const endRaw = new Date(phase.end);
    const end = new Date(endRaw.getTime() + 86400000).getTime();

    const now = new Date().getTime();

    if (now >= end) return '100%';
    if (now <= start) return '0%';

    const total = end - start;
    const elapsed = now - start;
    let p = Math.round((elapsed / total) * 100);

    if (p < 0) p = 0;
    if (p > 100) p = 100;

    return `${p}%`;
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
                  <span className="section-title" style={{ marginBottom: 0 }}>PHASE LUNAIRE</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MoonPhase phaseId={phase.id} percentageStr={getPhasePercentage()} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>{getPhasePercentage()}</span>
                  </div>
                  <span className="phase-name">
                    {phase.name} <span style={{ opacity: 0.6, fontWeight: 400 }}>· {getMoonTrend()}</span>
                  </span>
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
                  <button
                    onClick={() => setEnergyMode('symbolique')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      border: 'none',
                      background: energyMode === 'symbolique' ? 'var(--text-main)' : 'transparent',
                      color: energyMode === 'symbolique' ? '#fff' : 'var(--text-muted)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Lecture Symbolique
                  </button>
                </div>
              </div>

              {/* Suppression du lien texte inutile */}

              {energyMode === 'symbolique' ? (
                /* Contenu Mode Symbolique */
                <div style={{ animation: 'fadeIn 0.3s ease', textAlign: 'left' }}>

                  {/* --- Partie Poétique (Style "Splendeur") --- */}
                  <div style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>

                    {/* Citation Top Centrée */}
                    <div style={{
                      fontFamily: 'Playfair Display',
                      fontStyle: 'italic',
                      fontSize: '16px',
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      marginBottom: '32px',
                      padding: '0 20px'
                    }}>
                      "{sign.intro_splendeur.split('.')[0]}."
                    </div>
                    <div style={{ width: '40px', height: '1px', background: 'var(--text-muted)', margin: '0 auto 40px' }} />

                    {/* Texte Intro */}
                    {sign.intro_splendeur && (
                      <div style={{
                        marginBottom: '40px',
                        fontFamily: 'Playfair Display',
                        fontSize: '19px',
                        lineHeight: '1.6',
                        textAlign: 'left',
                        color: 'var(--text-main)'
                      }}>
                        {sign.intro_splendeur}
                      </div>
                    )}

                    {/* L'âme parle (Avec Barre Verticale) */}
                    {sign.parole_ame && (
                      <div style={{
                        position: 'relative',
                        paddingLeft: '32px',
                        borderLeft: '4px solid var(--accent)',
                        fontFamily: 'Playfair Display',
                        fontSize: '19px',
                        fontStyle: 'italic',
                        lineHeight: '1.8',
                        color: 'var(--text-main)',
                        background: '#f9f9f7',
                        padding: '24px 24px 24px 32px',
                        backgroundColor: 'rgba(0,0,0,0.02)'
                      }}>
                        {(() => {
                          const marker = "L’âme parle ;";
                          if (sign.parole_ame.includes(marker)) {
                            const parts = sign.parole_ame.split(marker);
                            return (
                              <>
                                <strong>{marker}</strong>
                                {parts[1]}
                              </>
                            );
                          }
                          return sign.parole_ame;
                        })()}
                      </div>
                    )}
                  </div>

                  {/* --- Partie Éducative --- */}
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '26px', textAlign: 'center', marginBottom: '8px', marginTop: '0' }}>Symbolique du Signe</h3>
                  <h4 style={{ fontFamily: 'Playfair Display', fontSize: '18px', textAlign: 'center', marginBottom: '40px', fontWeight: 400, color: 'var(--text-muted)' }}>
                    {sign.name} – Énergies, fonctions, effets et ombres
                  </h4>

                  {sign.symbolique_detaillee && (
                    <div style={{ marginBottom: '60px' }}>
                      {(() => {
                        // Nettoyage et splitting intelligent
                        const cleanText = sign.symbolique_detaillee.replace(/^1\. Fonction/, '1. Fonction');
                        const blocks = cleanText.split(/\n\n+/);

                        return blocks.map((block, i) => {
                          const trimmed = block.trim();
                          // Détection des titres : Commence par un chiffre suivi d'un point OU est "Synthèse symbolique"
                          const isTitle = /^\d+\./.test(trimmed) || trimmed.startsWith("Synthèse");

                          if (isTitle) {
                            return (
                              <h5 key={i} style={{
                                fontFamily: 'Playfair Display',
                                fontSize: '20px',
                                fontWeight: 700,
                                color: 'var(--text-main)',
                                marginTop: '32px',
                                marginBottom: '16px'
                              }}>
                                {trimmed}
                              </h5>
                            );
                          } else {
                            return (
                              <p key={i} className="teaching-text" style={{
                                fontFamily: 'Inter',
                                fontSize: '16px',
                                lineHeight: '1.7',
                                marginBottom: '16px',
                                whiteSpace: 'pre-wrap'
                              }}>
                                {trimmed}
                              </p>
                            );
                          }
                        });
                      })()}
                    </div>
                  )}



                </div>
              ) : (
                /* Contenu Mode Individuel / Global */
                (() => {
                  const formatText = (text) => {
                    if (!text) return null;
                    return text.split(/\n\n+/).map((paragraph, index) => (
                      <p key={index} className="teaching-text" style={{ marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
                        {paragraph.trim()}
                      </p>
                    ));
                  };

                  return (
                    <>
                      <div className="teaching-section">
                        <span className="teaching-label">
                          {energyMode === 'individuel' ? 'Ce qui se joue intérieurement' : 'Lecture Énergétique Mondiale'}
                        </span>
                        {formatText(energyMode === 'individuel' ? phaseContent.lecture_reel : phaseContent.lecture_energetique || "Contenu global à venir...")}
                      </div>

                      {energyMode === 'individuel' && (
                        <>
                          <div className="teaching-section">
                            <span className="teaching-label">Ce qui est souvent confondu ou résisté</span>
                            {formatText(phaseContent.epreuve)}
                          </div>

                          <div className="action-highlight">
                            <div style={{ marginBottom: '12px', padding: '12px', background: 'rgba(var(--accent-rgb), 0.08)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', display: 'block', marginBottom: '6px' }}>Phrase clé du mois :</span>
                              <p style={{ fontSize: '14px', fontStyle: 'italic', margin: 0, color: 'var(--text-main)' }}>
                                « {sign.note_cle} »
                              </p>
                            </div>
                            <span className="teaching-label">Ce que cette phrase invite à ajuster concrètement</span>
                            {formatText(phaseContent.action)}
                          </div>
                        </>
                      )}
                    </>
                  );
                })()
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
            <section className="vulgarisation-block" style={{ padding: 0 }}>
              <CosmosophieContent
                sections={COSMOSOPHIE_SECTIONS}
                onNavigateToSymbolique={() => {
                  setActiveTab('energie');
                  setEnergyMode('symbolique');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
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
                    <p className="teaching-text" style={{ whiteSpace: 'pre-wrap' }}>{festival.energy}</p>
                  </div>

                  <div className="teaching-section">
                    <span className="teaching-label">Sens Simplifié</span>
                    <p className="teaching-text" style={{ whiteSpace: 'pre-wrap' }}>{festival.meaning}</p>
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

        {activeTab === 'parametres' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <section className="sign-card" style={{ padding: '32px 24px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '24px' }}>Paramètres</h3>
              <p style={{ color: 'var(--text-muted)' }}>Prochainement...</p>
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
        <TabButton id="parametres" icon={<Settings size={20} />} label="Paramètres" />
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
