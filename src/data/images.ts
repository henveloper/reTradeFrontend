import { TEquipments } from '../shareHolders';
import { EPotionIds } from './itemIds';

// const equipment: Record<TEquipments, Record<number, string>> = {
//     sword: {
//         10: 'https://i.imgur.com/0fQEDum.png',
//         11: 'https://i.imgur.com/qK9nqSz.png',
//         12: 'https://i.imgur.com/QNbjO5z.png',
//     },
//     katana: {
//         10: 'https://i.imgur.com/M6jwTgW.png',
//         11: 'https://i.imgur.com/3QfXSgt.png',
//         12: 'https://i.imgur.com/Km8Rg1Z.png',
//     },
//     dagger: {
//         10: 'https://i.imgur.com/XqxfYSJ.png',
//         11: 'https://i.imgur.com/ds9wJeI.png',
//         12: 'https://i.imgur.com/BaLWiQC.png',
//     },
//     bow: {
//         10: 'https://i.imgur.com/Z4GssoO.png',
//         11: 'https://i.imgur.com/4FEOoNA.png',
//         12: 'https://i.imgur.com/rWc6UAy.png',
//     },
//     staff: {
//         10: 'https://i.imgur.com/nHBniQs.png',
//         11: 'https://i.imgur.com/uVcGAae.png',
//         12: 'https://i.imgur.com/cnKvKxT.png',
//     },
//     wand: {
//         10: 'https://i.imgur.com/ViSiggA.png',
//         11: 'https://i.imgur.com/2idkCvn.png',
//         12: 'https://i.imgur.com/YdwFDes.png',
//     },
//
//     cloak: { 5: 'https://i.imgur.com/tfSIkBb.png', 6: 'https://i.imgur.com/vvDokyq.png' },
//     quiver: { 5: 'https://i.imgur.com/XFgqCV5.png', 6: 'https://i.imgur.com/JVpRuPl.png' },
//     spell: { 5: 'https://i.imgur.com/gmLqrBK.png', 6: 'https://i.imgur.com/gGXWCi9.png' },
//     tome: { 5: 'https://i.imgur.com/i9077AE.png', 6: 'https://i.imgur.com/63EtuBe.png' },
//     helmet: { 5: 'https://i.imgur.com/vyWyX1b.png', 6: 'https://i.imgur.com/vzrYC5J.png' },
//     shield: { 5: 'https://i.imgur.com/G5DefCI.png', 6: 'https://i.imgur.com/vzrYC5J.png' },
//     seal: { 5: 'https://i.imgur.com/zD4KcQ8.png', 6: 'https://i.imgur.com/xRGtewS.png' },
//     poison: { 5: 'https://i.imgur.com/dFYPpvy.png', 6: 'https://i.imgur.com/GnMp8Q9.png' },
//     skull: { 5: 'https://i.imgur.com/5RBuR5y.png', 6: 'https://i.imgur.com/WvCtWYR.png' },
//     trap: { 5: 'https://i.imgur.com/9c7MZYN.png', 6: 'https://i.imgur.com/Vs5zLp8.png' },
//     orb: { 5: 'https://i.imgur.com/U1vsiyc.png', 6: 'https://i.imgur.com/FDRA6b5.png' },
//     prism: { 5: 'https://i.imgur.com/zwyLyiC.png', 6: 'https://i.imgur.com/JePn0fw.png' },
//     scepter: { 5: 'https://i.imgur.com/gslGqoL.png', 6: 'https://i.imgur.com/DIRbsr6.png' },
//     star: { 5: 'https://i.imgur.com/AWDqcVz.png', 6: 'https://i.imgur.com/kXK5B0o.png' },
//     wakizashi: { 5: 'https://i.imgur.com/YittzJR.png', 6: 'https://i.imgur.com/ycLPRDX.png' },
//     lute: { 5: 'https://i.imgur.com/xKXYSaD.png', 6: 'https://i.imgur.com/7QhzvyK.png' },
//
//     robe:{11: 'https://i.imgur.com/pKZpj6a.png', 12: 'https://i.imgur.com/qvD85dq.png', 13: 'https://i.imgur.com/Oup28jC.png'},
//     light:{11: 'https://i.imgur.com/yFHXsnA.png', 12: 'https://i.imgur.com/5lKzW3e.png', 13: 'https://i.imgur.com/Wvu0LU7.png'},
//     heavy:{11: 'https://i.imgur.com/lqywZKs.png', 12: 'https://i.imgur.com/doHDO0P.png', 13: 'https://i.imgur.com/8PWmkCU.png'},
// };

export const images: Map<number, string> = new Map()
    // potions
    .set(EPotionIds.glife, 'https://static.drips.pw/rotmg/wiki/Consumable/Restoratives/Greater%20Potion%20of%20Life.png')
    .set(EPotionIds.atk, 'https://i.imgur.com/kiIMjr9.png')
    .set(EPotionIds.def, 'https://i.imgur.com/xSXLjme.png')
    .set(EPotionIds.spd, 'https://i.imgur.com/R2U76AH.png')
    .set(EPotionIds.dex, 'https://i.imgur.com/7kXmM0O.png')
    .set(EPotionIds.wis, 'https://i.imgur.com/1iHlYrD.png')
    .set(EPotionIds.vit, 'https://i.imgur.com/WLjcwoA.png')
;
