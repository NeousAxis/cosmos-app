/**
 * BASE DE DONNÉES DES CONTENUS PAR ANNÉE ET PAR SIGNE
 * 
 * Structure :
 * ANNEE -> SIGNE -> PHASE -> { lecture_reel, lecture_energetique, epreuve, action }
 */

const LECTURE_ENERGETIQUE_CAPRICORNE = `La phrase-clé qui éclaire cette transition est :
« Passer du contrôle à la maîtrise par une écoute profonde de l’intuition. »

Cette intuition n’est pas individuelle. Elle est l’expression de la conscience collective du Verseau, une lumière ardente, vive, exigeante, qui traverse les groupes humains et les met face à leur responsabilité. Elle ne rassure pas, elle éclaire avec intensité, révélant ce qui est juste comme ce qui ne l’est plus.

L’énergie du Capricorne permet à cette lumière ardente de se distribuer dans le réel sans se consumer elle-même. Elle la canalise, la structure et la rend opérante, afin qu’elle devienne cadre, décision et action collective. Là où le Verseau apporte l’élan et la vision, le Capricorne apporte la maîtrise nécessaire pour que cette force serve le monde.

Silencieusement, une nouvelle forme d’autorité se met en place. Elle ne s’impose pas par le pouvoir, mais par la cohérence entre ce qui est perçu ensemble et ce qui est mis en œuvre. Elle naît lorsque le groupe accepte de se laisser traverser par cette lumière ardente et d’en assumer collectivement les conséquences.`;

const LECTURE_INDIVIDUELLE_CAPRICORNE = {
    lecture_reel: `Un déplacement profond s’opère entre la volonté de tout tenir, tout organiser, tout anticiper, et la nécessité d’apprendre à faire confiance à une intelligence plus vaste que le mental. Intérieurement, une tension peut apparaître entre le besoin de sécurité, d’efficacité et de maîtrise rationnelle, et l’émergence d’une perception plus fine, plus directe, qui ne passe pas par l’analyse mais par le ressenti juste.

Ce qui se joue n’est pas un lâcher-prise passif, mais un changement de centre de pilotage. L’action ne disparaît pas, elle se décale. Elle cesse d’être guidée par la peur de perdre le contrôle pour s’appuyer sur une écoute attentive de ce qui cherche à se mettre en place à travers toi.`,
    epreuve: `La maîtrise est souvent confondue avec le contrôle. Le contrôle est une réponse aux peurs, peur de l’erreur, du manque, du jugement ou de l’imprévu. Il cherche à verrouiller le réel pour éviter l’incertitude.

La maîtrise, au contraire, devient possible lorsque l’on fait confiance aux compétences que la vie nous a permis de développer au fil des expériences, des réussites comme des échecs. Cette confiance est incarnée, elle repose sur ce qui a déjà été traversé et intégré. Là où le contrôle tente d’empêcher le réel d’advenir, la maîtrise s’appuie sur la capacité à y répondre avec justesse.

La résistance apparaît lorsque l’on doute de cette compétence intérieure et que l’on préfère sur-anticiper plutôt que s’engager pleinement. Écouter l’intuition demande alors un courage particulier, celui de reconnaître que l’on est déjà capable, même sans garantie absolue.`,
    action: `Observer où le contrôle s’exerce par réflexe, agenda saturé, décisions prises trop vite, besoin de tout valider mentalement. À ces endroits précis, ralentir volontairement et créer un espace d’écoute avant l’action, même bref.

Avant une décision importante, poser une question simple et attendre la réponse sans la forcer, est-ce juste maintenant. La réponse ne vient pas sous forme de raisonnement, mais de clarté intérieure, de tension ou de détente.

Ce mois invite à faire moins, mais plus juste, à laisser l’intuition guider la structure plutôt que l’inverse, et à agir en confiance à partir de ce qui est déjà maîtrisé intérieurement.`
};

export const CONTENTS_DB = {
    "2024": {
        "sagittarius": {
            "integration": {
                lecture_reel: "Je sens que l'élan d'expansion touche à sa fin pour se transformer en sagesse. C'est le temps de digérer les horizons explorés pour ne garder que l'essentiel.",
                lecture_energetique: "Le feu du Sagittaire s'intériorise pour préparer la structure du Capricorne. L'enthousiasme laisse place à la maturité.",
                epreuve: "Je suis tenté de fuir vers une nouvelle aventure ou une nouvelle idée sans avoir pris le temps de tirer les leçons de l'expérience qui s'achève.",
                action: "Je prends un moment pour noter une vérité majeure apprise durant ce cycle, avant de passer à l'action suivante."
            }
        },
        "capricorn": {
            "integration": {
                lecture_reel: "Bien que nous soyons dans l'énergie du Capricorne, cette phase d'intégration marque la fin de l'année civile. C'est le moment de synthétiser les leçons de 2024 pour bâtir l'année à venir sur des fondations solides.",
                lecture_energetique: "La structure du Capricorne nous aide à cristalliser nos expériences en sagesse durable.",
                epreuve: "La tentation de juger sévèrement ce qui n'a pas été accompli en 2024.",
                action: "Je célèbre une réussite concrète de cette année, aussi petite soit-elle, comme première pierre de mon édifice 2025."
            }
        }
    },
    "2025": {
        "capricorn": {
            "alignement": { ...LECTURE_INDIVIDUELLE_CAPRICORNE, lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE },
            "contact": { ...LECTURE_INDIVIDUELLE_CAPRICORNE, lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE },
            "distribution": { ...LECTURE_INDIVIDUELLE_CAPRICORNE, lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE },
            "integration": { ...LECTURE_INDIVIDUELLE_CAPRICORNE, lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE }
        }
    },
    "2026": {
        "capricorn": {
            "alignement": { ...LECTURE_INDIVIDUELLE_CAPRICORNE, lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE },
            "contact": { ...LECTURE_INDIVIDUELLE_CAPRICORNE, lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE },
            "distribution": { ...LECTURE_INDIVIDUELLE_CAPRICORNE, lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE },
            "integration": { ...LECTURE_INDIVIDUELLE_CAPRICORNE, lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE }
        }
    }
};
