import React from 'react';

const Title = ({ children }) => (
    <h3 style={{
        fontFamily: 'Playfair Display',
        fontSize: '22px',
        marginTop: '40px',
        marginBottom: '20px',
        color: 'var(--text-main)',
        textAlign: 'center'
    }}>
        {children}
    </h3>
);

const SubTitle = ({ children }) => (
    <h4 style={{
        fontFamily: 'Playfair Display',
        fontSize: '18px',
        marginTop: '32px',
        marginBottom: '16px',
        color: 'var(--text-main)',
        fontWeight: 600
    }}>
        {children}
    </h4>
);

const Text = ({ children }) => (
    <p style={{
        fontFamily: 'Inter',
        fontSize: '15px',
        lineHeight: '1.8',
        marginBottom: '16px',
        color: 'var(--text-main)',
        textAlign: 'justify'
    }}>
        {children}
    </p>
);

const QuoteBlock = ({ children }) => (
    <div style={{
        borderLeft: '3px solid var(--accent)',
        paddingLeft: '20px',
        margin: '30px 0',
        fontStyle: 'italic',
        fontFamily: 'Playfair Display',
        color: 'var(--text-muted)'
    }}>
        {children}
    </div>
);

const List = ({ items }) => (
    <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '20px 0 30px 0',
        textAlign: 'left'
    }}>
        {items.map((item, index) => (
            <li key={index} style={{
                marginBottom: '12px',
                fontSize: '15px',
                lineHeight: '1.6',
                color: 'var(--text-main)'
            }}>
                {item}
            </li>
        ))}
    </ul>
);

