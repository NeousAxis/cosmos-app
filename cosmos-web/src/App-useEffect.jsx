const [energyMode, setEnergyMode] = useState('individuel'); // 'individuel' | 'global'
const [isLoadingAI, setIsLoadingAI] = useState(false);

useEffect(() => {
    const loadContent = async () => {
        const s = getMeditationSign();
        const p = getCurrentPhase();
        setSign(s);
        setPhase(p);

        // Toujours essayer de générer avec l'IA d'abord
        setIsLoadingAI(true);
        try {
            const aiContent = await generatePhaseContent(
                s.name,
                s.phrase_evolutive,
                s.note_cle,
                p.id,
                p.name
            );

            if (aiContent) {
                setPhaseContent(aiContent);
            } else {
                // Fallback sur contenu statique
                if (s && s.phases_content && s.phases_content[p.id]) {
                    setPhaseContent(s.phases_content[p.id]);
                } else {
                    setPhaseContent({
                        lecture_reel: "Contenu à venir...",
                        lecture_energetique: "Contenu à venir...",
                        epreuve: "...",
                        action: "..."
                    });
                }
            }
        } catch (error) {
            console.error('Erreur IA:', error);
            // Fallback sur contenu statique
            if (s && s.phases_content && s.phases_content[p.id]) {
                setPhaseContent(s.phases_content[p.id]);
            } else {
                setPhaseContent({
                    lecture_reel: "Contenu à venir...",
                    lecture_energetique: "Contenu à venir...",
                    epreuve: "...",
                    action: "..."
                });
            }
        } finally {
            setIsLoadingAI(false);
        }
    };

    loadContent();
}, []);
