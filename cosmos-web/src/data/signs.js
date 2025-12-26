
export const PHASES = [
  {
    id: 'alignement',
    name: 'Alignement',
    desc_short: 'Respiration & Silence',
  },
  {
    id: 'contact',
    name: 'Contact',
    desc_short: 'Répétition & Imprégnation',
  },
  {
    id: 'distribution',
    name: 'Distribution',
    desc_short: 'Rayonnement',
  },
  {
    id: 'integration',
    name: 'Intégration',
    desc_short: 'Ancrage',
  }
];

export const MEDITATION_STEPS = [
  {
    title: "1. ALIGNEMENT",
    subtitle: "(respiration · silence)",
    instructions: [
      "Posture simple, dos droit",
      "Respiration lente et naturelle",
      "Silence total pour déposer le mental"
    ],
    duration: 180 // 3 min
  },
  {
    title: "2. CONTACT",
    subtitle: "(répétition · imprégnation)",
    instructions: [
      "Répétition intérieure de la NOTE CLÉ à chaque inspiration",
      "Écouter le silence entre deux répétitions"
    ],
    duration: 180 // 3 min
  },
  {
    title: "3. DISTRIBUTION",
    subtitle: "(visualisation · rayonnement)",
    instructions: [
      "Visualiser les effets concrets de la note clé",
      "Sur soi, ses proches et le monde"
    ],
    duration: 180 // 3 min
  },
  {
    title: "4. INTÉGRATION",
    subtitle: "(respiration · ancrage)",
    instructions: [
      "Laisser la vision se déposer dans le corps",
      "Retour à une respiration consciente"
    ],
    duration: 60 // 1 min (Total 10 min)
  }
];