const PhaseBlock = ({ title, content }) => (
    <div style={{ marginBottom: '24px', background: 'rgba(0,0,0,0.02)', padding: '20px', borderRadius: '12px' }}>
        <h5 style={{ fontFamily: 'Playfair Display', fontSize: '17px', marginBottom: '8px', marginTop: 0, color: 'var(--accent)' }}>
            {title}
        </h5>
        <p style={{ fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
            {content}
        </p>
    </div>
);

export default function CosmosophieContent({ sections, onNavigateToSymbolique }) {
    return (
        <div style={{ padding: '10px 10px 80px 10px' }}>
            <h2 style={{
                fontFamily: 'Playfair Display',
                fontSize: '28px',
                textAlign: 'center',
                marginBottom: '40px',
                marginTop: '10px'
            }}>
                Les Douze Notes de la Splendeur
            </h2>

            <Text>
                Depuis toujours, les astres jouent un rôle de première importance dans la construction et l’évolution de l’humanité. L’être humain ne cesse de lever le regard en direction du ciel pour comprendre d’où il vient et comment se rendre à destination. Cette science est fondée sur des observations empiriques. Elle a conclu à la naissance de l’astronomie et de l’astrologie.
            </Text>
            <Text>
                Autrefois, ces deux sciences n’en étaient qu’une seule et l’observation de ces combinaisons stellaires était nommée présages. Avec le temps, ces phénomènes naturels ont forgé des croyances et des superstitions. Ces événements propices à la manifestation de certains phénomènes sur la nature continuent pourtant de renseigner les humains. La météorologie est basée sur ce même processus empirique et grâce à la science nous continuons d’affiner nos observations ainsi que les prévisions.
            </Text>
            <Text>
                Pourtant, malgré toute la technologie engagée, nous ne savons toujours pas établir un lien entre les phénomènes météorologiques et les humains. Nous séparons le plan terrestre avec le plan atmosphérique, stratosphérique et cosmique, et considérons que seuls les éléments de la nature sont à l’œuvre. Or, comme tout est lié, tous les plans, les éléments et l’être humain communiquent ensemble. Les planètes et les étoiles dialoguent entre-elles. Tout le cosmos est vivant et cette communication s’applique également avec l’humain au travers des différents organes dans le corps. Comment se tissent les liens et comment tous les mondes communiquent ; nous ne savons pas l’expliquer scientifiquement mais les Sages depuis toujours ont joué le rôle de traducteur de ces grands êtres stellaires.
            </Text>

            <Title>Astronomie et Cosmosophie</Title>

            <Text>
                L’astronomie est devenue une science à part entière tandis que l’astrologie, un rassemblement de croyances autour des phénomènes astronomiques. L’astrologie occidentale a réduit à la seule personnification les messages des astres, pour renseigner l'individu sur ses potentialités et ressources pour obtenir du succès dans ses affaires ou dans sa vie amoureuse. Ceci est une grossière caricature de l’astrologie. Nous parlons ici d’une cosmosophie, d’une sagesse du cosmos au travers duquel le mouvement des étoiles est l'expression d’une conscience universelle agissante.
            </Text>
            <Text>
                Ces cycles interrogent sur la façon dont, nous aussi, nous pouvons y répondre chacun à notre façon et selon notre manière de faire écho au monde. Selon la physique stellaire, la formation des systèmes stellaires et planétaires explique que les humains sont constitués de matière stellaire appartenant à d'autres systèmes solaires que le nôtre. Ces études montrent que la matière qui compose les étoiles et les planètes provient de nuages de gaz et de poussière interstellaires qui se sont effondrés sous l'effet de la gravité.
            </Text>
            <Text>
                La Terre et les humains sont faits de matière conscience et de matières stellaires. Par le biais des mouvements cosmiques des étoiles, il y a la possibilité de comprendre comment nous accompagnons ou résistons à notre manière à l’évolution de la Terre et plus largement, à celle du système solaire. Les conséquences sur la Terre des phénomènes astronomiques engendrent des réactions humaines subtiles, aussi invisibles pour la science qu’elles sont palpables par les personnes rendues sensibles par leur évolution.
            </Text>

            <Title>Le Yoga des Étoiles</Title>

            <Text>
                Des civilisations comme l’Égypte ancienne ou encore les Mayas ont construit des cités capables d’entretenir un lien permanent avec ces messagers cosmiques et ainsi, maintenir un équilibre tangible entre le monde physique et métaphysique. En Inde et au Tibet, nous utilisons encore cette grammaire stellaire. Nous limitons notre compréhension du Yoga à notre corps et à nos sensations. Seulement, la voie du Yoga est tellement plus vaste… Son immensité est telle que l’univers, les étoiles, les constellations, tout est Yoga. Ainsi, ce que nous nommons "astrologie" est la science spirituelle des étoiles et à travers elles, c’est l’histoire de la grande Vie qui s’écoule cycle après cycle et nous rappelle à notre destinée collective.
            </Text>
            <Text>
                La cosmosophie est le Hatha cosmique, le Yoga des étoiles. Ces alignements de l'univers sont comme ceux des aiguilles d'une montre. Ils donnent une information pour aligner le monde intérieur avec les événements extérieurs et influencer ainsi le monde de façon positive. L’univers est comme une horloge mécanique qui informe quand, mais aussi pourquoi aligner toutes les dimensions du corps physique, émotionnel et mental pour soutenir et concourir à la divine floraison de la conscience.
            </Text>
            <Text>
                L’astrologie spirituelle révèle l'intelligence organique de tous ces mouvements cosmiques. Ces alignements sont tout sauf anodins. Ils sont le fondement de l’organisation des cycles de la vie sur la Terre et au-delà.
            </Text>

            <QuoteBlock>
                De la même façon que les pommiers ont la nécessité de produire des pommes, l’humain plonge par nécessité dans le mystère de la vie pour en révéler la splendeur. Ces connexions sont sublimes et révèlent l’immense intelligence de la Vie.
            </QuoteBlock>

            <Title>Les Quatre Temps Spirituels</Title>

            <Text>
                Le Soleil, dans une tension cosmique, canalise l’énergie de chaque étoile de la constellation alignée avec lui. Cette énergie distribuée sur la Terre a pour conséquence de créer un environnement propice à matérialiser des défis humains importants mais apporte aussi des ressources pour y répondre.
            </Text>

            <PhaseBlock
                title="1. Alignement Spirituel"
                content="Le premier quartier de lune se rapporte au début d'un alignement avec l’une des douze constellations. Pour l’humain, c’est le temps de l’écoute, du silence pour que se réalise un alignement intérieur, un ajustement souterrain. Ce temps est comparable à la saison d’hiver qui laisse apparaître un endormissement extérieur, pendant que la nature organise sous le froid et la neige, sa future apogée. C’est une prise de contact avec l’émergence de la nouvelle énergie."
            />

            <PhaseBlock
                title="2. Contact Spirituel"
                content="La pleine lune est l’apogée du contact spirituel avec l’énergie de la constellation sur la Terre. C’est un temps d’éclosion semblable à la saison du printemps, un paroxysme immédiat où tout explose et où se libèrent les parfums et les couleurs. Le contact spirituel est si puissant que de grandes marées soulèvent les océans. L’eau est le symbole de la sensibilité astrale cosmique et humaine. Ce moment peut apporter beaucoup d’inconforts et d’incompréhensions ou au contraire, si on est conscient ou correctement alignés, ce sont de grandes visions et des évidences intérieures."
            />

            <PhaseBlock
                title="3. Distribution Spirituelle"
                content="La lune s’est déplacée de l’axe et ouvre ainsi le champ pour que l’énergie de la constellation se déverse plus largement encore. À travers une certaine tension maintenue constamment, l’humanité est soumise à un certain stress. Ceci incite toutes les individualités à agir. Cette énergie est comparable à la saison de l’été. L’exposition soutenue des fleurs au soleil laisse maintenant sortir les fruits juteux prêts à être consommés. Le fruit doit être mangé, l’action doit être engagée."
            />

            <PhaseBlock
                title="4. Intégration Spirituelle"
                content="Lorsqu’il est question de la nouvelle lune, nous parlons d’une intégration de l’énergie en activité. Cela passe par tout le tissu cellulaire terrestre, humain, animal, végétal et minéral. Toute la trame de la vie sur Terre digère le fruit consommé. L’énergie distribuée est aspirée dans le substrat de la matière humaine et forme l’expérience. Maintenant, c’est l’automne et la feuille de l’arbre se meurt recroquevillée, sa couleur jaune orangé et ses pointes brûlées révèlent l’ardeur de la vie."
            />

            <div style={{ textAlign: 'center', margin: '40px 0', fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '16px', color: 'var(--accent)' }}>
                Alignement spirituel : Silence - Intention<br />
                Contact spirituel : Intuition - Vision<br />
                Distribution spirituelle : Action - Parole<br />
                Intégration spirituelle : Mort - Accueil
            </div>

            <Title>Anatomie Sacrée</Title>

            <Text>
                Il n’existe pas de postures physiques ou asanas qui s’accorderaient avec le mouvement unifié des étoiles, Nous ne ferions que copier grossièrement l’univers tandis qu’il vit déjà en nous. Selon les enseignements traditionnels, les douze signes astrologiques correspondent à différentes parties du corps humain :
            </Text>

            <List items={[
                "Le Bélier est relié à la tête",
                "Le Taureau au visage",
                "Les Gémeaux à la gorge et aux épaules",
                "Le Cancer aux poumons",
                "Le Lion au cœur",
                "La Vierge à l'estomac",
                "La Balance au nombril",
                "Le Scorpion aux organes génitaux et au rectum",
                "Le Sagittaire aux cuisses",
                "Le Capricorne aux genoux",
                "Le Verseau aux mollets",
                "Les Poissons aux pieds"
            ]} />

            <Text>
                En comprenant ces correspondances, on saisit que les principes de l'astrologie sont inscrits dans notre anatomie. Nos jambes représentent les deux piliers sur lesquels repose l'arche de la sagesse. Ces temples existent dans les replis de la matière de votre cerveau, de votre palais, de votre cage thoracique, et dans les circonvolutions de votre estomac et intestins.
            </Text>

            <Title>Dualité et Unité</Title>

            <Text>
                Ces mouvements cosmiques agissent par cycles ou révolutions, ils mettent en friction toutes les dualités que nous retrouvons dans toutes les sagesses ancestrales. L’apprentissage à se rencontrer, à se connaître soutient l'évolution de la conscience universelle.
            </Text>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'center', fontFamily: 'Playfair Display', margin: '30px 0', fontSize: '18px', color: 'var(--text-main)' }}>
                <div>Esprit</div><div>Matière</div>
                <div>Vie</div><div>Forme</div>
                <div>Père</div><div>Mère</div>
                <div>Âme</div><div>Corps</div>
                <div>Masculin</div><div>Féminin</div>
                <div>Émetteur</div><div>Récepteur</div>
            </div>

            <Text>
                L'astrologie a pour objectif ancestral d'offrir à l'humanité la possibilité de dialoguer avec le cosmos et comprendre comment l’évolution de notre système solaire se joue aussi au travers de la minuscule destinée atomique de l’être humain. Ces douze messages sonnent comme des notes de musique, elles travaillent à harmoniser tous les opposés.
            </Text>

            <Title>Les Quatre Marqueurs de l'Unité</Title>

            <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '18px', fontWeight: 600, fontFamily: 'Playfair Display', color: 'var(--accent)' }}>
                La Réunion — L'Union — L'Unité — La Synthèse
            </div>

            <Text>
                Ces quatre points de réalisation façonnent la transcendance de la personnalité et l'immanence du cœur. La réalisation de chaque être humain à travers ces quatre points participe pleinement à l'évolution et l'accomplissement de la Terre.
            </Text>

            <Title>Les Signes de l'Incarnation</Title>
            <Text>Par la sagesse du cosmos, nous apprenons qu'il y a quatre signes qui préparent à la venue et à l’activité dans la famille humaine :</Text>
            <List items={[
                "Par le Bélier, l’âme développe le mental",
                "Par le Taureau, l’âme développe le désir",
                "Par les Gémeaux, l’âme développe la conscience de la dualité",
                "Par le Cancer, l’âme incarne les besoins et ressources de la famille humaine"
            ]} />

            <Title>Les Signes de l'Aspirant</Title>
            <Text>Une fois l'âme pleinement incarnée dans la pesanteur de la matière :</Text>
            <List items={[
                "Par le Bélier, l'être humain plie le mental à son besoin",
                "Par le Taureau, il connaît le premier trait de lumière spirituelle",
                "Par les Gémeaux, il comprend l’immortalité sur sa condition humaine et mortel",
                "Par le Cancer, il découvre la nature universelle de toute chose"
            ]} />

            <Title>Les Signes d'Épreuves</Title>
            <Text>Qui viennent éprouver l’aspirant pour l’accomplissement :</Text>
            <List items={[
                "Par le Lion, un individu conscient de lui-même devient capable de sortir de la masse",
                "Par la Vierge, il réalise le Christ potentiel",
                "Par la Balance, il équilibre les pairs opposés",
                "Par le Scorpion, devient possible le dépassement de l’illusion"
            ]} />

            <Title>Les Signes de l'Accomplissement</Title>
            <List items={[
                "Par le Sagittaire, devenir l’archer qui va droit au but",
                "Par le Capricorne, maîtriser et agir aussi bien depuis l’âme que sur le plan de la matière",
                "Par le Verseau, il devient un Serviteur du monde",
                "Par les Poissons, il devient un Sauveur du monde"
            ]} />

            <Title>Questionnements pour l'Apprenti</Title>

            <PhaseBlock
                title="Existence et Affirmation"
                content="En quoi, ce que je crois, je dis ou je fais est important pour exister ? Si par exemple je crois que la liberté est la chose la plus essentielle pour moi, comment cette croyance me permet d'exister ? Cette question peut aussi être posée pour les autres afin de comprendre ce qui les motive."
            />
            <PhaseBlock
                title="La Voie de l'Âme"
                content="Quelle voie est la mienne ? Que souffle l’âme à mon oreille ? Quelle corde à mon arc (quelle capacité, quel talent ou don) laisse résonner la note du vrai Soi ? Quel chemin est le plus adapté à me libérer pour exprimer mon savoir être et savoir-faire ?"
            />
            <PhaseBlock
                title="Le Service"
                content="Quelles sont les conséquences de mes actes ?"
            />

            <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                <Title>Conclusion</Title>
                <Text>
                    Ces poèmes, médités peuvent apporter la liberté. La liberté est la condition sine qua non pour arpenter l’existence, faire les choix nécessaires et réussir à unir en soi les opposés jusqu’à réfléchir l’éclatante Unité de tout ce qui est. Chaque atome et cellule du corps sont porteurs de l’union de l’origine et de la finalité. Face à la gravité du monde, le seul remède est de jouer par le questionnement à élever sa condition humaine qui est aussi celle de toute l’espèce humaine. Ne pas s’âme-user mais jouer. Jouez à questionner les profondeurs de l’âme jusqu’à l’embrasement de la raison. L’embrasement de la raison permet à l’âme d’accéder au cœur. Si vous ouvrez seulement votre cœur sans la raison, ce seront les émotions qui dicteront votre vie et elle passera continuellement du vacarme de la joie aux mugissements de la tristesse. Vous réagirez à chaque événement par des émotions qui affecteront votre lucidité. De la même façon, si votre raison est enflammée et que le cœur reste fermé alors, la froideur de vos mots apportera partout la douleur.
                </Text>
                <Text>
                    Laissez l’âme imprimer sur votre intellect la partition de la vie. Jouez avec votre instrument cette profonde mélodie, acceptez les fausses notes extérieures tant que la mélodie intérieure sonne juste. Menez votre existence comme l’eau de source qui descend de la montagne et embrassez toutes les opportunités, tous les chocs, tous les fracas et conduisez-les dans le silence de votre cœur ; là ils feront votre fortune.
                </Text>
                <Text>
                    À la fin de votre vie, la seule question à laquelle vous essaierez de répondre sera : ai-je été moi ? Car au bout du moi, il y a l’autre qui est aussi une autre facette de moi et ensemble nous sommes les témoins rassemblés de l’Un. Vous percevrez alors la qualité des liens que vous avez tissés durant votre existence. Mais aussi la qualité de votre présence, celle que vous avez réservée à la vie et à tous ses instants précieux. Vous percevrez la grâce avec laquelle vous avez accueilli ce qui s’est présenté à vous puisque vous en êtes l’auteur. Et enfin, la simplicité que vous aurez appliquée à votre existence pour la rendre légère. Il s’agit d’une légèreté menée sérieusement comme celle du papillon sur la fleur qui accède à son nectar mais n’en prend qu’une infime quantité.
                </Text>
                <QuoteBlock>
                    Que le déploiement des vertus de votre cœur réveille le monde. Que la Lumière qui émane de vous façonne l’existence. Que la bonne volonté soit à la base de vos pensées et l’amour à la base de vos actions. Chercher la perfection tout en sachant que le chemin est imparfait. C’est là la vertuosité.
                </QuoteBlock>
            </div>

            <QuoteBlock>
                Voici douze poèmes issus de méditations où certaines aspirations furent offertes au travers des énergies astrologiques. Vous êtes invités à les lire, à laisser les mots et les formules invocatoires vous traverser et inspirer en vous une pensée, une émotion, une aspiration.
            </QuoteBlock>

            <div style={{ marginTop: '40px', textAlign: 'center', background: 'rgba(0,0,0,0.03)', padding: '32px 20px', borderRadius: '16px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'var(--text-main)', marginBottom: '24px', lineHeight: '1.6' }}>
                    Chaque mois, retrouvez le signe de la Roue Cosmique accompagné d'une lecture approfondie de l'énergie mensuelle.
                </p>
                <button
                    onClick={onNavigateToSymbolique}
                    style={{
                        background: 'var(--accent)',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '30px',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(var(--accent-rgb), 0.3)',
                        marginBottom: '0',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    Lecture Symbolique
                </button>
            </div>

            <div style={{ margin: '60px 0 20px 0', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '22px', marginBottom: '16px', color: 'var(--text-main)' }}>Les Douze Notes de la Splendeur</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Retrouvez ci-après dans une version poétique inspirée, toutes les énergies de l'année.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {sections && sections.map((section, index) => {
                    // Logique de parsing pour séparer le texte d'intro et la parole de l'âme
                    const splitRegex = /(?:L'|L’)(?:âme|Âme)\s+parle\s*[;:]\s*/i;
                    const parts = section.content.split(splitRegex);
                    const introText = parts[0].trim();
                    const soulText = parts.length > 1 ? parts[1].trim() : "";

                    // Extraction de la première phrase pour l'exergue
                    const firstSentenceEnd = introText.indexOf('.');
                    const quote = firstSentenceEnd > -1 ? introText.substring(0, firstSentenceEnd + 1) : introText;

                    return (
                        <details key={section.id} style={{
                            background: '#fff',
                            borderRadius: '12px',
                            border: '1px solid rgba(0,0,0,0.05)',
                            overflow: 'hidden',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                        }}>
                            <summary style={{
                                padding: '20px 24px',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '16px',
                                color: 'var(--text-main)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                userSelect: 'none',
                                listStyle: 'none'
                            }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'var(--accent)',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    flexShrink: 0
                                }}>
                                    {index + 1}
                                </div>
                                <span style={{ fontFamily: 'Playfair Display', fontSize: '18px', flex: 1 }}>
                                    {section.title}
                                </span>
                                <span style={{ color: 'var(--accent)', fontSize: '20px' }}>+</span>
                            </summary>

                            <div style={{ padding: '0 24px 32px 24px', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
                                {/* Citation en exergue */}
                                <div style={{
                                    fontFamily: 'Playfair Display',
                                    fontSize: '18px',
                                    fontStyle: 'italic',
                                    textAlign: 'center',
                                    color: 'var(--text-muted)',
                                    margin: '32px 0 24px 0',
                                    padding: '0 20px',
                                    lineHeight: '1.6'
                                }}>
                                    "{quote}"
                                </div>

                                <div style={{ width: '40px', height: '1px', background: 'var(--accent)', margin: '0 auto 32px auto' }}></div>

                                {/* Texte Principal */}
                                <p style={{
                                    fontFamily: 'Playfair Display',
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    color: 'var(--text-main)',
                                    marginBottom: '32px',
                                    whiteSpace: 'pre-line',
                                    textAlign: 'justify'
                                }}>
                                    {introText}
                                </p>

                                {/* Bloc Âme Parle */}
                                {soulText && (
                                    <div style={{
                                        background: '#F9F9F9',
                                        padding: '24px',
                                        borderLeft: '4px solid var(--accent)',
                                        borderRadius: '0 8px 8px 0'
                                    }}>
                                        <p style={{
                                            fontFamily: 'Playfair Display',
                                            fontSize: '16px',
                                            lineHeight: '1.8',
                                            color: 'var(--text-main)',
                                            margin: 0,
                                            fontStyle: 'italic',
                                            textAlign: 'justify'
                                        }}>
                                            <strong style={{ fontStyle: 'normal', color: '#000' }}>L'âme parle : </strong>
                                            {soulText}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </details>
                    );
                })}
            </div>
        </div>
    );
}
