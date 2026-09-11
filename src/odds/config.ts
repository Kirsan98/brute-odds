// Nombre de combats simulés, en deux salves. Valeurs issues de la mesure de
// scripts/bench.ts, clone rapide compris :
//
//   brutes nues              0,031 ms/combat
//   brutes réelles équipées  0,061 ms/combat   (niveau 16, 7 armes / 3 compétences
//                                               contre 5 compétences ; 0,084 sans le
//                                               clone rapide)
//
// La première salve situe les six adversaires. Elle suffit à écarter ceux qui sont
// nettement au-dessus ou au-dessous ; elle ne suffit pas à départager deux adversaires
// à deux points l'un de l'autre, et c'est précisément là que se prend la décision.
// La seconde salve n'est donc tirée que sur les prétendants, ceux dont l'intervalle
// touche encore celui du meilleur.
//
// Coût au pire (brutes équipées, six prétendants, six workers en parallèle) :
// 1500 x 0,061 ms puis 6000 x 0,061 ms, soit environ 0,45 s de calcul perçu.
export const FIRST_PASS = 1500;
export const SECOND_PASS = 6000;

// Conseil de montée de niveau, premier temps : ce que chaque destin vaut au prochain
// combat, contre chaque adversaire de référence.
export const ADVICE_PASS = 1200;

// Le nombre d'adversaires de référence tirés du vivier accumulé. Six suffisaient quand
// on n'avait que le tirage du jour ; douze couvrent mieux la population qu'on affronte,
// pour un coût qui reste réparti sur les workers.
export const REFERENCE_COUNT = 12;

// Conseil de montée de niveau, second temps : la carrière. Chaque destin est prolongé
// sur dix niveaux, en tirant à chaque palier les destins que le jeu proposerait, et la
// brute d'arrivée est jugée contre les mêmes références.
//
// Dix niveaux parce que c'est l'horizon où une compétence a le temps de payer sans que
// la brute simulée devienne une fiction : au-delà, la suite des choix aléatoires pèse
// plus lourd que le destin qu'on compare.
export const CAREER_LEVELS = 10;
export const CAREER_TRAJECTORIES = 150;
export const CAREER_FIGHTS = 80;

// Les avenirs sont tirés en lots, pour que les six workers travaillent en même temps :
// une carrière entière dans une seule requête n'occuperait qu'un cœur.
//
// Mesure (npm run bench) : un lot de 50 avenirs x 80 combats prend 0,51 s. Une brute
// qui a pris dix niveaux porte plus d'armes et de compétences, son combat coûte donc
// le double de celui d'aujourd'hui (0,13 ms contre 0,066). Le conseil complet tient
// dans la seconde, sa relance dans deux de plus.
export const CAREER_CHUNKS = 3;
export const CAREER_SECOND_CHUNKS = 9;