export const SIGNS = [
  {
    id: 'aries',
    name: 'Bélier',
    dates: '21 Mars - 19 Avril',
    phrase_evolutive: 'J’avance et je régis depuis le plan mental.',
    note_cle: 'Écouter le silence et laisser émerger la juste direction.',
    intro_splendeur: "De l'Instrument divin résonne la Note sublime et dans le champ universel, fleurissent les mélodies nouvelles.",
    poeme: `De l'Instrument divin résonne la Note sublime et dans le champ universel, fleurissent les
mélodies nouvelles. Ici-bas fleurissent les notes Célestes. Dans le fracas du monde, elles
vibrent et clament les vertus supérieures. Elles manifestent une intention et dessinent une
aspiration où tout s'oriente pour la gloire de la Lumière. Dans ce tumulte chaotique jaillit une
humanité renouvelée.

L'âme parle : Rejoins-moi là où le Silence est éternel et tu verras l'amour avec son
intelligence recouvrir toutes les actions et la beauté dessiner le monde. Place-toi là où
l'agitation de la vallée ne peut t'atteindre, c'est là que ma clarté infinie et ma joie intarissable
demeurent. C'est dans ma Lumière que ta vie s'éclaire et dans ma joie que ton exaltation
soulève la Terre. Accroche-toi à la plus haute note de ton être et dans cet effort, souffle
tendrement sur les pensées et les actions du monde. La plus haute note attire toutes celles
qui pourront l'accompagner pour que chantent toutes les âmes à l'unisson sur la Terre et que
sur elles se reflète la beauté du royaume des Cieux. Inspire dans la contemplation et expire
dans le chaos sans peur, sans doute et sans attachement. Tu es la Lumière dont le monde a
besoin.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'taurus',
    name: 'Taureau',
    dates: '20 Avril - 20 Mai',
    phrase_evolutive: 'Je vois, et quand l’œil est ouvert, tout est lumière.',
    note_cle: 'Ouvrir les yeux, et laisser le cœur orienter mon aspiration.',
    intro_splendeur: "Le Cœur universel rompt sous le poids des sphères supérieures saturées d'amour.",
    poeme: `Le Cœur universel rompt sous le poids des sphères supérieures saturées d'amour. De cette
Symphonie printanière se libèrent les notes de la noble Volonté. Le désir d'union et d'unité
exalte partout sur la Terre. C'est là le chant éternel des fleurs du printemps, il conduit et
soulève tout être vivant vers l'apogée spirituelle ; point culminant de la sexualité sacrée. La
Mélodie céleste claironne tandis que la Note sublime se détache. Le Feu de l'esprit
enflamme la présence de l'être. L'éclatante lumière délivre le troisième œil et ouvre grand la
vision. La Note descend de l'Esprit suprême mais la voix vient du cœur.

L'âme parle : L'harmonie est l'expression du mouvement de la Vie. Enquiers-toi de la
nécessité de l'équilibre afin que dans tes choix transparaisse ma Lumière qui est aussi ta
lumière. De la juste orientation des désirs, entre les deux grandes forces de la nature,
dépend la Lumière qui est déversée sur la Terre. Il ne s'agit pas seulement de comprendre la
nature de tes désirs mais de les orienter aussi vers la Vie et sa réalisation. Mets ton cœur à
l'ouvrage dans chaque pensée et à travers chaque action afin que la bonté délivre de
l'attachement au bien comme au mal. L'espoir peut grandir et la Lumière révéler un plus
grand Dessein. Il n'existe aucun autre lieu pour toi. Tu es toujours là où tu dois être. Tu es
aimé et chéri dans l'abondance comme dans l'adversité. N'ai pas peur, ouvre ton cœur et ton
esprit et aie confiance en Moi. J'accompagne tes pas et soulève les obstacles.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'gemini',
    name: 'Gémeaux',
    dates: '21 Mai - 20 Juin',
    phrase_evolutive: 'Je reconnais mon autre soi et dans l’effacement de ce moi, je grandis et luit.',
    note_cle: 'Mettre en dialogue les opposés dans mes relations.',
    intro_splendeur: "Le cosmos tout entier repose sur les 10 cordes de la perfection, la 5ème vibre la note incandescente de Mercure.",
    poeme: `Le cosmos tout entier repose sur les 10 cordes de la perfection, la 5ème vibre la note
incandescente de Mercure. Cette note souligne l'harmonie de l'union de l'Esprit et de la
matière. Les instruments changent époque après époque mais la mélodie reste et continue
d'exprimer l'éternelle Vérité. L'ancestrale symphonie doit être jouée sur de nouveaux
instruments afin de stimuler le désir de perfection. Là est le secret de l'évolution, renouveler
l'alliance perpétuelle. Dans le cœur, Venus chante l'amour. Des mots, des paroles, un
poème, une musique comme l’incantation cosmique déverse l'esprit de Bonne Volonté sur le
monde.

L'âme parle : Dépose-toi dans le Silence intérieur et laisse la lente respiration guider tes pas
et te conduire à l'équilibre des opposés. Tu trouveras ici, la porte du Cœur. Au sommet de
ton être, reste dans Ma lumière, tiens-toi là et dans cet unique effort je soulagerai tous tes
maux et bien plus encore. Dans l'intelligence du mental apaisé je souffle la Vérité éternelle,
celle que tu connais, même si tu ne sais pas toujours la reconnaître. Tes actions, par l’amour
rendues intelligentes, servent le grand tout. Dans Ma lumière ta pensée est transformée, tes
paroles inspirées et ton monde libéré. Dans Ma lumière ta voix est porteuse de sens et de
beauté, elle guérit ton corps ainsi que le monde. Elle murmure la vérité dans les replis de la
matière. Chante pour élever la matière et pour inspirer les éléments mais chuchote lorsqu'il
est question de l'éclatante vérité. Respire pour animer la vie, de plus de vie encore.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'cancer',
    name: 'Cancer',
    dates: '21 Juin - 22 Juillet',
    phrase_evolutive: 'Je construis une maison illuminée et je l’habite.',
    note_cle: 'Habiter pleinement les espaces de ma vie et respecter la distance de chaque relation.',
    intro_splendeur: "Que le Souffle Un et indivisible habite la forme. Que la Note résonne.",
    poeme: `Que le Souffle Un et indivisible habite la forme. Que la Note résonne. Que la Trompe
merveilleuse gronde et enflamme les éléments jusque dans les abysses. Que chaque
conscience se réveille et chante les louanges éternelles. Que ton Nom soit sanctifié. Les
particules vibrent, les atomes chantent, les organismes se regroupent par section et tous
ensemble, ils s’accordent, jouent leur partition et participent ainsi à la symphonie au grand
Dessein.

L’Âme parle : Tu es de Nature spirituelle, ne l'oublie jamais. Ta vérité est éternelle et
cependant c’est ici-bas, dans la matière que tu dois vivre et exister, penser et agir, vibrer et
rayonner Ma lumière qui est aussi Ta Lumière. Retire-toi dans le Souffle ardent et apprends
de Lui.
Observe comment il organise et contribue à maintenir l’équilibre.
L'effort à maintenir l'équilibre apporte l'harmonie.
L'harmonie apporte la constance.
La constance apporte l'éveil.
Observe comment le Souffle fait chanter les atomes de ton corps, qui sont aussi ceux du
Monde. Voit, il n’y a ni intérieur, ni extérieur, seulement la conscience Une et Indissoluble.
C’est ici que se trouve ta véritable Maison. En réalisant cela, ce que tu construis à chaque
instant n’appartient ni au ciel, ni à la Terre mais à l’éternité. Autrefois, il était demandé
d’installer “le Royaume de Dieu sur Terre”. Réalise maintenant que ces deux ne sont qu’Un
et qu’habiter ce Monde consiste à cesser de vouloir rejoindre un ailleurs car il n’existe qu’ici
et maintenant. Tu es le royaume, le Roi et ses sujets. Toutes ses choses avec lesquelles tu
es en relation sont des fragments de toi séparés dans l’illusion du temps et de l’espace. La
musique de l’âme a le pouvoir de façonner le monde. Tu es bien plus grand que tu ne le
penses et cependant, lorsque tu te reposes sur les formes du monde, tu es plus fragile que
tu ne l’imagines. Ta force réside dans ton cœur lorsqu’il est sous la puissance de l’Âme.
C’est Elle qui clarifie ton mental et le vitalise. Cette coordination entre l’Âme, le mental et le
cœur est appelée “le mental de Cœur”, il permet la transformation et l’illumination de tous les
aspects de l’existence. Habite ton foyer, ton cercle amical, social, professionnel et
environnemental. Habite le monde dans ta Lumière car c’est aussi Ma Lumière.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'leo',
    name: 'Lion',
    dates: '23 Juillet - 22 Août',
    phrase_evolutive: 'Je suis Cela et Cela c’est moi.',
    note_cle: 'Assumer pleinement qui je suis, sans me confondre avec mon image.',
    intro_splendeur: "Je suis le musicien, l’instrument et la mélodie. Des trois, qui est le véritable créateur ?",
    poeme: `Je suis le musicien, l’instrument et la mélodie. Des trois, qui est le véritable créateur ?
Le musicien qui fait jouer ses doigts ? Est-ce l’instrument qui inspire et appelle les notes par
sa forme, son matériau et ses aspérités ? Ou encore la mélodie qui pour être jouée et
entendue a réuni le musicien et l’instrument ? Où se situent le début et la fin ?
Depuis le Néant insonore expire une symphonie. Le musicien et l’instrument issus eux aussi
du Néant sont irrésistiblement attirés l’un vers l’autre. Ensemble, ils jouent la mélodie. C’est
un monde qui se crée, un univers qui s’étire. Du Néant, je suis la mélodie, le musicien et
l’instrument. Je suis Un et trois à la fois. Étant Un, je suis invisible mais les trois te sont
visibles.

L’âme parle : Écoute la chaleur de l’été, le chant des oiseaux et le son de l’eau. Je suis tout
cela à la fois. Je ne suis pas la chaleur mais la chaleur est moi aussi. Je ne suis pas les
oiseaux mais les oiseaux sont moi aussi. Ne me réduit pas à un aspect. Je suis Un dans le
multiple et c’est pourquoi je suis tout cela et que tout l’ensemble est moi. Il n’y a pas de
séparation mais des aspects différents de moi qui me permettent de déployer la conscience
de moi-même, de mon amour dans toutes les courbures de la matière et au-delà.
Toutes les notes que tu te décides à jouer sont les miennes. Choisis de les assembler
comme bon te semble, c’est toujours à moi qu’elle ressemble, en moi qu’elles se dispersent
et se rassemblent. N’ai pas peur de jouer ta partition, elle porte ma prophétie à l’unisson.
Affirme, dans le temps et l’espace qui t’appartiennent, ton désir d’être car c’est de là que tu
tires ma force. Souffle la vie et laisse gronder le cor qui est aussi ton corps. Jouis de la joie
d’habiter ici et partout, dans l’Un comme dans le multiple. Vois que dans l'individualité, réside
l’indivisible. L’Un divisible rend visible l’Un-dispensable, dispense l’Un au travers du masculin
et du féminin qui te façonnent. N’ai pas peur d’affirmer ta beauté, ta magnificence car c’est
moi que tu fais rayonner. Au travers de moi, tu t’épanouis plus largement et éblouis sur le
monde ma splendeur. Souviens-toi que tu es la victoire sur la gravité, la grâce sur le drame.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'virgo',
    name: 'Vierge',
    dates: '23 Août - 22 Septembre',
    phrase_evolutive: 'Je suis la mère et l’enfant, je suis Dieu, je suis matière.',
    note_cle: 'Laisser émerger la vie en moi et oser l’extérioriser.',
    intro_splendeur: "À la lisière des mondes mystérieux gronde le grand rassemblement. Le temps est venu pour l’œuvre d’être révélée.",
    poeme: `À la lisière des mondes mystérieux gronde le grand rassemblement. Le temps est venu pour
l’œuvre d’être révélée. Le néant d’où procède ce vide est fécond une fois encore, et encore
une fois, la révélation aura lieu. Que le vide révèle la forme de son contenant. Alors, dans
une clameur céleste, la matière renouvelée réfléchit l’éclat de Dieu.
Je suis créativité et enfantement.
Je suis puissance délivrée, liberté renouvelée
Je suis arbre et fruit, océan et pluie.
Je suis vigne et vin, boulanger et pain.
Je suis Un dans le multiple et le multiple est le Tout.
Je souffle la vie dans les cellules de ma propre matière et j'en révèle la beauté. Dans les plus
bas atomes de la matière, vibre la note de l'éternité. Cet écho est le cosmos, sa vibration est
la Vie dissimulée dans la vie. Je suis la splendeur constellée et je réveille le souvenir infini de
la Vérité. Tend l’oreille vers l’infini.

L'âme parle : Observe l’éternité en toute chose et voit la renaissance de chaque instant. La
régénérescence régénère le sens, elle affirme la direction de ta destinée. Toute mort est
liberté, toute naissance est une volonté, un cheminement libre. Il n'y a pas d’autre prison que
celle des émotions qui troublent la vision et du voile mental qui cherche des solutions. Arrive
le temps où la flamme libère sa lumière, où le feu ardent de la vie libère les étincelles, où le
plomb se change en or. Les étincelles qui se détachent du feu ne cherchent pas à s’en
libérer mais à l’élargir. La transformation est lucidité. La voie s'ouvre et le chemin est éclairé.
Tu es déjà libre. Tu peux vivre maintenant cette liberté. Agit avec ce que tu es ici et
maintenant. Prends, attrape, conquière car tout est déjà à toi mais aussi donne, offre, délivre
car tu n’es propriétaire de rien. La puissance de la vie se tient en toi, utilise-la pour le Bien, le
Beau et le Vrai puis, laisse-la continuer son chemin et enrichir le cosmos. Tu es le parent de
tes pensées, de tes paroles et de tes actions, elles poursuivent leur chemin et engendre
leurs propres enfants. En toi les fiançailles célestes se renouvellent dans une constance
absolue et ne cessent de procréer. Lâche les chaînes du passé, que les vieilles scories se
détachent. Laisse la beauté à travers-toi être enfantée, c’est le fruit de ton essence divine.
Ton action ne consiste pas à résoudre la dualité dans la matière, mais à la vivre avec
sagesse et lucidité. Là résident harmonie et transformation.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'libra',
    name: 'Balance',
    dates: '23 Septembre - 22 Octobre',
    phrase_evolutive: 'Je choisis la voie qui passe entre les deux grandes lignes de force.',
    note_cle: 'Apprendre à danser avec le déséquilibre.',
    intro_splendeur: "Étiré dans toutes les directions, le Silence s’est déployé jusqu’à devenir Cosmos.",
    poeme: `Étiré dans toutes les directions, le Silence s’est déployé jusqu’à devenir Cosmos, il vibre la
Note suprême. Tout resplendit l’Unité de la conscience et dans son rayonnement l’ombre et
la lumière ont émergé. Cet éclat libère joyeusement les couleurs ainsi que les nombreux
contrastes et nuances. Leurs activités doivent permettre la révélation constante de l’Unité.

L’âme parle : Le choix est l’apprenti-Sage à l’équilibre des opposés. Cependant, si tu
continues de choisir entre l’ombre et la lumière, tu resteras vivre dans les replis de la
matière, isolé du centre et continuellement bousculé d’une souffrance à une autre. Lève le
regard et choisit “la voie qui mène entre les deux grandes lignes de forces.” Si tu dois faire
un choix, que celui-ci soit l’Unité et que dans cette union, les éléments exercent leur plein
pouvoir. Puisse l’air balayer toutes les poussières anciennes et que la matière ainsi dégagée
laisse apparaître les nouveaux espaces à conquérir. Puisse l’eau nettoyer les surfaces
jusqu’à les rendre lisses et prêtes à de nouvelles fonctions, et que le feu purifie la matière
jusqu’à la rendre digne, droite, debout. Ainsi, l’âme, la Lumière de l’éternité façonne la
matière telle un diamant au travers duquel elle resplendit son Image.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'scorpio',
    name: 'Scorpion',
    dates: '23 Octobre - 21 Novembre',
    phrase_evolutive: 'Je suis le guerrier et je sors triomphant de la bataille.',
    note_cle: 'Oser mourir à ce qui me gouverne.',
    intro_splendeur: "La douceur de la mélodie céleste pousse inlassablement toutes les afflictions dans la lumière.",
    poeme: `La douceur de la mélodie céleste pousse inlassablement toutes les afflictions dans la
lumière. À l’apogée extatique de la symphonie entre le ciel et la Terre, la note la plus haute
résonne et appelle à un soulèvement total.

L’Âme parle ; N’ai pas peur de la guerre et laisse le Son primordial souffler à travers ton
instrument. Laisse la lumière de chaque note absorber le mal.
Installe-toi dans les replis de ma tendre Lumière, continue de proclamer mon Nom et je serai
là. Je te protègerai. Mais tu dois faire le premier pas, avancer et demander l’aide nécessaire.
Ne combat pas les ténèbres dont tu n’as pas su empêcher l’émergence. Laisse la matière
visqueuse être aspirée dans la musique des Sphères. Offre-moi ta peur et je la consumerai
dans le Feu des cœurs réunis. Prends le temps du retrait et calme toute ardeur funeste.
C’est la Vie qui aspire la mort et non l’inverse. Prends ta respiration au plus profond de ton
être, là où je demeure et continue d’affirmer la Bonté, la Beauté et la Vérité comme seule et
unique voie de libération. Que ta flamme irradie maintenant dans le Feu de la vie.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'sagittarius',
    name: 'Sagittaire',
    dates: '22 Novembre - 21 Décembre',
    phrase_evolutive: 'Je vois le but, j’atteins ce but et j’en vois un autre.',
    note_cle: 'Laisser la vision éclairer le chemin et ajuster avec lucidité mes choix.',
    intro_splendeur: "L’archer du Violoniste reste suspendu. La dernière note s’étire jusque dans les profondeurs du Silence.",
    poeme: `L’archer du Violoniste reste suspendu. La dernière note s’étire jusque dans les profondeurs
du Silence. A cet instant, l’union de l’audience avec l’œuvre est totale. Le Musicien, son
instrument et l'Œuvre ne sont plus qu’Un.

L’âme parle ; Le Silence précède tout commencement. Dans le Silence, la totalité du cosmos
se construit et se coordonne harmonieusement. La note la plus pure jaillit du Silence et
ensemence une mélodie prochaine. Ne disperse plus ton énergie à construire le silence
autour de toi. Le Silence est toujours là, dans ton cœur. Installe-toi en lui et rend grâce à
l’instant car c'est en Moi que le Silence règne. Ici-bas, la suprême intelligence révèle son
plus précieux secret et inspire la totalité de l’Œuvre. Ouvre ton esprit plus largement que
l'horizon et souviens-toi que c'est l'Œuvre qui donne corps au Musicien. Le Musicien en
s'accordant avec le cœur du Cœur façonne l'instrument et joue la musique du cosmos.
Les notes qui émanent alors depuis le Silence unifié, enflamment l’Univers.
Chaque note a sa place dans la Partition céleste. Dans cette nouvelle alliance jaillit une
mélodie à venir. Prépare ton instrument à de nouvelles harmonies. Par le Souffle inspiré
dans le Feu souterrain tout s’érige irrésistiblement vers le souvenir du futur Triomphe déjà
accomplie.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'capricorn',
    name: 'Capricorne',
    dates: '22 Décembre - 19 Janvier',
    phrase_evolutive: 'Je suis perdu dans la lumière suprême, et pourtant je tourne le dos à cette lumière.',
    note_cle: 'Passer du contrôle à la maîtrise par une écoute profonde de l’intuition.',
    intro_splendeur: "Au Capricorne, les Cornes soufflent la Victoire et dans la toute Lumière resplendit le Triomphe.",
    poeme: `Au Capricorne, les Cornes soufflent la Victoire et dans la toute Lumière resplendit le Triomphe. Au sommet de la Montagne, la Lumière du Cœur vaillant éclaire silencieusement le monde. Épris de sa Sainteté, le chaos est illuminé d'une profonde intelligence.

L’âme parle ; La Bataille continue mais la lutte est terminée. Réjouis-toi d'être arrivé ici mais ne languis pas dans la Lumière. Redescend dans la fosse avec les autres instrumentistes. Au mouvement succède un nouveau mouvement pour que l'hymne du Monde rayonne dans chaque atome. Ton cœur enflammé connaît maintenant la direction. Laisse ton instrument accordé à la plus haute Note de ton cœur expirer la symphonie soufflée par l'Œuvre en création. Grand ouvert en permanence l'Un-connu annonce la Beauté du Monde. Accepte Ma main dans la tienne et laisse-toi guider. L'imprévisible orne de somptueuses lumières le futur inspiré par l'Œuvre. Tu ne peux contrôler la Vie. L'Amour a pris racine en ton cœur et cette Note de Bonté qui résonne est celle de la Vérité. L'imprévisible qui est aussi l'Un-prévisible est ton allié.`,
    phases_content: {
      alignement: {
        lecture_reel: "Je ressens en cette période un appel à la verticalité. Je traverse un moment où le besoin de structure et de silence s'impose, non comme une contrainte, mais comme une nécessité pour tenir debout. Je sens une densité qui me demande de ralentir pour ne pas trébucher.",
        lecture_energetique: "Les vieilles structures hiérarchiques mondiales montrent leurs limites. On observe une tension entre le besoin de règles strictes (sécurité) et l'émergence d'une autorité plus horizontale et intuitive. C'est le moment de repenser nos systèmes de gouvernance.",
        epreuve: "Je confonds souvent ma rigueur avec de la rigidité, ou mon besoin de solitude avec de la froideur. Je lutte contre la peur du vide en remplissant mon agenda.",
        action: "Je décide aujourd'hui d'accepter le silence sans chercher à le combler. Je pose un acte ferme mais doux, qui définit ma limite sans fermer mon cœur."
      },
      contact: {
        lecture_reel: "L'ascension intérieure m'amène à un point de contact précis. Je perçois une clarté nouvelle sur mes objectifs, non plus comme des ambitions, mais comme une responsabilité envers moi-même.",
        lecture_energetique: "Le monde cherche de nouveaux modèles de réussite qui ne soient pas basés sur l'écrasement ou la domination, mais sur l'élévation collective. Les 'sommets' traditionnels (pouvoir, argent) sont questionnés au profit d'une réussite qui a du sens.",
        epreuve: "Je crois devoir tout porter sur mes épaules pour prouver ma valeur. Je résiste par orgueil à demander le soutien nécessaire.",
        action: "Je m'autorise à déléguer ou à partager une charge, reconnaissant que ma force réside aussi dans ma capacité à m'ouvrir."
      },
      distribution: {
        lecture_reel: "Je comprends que le sommet n'est pas une fin, mais un point de départ pour redescendre vers les autres. Je sens l'élan de partager ce que j'ai structuré en moi.",
        lecture_energetique: "C'est l'appel à une redistibution des ressources et des responsabilités. Le 'chef' n'est plus celui qui décide seul en haut de la pyramide, mais celui qui s'assure que la structure sert le bien commun. La notion de service public est réactivée.",
        epreuve: "Je crains que le partage ne me dépossède de mon autorité ou de mes acquis intérieurs.",
        action: "Je choisis de transmettre une compétence ou une vision claire à quelqu'un qui en a besoin, sans attente de retour."
      },
      integration: {
        lecture_reel: "La structure que j'ai bâtie s'ancre maintenant dans ma réalité quotidienne. Je ne cherche plus à contrôler la vie, mais à la laisser me traverser avec maîtrise.",
        lecture_energetique: "Le collectif intègre que la vraie sécurité ne vient pas du contrôle policier ou normatif, mais de la solidité intérieure des individus qui le composent. On passe d'une société de la surveillance à une société de la responsabilité.",
        epreuve: "Je reste attaché à la forme ancienne de mes habitudes, refusant que l'expérience transforme concrètement mon emploi du temps.",
        action: "J'élimine consciemment une activité superflue pour honorer l'essentiel qui s'est révélé à moi."
      }
    }
  },
  {
    id: 'aquarius',
    name: 'Verseau',
    dates: '20 Janvier - 18 Février',
    phrase_evolutive: 'Je suis l’eau de vie versée pour ceux qui ont soif.',
    note_cle: 'Laisser circuler ce que je sais et ce que je fais, me libère.',
    intro_splendeur: "Réunis en haut comme en bas, la Source de vie étincelante abreuve les profondeurs.",
    poeme: `Réunis en haut comme en bas, la Source de vie étincelante abreuve les profondeurs. Dans
cette union, la coopération au nom de l'Unité, de la Vérité et de l'Amour est toute puissante.
La note “Fa” informe et rappelle la gamme où se joue le vivant. C'est la note du Service pour
l'amour de l'ensemble.

L'âme parle ; Écoute seulement la vibration au-delà du tumulte discordant du monde. La
pure vibration connaît la finalité sans fin. L'obscurité se construit autour de la Lumière et non
l'inverse. Mais à l'instant où tu perçois que l'obscurité et la lumière sont seulement Une alors
les deux se dissolvent dans une plus grande Lumière. Cette danse infinie combine toutes les
paires opposées de toutes les relations du monde. Toutes les parties, en un seul
mouvement, se conjuguent et ensemble font vibrer tous les plans de la matière. Tu es Un
avec l'ensemble car l'ensemble et toi ne faites qu'Un et seulement Un. Cette séparation entre
toi et Moi qui, autrefois t'a causé tant de souffrance a disparu, tu es le monde et le Monde à
travers toi se joue. Tu es la vie et la Vie à travers toi rayonne.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  },
  {
    id: 'pisces',
    name: 'Poissons',
    dates: '19 Février - 20 Mars',
    phrase_evolutive: 'Je quitte la maison du Père et en revenant, je sauve.',
    note_cle: 'Deviens le guerrier qui guérit.',
    intro_splendeur: "Toutes les symphonies ici s'éteignent pour à nouveau débuter.",
    poeme: `Toutes les symphonies ici s'éteignent pour à nouveau débuter. Lorsque tout est détruit,
lorsque la mort à réaliser son travail, les ultimes fondamentaux de la vie, nourris des
épreuves passées, ensemencent le nouveau monde. Sur la plus haute Note de la plus haute
Corde vibre le premier Son qui imprègne tous les atomes de la matière. Au tréfonds du
calice, le Son primordial murmure et souffle déjà les futures mélodies du monde. La Source
descend des sommets de la Montagne et c'est ici-bas qu'elle abreuve les sols. C'est ici que
la Vie nourrit les nombreuses existences. Que la musique nourrit les nombreuses mélodies
qui, ensemble, forment la Symphonie universelle renouvelée. C’est là la guérison du monde.

L'âme parle ; Dans la Lumière tu as quitté l'instrument divin pour que résonne ta note. Dans
la Lumière tu habites le champ de bataille et dans sa grâce tu te redresses, dans sa grâce tu
unifies et guéris les mondes qui habitent en toi. Car en toi c'est en Moi, en l'Esprit tout
puissant. Le guerrier est celui qui guérit, celui qui porte la Lumière au plus profond des
ténèbres. En coopérant avec tous les opposés selon l'intelligence suprême avec laquelle ils
ont été livrés, tu délivres tes parties encore prisonnières. Mon Reflet, plus sublime alors
resplendit en toi. Mais ceci n'est pas la fin... Ceci n'est que le début, un autre départ pour
une nouvelle aventure pour te mener plus haut dans les sphères de l'humanité. Tu es née du
Corps céleste, c'est sur la Terre et dans la matière que grandit la Lumière des Cieux. En
laissant la Lumière de ton âme rayonner c'est ton humanité que tu fais vibrer. Plus tu es
dans la lumière et plus J'habite le monde, meilleur il devient, plus grandiose il éclaire la
particularité de chacun. Tu as été la maladie, aujourd'hui tu es la guérison.`,
    phases_content: {
      alignement: { lecture_reel: "...", epreuve: "...", action: "..." },
      contact: { lecture_reel: "...", epreuve: "...", action: "..." },
      distribution: { lecture_reel: "...", epreuve: "...", action: "..." },
      integration: { lecture_reel: "...", epreuve: "...", action: "..." }
    }
  }
];
