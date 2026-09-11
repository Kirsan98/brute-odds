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
