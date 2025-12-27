/**
 * BASE DE DONNÉES DES CONTENUS PAR ANNÉE ET PAR SIGNE
 * 
 * Structure :
 * ANNEE -> SIGNE -> PHASE -> { lecture_reel, lecture_energetique, epreuve, action }
 */

const LECTURE_ENERGETIQUE_CAPRICORNE = `Les vieilles structures hiérarchiques mondiales montrent leurs limites, non parce qu’elles manqueraient d’ordre ou de règles, mais parce qu’elles ne sont plus le lieu d’où émerge l’autorité véritable. Le basculement en cours ne consiste pas à réformer l’autorité existante, mais à reconnaître qu’une autorité collective est en train de se constituer, portée par les peuples eux-mêmes.

Depuis plusieurs décennies, des mouvements citoyens horizontaux ont rendu visible cette mutation. Des expériences comme Nuit Debout en France ou Occupy Wall Street n’avaient pas vocation à désigner un nouveau leader, mais à tester une intelligence partagée, une parole distribuée, une capacité collective de discernement. Ces mouvements annoncent une transformation profonde de la notion d’autorité.

Nous entrons dans l’ère du Verseau, une ère où la conscience collective devient le véritable centre de gravité. L’autorité ne peut plus être incarnée par un individu providentiel. Elle émerge désormais de groupes de femmes et d’hommes capables d’écoute, de discernement et de responsabilité partagée. Ce qui fait autorité n’est plus la position, mais la justesse collective.

Dans cette dynamique, le Capricorne ne représente pas le pouvoir vertical, mais la maîtrise. Une maîtrise qui ne s’exerce plus par le contrôle, mais par la capacité à donner forme, à structurer et à stabiliser ce qui émerge du collectif. Le Capricorne reçoit, canalise et rend opérante l’intuition de groupe.

La phrase-clé qui éclaire cette transition est :
« Passer du contrôle à la maîtrise par une écoute profonde de l’intuition. »

Cette intuition n’est pas individuelle. Elle est l’expression de la conscience collective du Verseau, une lumière diffuse qui circule à travers les groupes humains. L’énergie du Capricorne permet à cette intuition collective de se distribuer dans le réel, de devenir structure, règle juste et cadre vivant.

Silencieusement, une nouvelle forme d’autorité se met en place. Elle ne se proclame pas, elle se reconnaît dans l’action. Elle ne s’impose pas, elle se manifeste lorsque le groupe agit en cohérence avec ce qu’il perçoit ensemble comme juste.`;

export const CONTENTS_DB = {
    "2024": {
        "sagittarius": {
            "integration": {
                lecture_reel: "Je sens que l'élan d'expansion touche à sa fin pour se transformer en sagesse. C'est le temps de digérer les horizons explorés pour ne garder que l'essentiel.",
                lecture_energetique: "Le feu du Sagittaire s'intériorise pour préparer la structure du Capricorne. L'enthousiasme laisse place à la maturité.",
                epreuve: "Je suis tenté de fuir vers une nouvelle aventure ou une nouvelle idée sans avoir pris le temps de tirer les leçons de l'expérience qui s'achève.",
                action: "Je prends un moment pour noter une vérité majeure apprise durant ce cycle, avant de passer à l'action suivante."
            }
        }
    },
    "2025": {
        "capricorn": {
            "alignement": {
                lecture_reel: "Je ressens en cette période un appel à la verticalité. Je traverse un moment où le besoin de structure et de silence s'impose, non comme une contrainte, mais comme une nécessité pour tenir debout. Je sens une densité qui me demande de ralentir pour ne pas trébucher.",
                lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE,
                epreuve: "Je confonds souvent ma rigueur avec de la rigidité, ou mon besoin de solitude avec de la froideur. Je lutte contre la peur du vide en remplissant mon agenda.",
                action: "Je décide aujourd'hui d'accepter le silence sans chercher à le combler. Je pose un acte ferme mais bienveillant, qui définit ma limite sans fermer mon cœur."
            },
            "contact": {
                lecture_reel: "L'ascension intérieure m'amène à un point de contact précis. Je perçois une clarté nouvelle sur mes objectifs, non plus comme des ambitions, mais comme une responsabilité envers moi-même.",
                lecture_energetique: "Le monde cherche de nouveaux modèles de réussite qui ne soient pas basés sur l'écrasement ou la domination, mais sur l'élévation collective. Les 'sommets' traditionnels (pouvoir, argent) sont questionnés au profit d'une réussite qui a du sens.",
                epreuve: "Je crois devoir tout porter sur mes épaules pour prouver ma valeur. Je résiste par orgueil à demander le soutien nécessaire.",
                action: "Je m'autorise à déléguer ou à partager une charge, reconnaissant que ma force réside aussi dans ma capacité à m'ouvrir."
            },
            "distribution": {
                lecture_reel: "Je comprends que le sommet n'est pas une fin, mais un point de départ pour redescendre vers les autres. Je sens l'élan de partager ce que j'ai structuré en moi.",
                lecture_energetique: "C'est l'appel à une redistribution des ressources et des responsabilités. Le 'chef' n'est plus celui qui décide seul en haut de la pyramide, mais celui qui s'assure que la structure sert le bien commun. La notion de service public est réactivée.",
                epreuve: "Je crains que le partage ne me dépossède de mon autorité ou de mes acquis intérieurs.",
                action: "Je choisis de transmettre une compétence ou une vision claire à quelqu'un qui en a besoin, sans attente de retour."
            },
            "integration": {
                lecture_reel: "La structure que j'ai bâtie s'ancre maintenant dans ma réalité quotidienne. Je ne cherche plus à contrôler la vie, mais à la laisser me traverser avec maîtrise.",
                lecture_energetique: "Le collectif intègre que la vraie sécurité ne vient pas du contrôle policier ou normatif, mais de la solidité intérieure des individus qui le composent. On passe d'une société de la surveillance à une société de la responsabilité.",
                epreuve: "Je reste attaché à la forme ancienne de mes habitudes, refusant que l'expérience transforme concrètement mon emploi du temps.",
                action: "J'élimine consciemment une activité superflue pour honorer l'essentiel qui s'est révélé à moi."
            }
        }
    },
    "2026": {
        "capricorn": {
            "alignement": {
                lecture_reel: "Je ressens en cette période un appel à la verticalité. Je traverse un moment où le besoin de structure et de silence s'impose, non comme une contrainte, mais comme une nécessité pour tenir debout. Je sens une densité qui me demande de ralentir pour ne pas trébucher.",
                lecture_energetique: LECTURE_ENERGETIQUE_CAPRICORNE,
                epreuve: "Je confonds souvent ma rigueur avec de la rigidité, ou mon besoin de solitude avec de la froideur. Je lutte contre la peur du vide en remplissant mon agenda.",
                action: "Je décide aujourd'hui d'accepter le silence sans chercher à le combler. Je pose un acte ferme mais bienveillant, qui définit ma limite sans fermer mon cœur."
            },
            "contact": {
                lecture_reel: "L'ascension intérieure m'amène à un point de contact précis. Je perçois une clarté nouvelle sur mes objectifs, non plus comme des ambitions, mais comme une responsabilité envers moi-même.",
                lecture_energetique: "Le monde cherche de nouveaux modèles de réussite qui ne soient pas basés sur l'écrasement ou la domination, mais sur l'élévation collective. Les 'sommets' traditionnels (pouvoir, argent) sont questionnés au profit d'une réussite qui a du sens.",
                epreuve: "Je crois devoir tout porter sur mes épaules pour prouver ma valeur. Je résiste par orgueil à demander le soutien nécessaire.",
                action: "Je m'autorise à déléguer ou à partager une charge, reconnaissant que ma force réside aussi dans ma capacité à m'ouvrir."
            },
            "distribution": {
                lecture_reel: "Je comprends que le sommet n'est pas une fin, mais un point de départ pour redescendre vers les autres. Je sens l'élan de partager ce que j'ai structuré en moi.",
                lecture_energetique: "C'est l'appel à une redistribution des ressources et des responsabilités. Le 'chef' n'est plus celui qui décide seul en haut de la pyramide, mais celui qui s'assure que la structure sert le bien commun. La notion de service public est réactivée.",
                epreuve: "Je crains que le partage ne me dépossède de mon autorité ou de mes acquis intérieurs.",
                action: "Je choisis de transmettre une compétence ou une vision claire à quelqu'un qui en a besoin, sans attente de retour."
            },
            "integration": {
                lecture_reel: "La structure que j'ai bâtie s'ancre maintenant dans ma réalité quotidienne. Je ne cherche plus à contrôler la vie, mais à la laisser me traverser avec maîtrise.",
                lecture_energetique: "Le collectif intègre que la vraie sécurité ne vient pas du contrôle policier ou normatif, mais de la solidité intérieure des individus qui le composent. On passe d'une société de la surveillance à une société de la responsabilité.",
                epreuve: "Je reste attaché à la forme ancienne de mes habitudes, refusant que l'expérience transforme concrètement mon emploi du temps.",
                action: "J'élimine consciemment une activité superflue pour honorer l'essentiel qui s'est révélé à moi."
            }
        }
    }
};
