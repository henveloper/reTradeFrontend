import {
    EAbilityClasses,
    EArmorClasses,
    EEquipmentClasses,
    EWeaponClasses,
    IEquipment,
    IOffer,
    TEquipmentTypes
} from '../shareHolders';
import { EPotionIds } from '../data/itemIds';
import { PotionGenerator } from './PotionGenerator';

class Equipment {
    public id: number;
    public tier: number;
    public className: EEquipmentClasses;
    public name: string;

    static weaponSlotTypes: EWeaponClasses[] = [ EWeaponClasses.sword, EWeaponClasses.katana, EWeaponClasses.dagger, EWeaponClasses.bow, EWeaponClasses.staff, EWeaponClasses.wand ];
    static abilitySlotTypes: EAbilityClasses[] = [
        EAbilityClasses.cloak, EAbilityClasses.quiver, EAbilityClasses.spell, EAbilityClasses.tome,
        EAbilityClasses.helmet, EAbilityClasses.shield, EAbilityClasses.seal, EAbilityClasses.poison,
        EAbilityClasses.skull, EAbilityClasses.trap, EAbilityClasses.orb, EAbilityClasses.prism,
        EAbilityClasses.scepter, EAbilityClasses.star, EAbilityClasses.wakizashi, EAbilityClasses.lute,
    ];
    static armorSlotTypes: EArmorClasses[] = [ EArmorClasses.robe, EArmorClasses.light, EArmorClasses.heavy, ];

    constructor(info: IEquipment) {
        this.id = info.id;
        this.tier = info.tier;
        this.className = info.slotType;
        this.name = info.name;
    }

    public get type(): TEquipmentTypes {
        const weaponSlotTypes: number[] = [
            EWeaponClasses.sword,
            EWeaponClasses.katana,
            EWeaponClasses.dagger,
            EWeaponClasses.bow, EWeaponClasses.staff,
            EWeaponClasses.wand
        ];
        const armorSlotTypes: number[] = [
            EArmorClasses.robe,
            EArmorClasses.light,
            EArmorClasses.heavy,
        ];

        if (weaponSlotTypes.includes(this.className)) {
            return 'weapon';
        } else if (armorSlotTypes.includes(+this.className)) {
            return 'armor';
        } else {
            return 'ability';
        }
    }

    public get image() {
        const { className, tier } = this;

        if (className === EWeaponClasses.sword) {
            return tier === 10 ? 'https://i.imgur.com/0fQEDum.png' :
                tier === 11 ? 'https://i.imgur.com/qK9nqSz.png' :
                    'https://i.imgur.com/QNbjO5z.png';
        } else if (className === EWeaponClasses.katana) {
            return tier === 10 ? 'https://i.imgur.com/M6jwTgW.png' :
                tier === 11 ? 'https://i.imgur.com/3QfXSgt.png' :
                    'https://i.imgur.com/Km8Rg1Z.png';
        } else if (className === EWeaponClasses.dagger) {
            return tier === 10 ? 'https://i.imgur.com/XqxfYSJ.png' :
                tier === 11 ? 'https://i.imgur.com/ds9wJeI.png' :
                    'https://i.imgur.com/BaLWiQC.png';
        } else if (className === EWeaponClasses.bow) {
            return tier === 10 ? 'https://i.imgur.com/Z4GssoO.png' :
                tier === 11 ? 'https://i.imgur.com/4FEOoNA.png' :
                    'https://i.imgur.com/rWc6UAy.png';
        } else if (className === EWeaponClasses.staff) {
            return tier === 10 ? 'https://i.imgur.com/nHBniQs.png' :
                tier === 11 ? 'https://i.imgur.com/uVcGAae.png' :
                    'https://i.imgur.com/cnKvKxT.png';
        } else if (className === EWeaponClasses.wand) {
            return tier === 10 ? 'https://i.imgur.com/ViSiggA.png' :
                tier === 11 ? 'https://i.imgur.com/2idkCvn.png' :
                    'https://i.imgur.com/YdwFDes.png';
        } else if (className === EAbilityClasses.cloak) {
            return tier === 5 ? 'https://i.imgur.com/tfSIkBb.png' :
                'https://i.imgur.com/vvDokyq.png';
        } else if (className === EAbilityClasses.quiver) {
            return tier === 5 ? 'https://i.imgur.com/XFgqCV5.png' :
                'https://i.imgur.com/JVpRuPl.png';
        } else if (className === EAbilityClasses.spell) {
            return tier === 5 ? 'https://i.imgur.com/gmLqrBK.png' :
                'https://i.imgur.com/gGXWCi9.png';
        } else if (className === EAbilityClasses.tome) {
            return tier === 5 ? 'https://i.imgur.com/i9077AE.png' :
                'https://i.imgur.com/63EtuBe.png';
        } else if (className === EAbilityClasses.helmet) {
            return tier === 5 ? 'https://i.imgur.com/vyWyX1b.png' :
                'https://i.imgur.com/vzrYC5J.png';
        } else if (className === EAbilityClasses.shield) {
            return tier === 5 ? 'https://i.imgur.com/G5DefCI.png' :
                'https://i.imgur.com/vzrYC5J.png';
        } else if (className === EAbilityClasses.seal) {
            return tier === 5 ? 'https://i.imgur.com/zD4KcQ8.png' :
                'https://i.imgur.com/xRGtewS.png';
        } else if (className === EAbilityClasses.poison) {
            return tier === 5 ? 'https://i.imgur.com/dFYPpvy.png' :
                'https://i.imgur.com/GnMp8Q9.png';
        } else if (className === EAbilityClasses.skull) {
            return tier === 5 ? 'https://i.imgur.com/5RBuR5y.png' :
                'https://i.imgur.com/WvCtWYR.png';
        } else if (className === EAbilityClasses.trap) {
            return tier === 5 ? 'https://i.imgur.com/9c7MZYN.png' :
                'https://i.imgur.com/Vs5zLp8.png';
        } else if (className === EAbilityClasses.orb) {
            return tier === 5 ? 'https://i.imgur.com/U1vsiyc.png' :
                'https://i.imgur.com/FDRA6b5.png';
        } else if (className === EAbilityClasses.prism) {
            return tier === 5 ? 'https://i.imgur.com/zwyLyiC.png' :
                'https://i.imgur.com/JePn0fw.png';
        } else if (className === EAbilityClasses.scepter) {
            return tier === 5 ? 'https://i.imgur.com/gslGqoL.png' :
                'https://i.imgur.com/DIRbsr6.png';
        } else if (className === EAbilityClasses.star) {
            return tier === 5 ? 'https://i.imgur.com/AWDqcVz.png' :
                'https://i.imgur.com/kXK5B0o.png';
        } else if (className === EAbilityClasses.wakizashi) {
            return tier === 5 ? 'https://i.imgur.com/YittzJR.png' :
                'https://i.imgur.com/ycLPRDX.png';
        } else if (className === EAbilityClasses.lute) {
            return tier === 5 ? 'https://i.imgur.com/xKXYSaD.png' :
                'https://i.imgur.com/7QhzvyK.png';
        } else if (className === EArmorClasses.robe) {
            return tier === 11 ? 'https://i.imgur.com/pKZpj6a.png' :
                tier === 12 ? 'https://i.imgur.com/qvD85dq.png' :
                    'https://i.imgur.com/Oup28jC.png';
        } else if (className === EArmorClasses.light) {
            return tier === 11 ? 'https://i.imgur.com/yFHXsnA.png' :
                tier === 12 ? 'https://i.imgur.com/5lKzW3e.png' :
                    'https://i.imgur.com/Wvu0LU7.png';
        } else if (className === EArmorClasses.heavy) {
            return tier === 11 ? 'https://i.imgur.com/lqywZKs.png' :
                tier === 12 ? 'https://i.imgur.com/qK9nqSz.png' :
                    'https://i.imgur.com/lqywZKs.png';
        }

        return '';
    }

    // in glife unit
    public get value() {
        if (this.type === 'weapon') {
            if (this.tier <= 10) {
                return 1 / 8;
            } else if (this.tier === 11) {
                return (() => {
                    switch (this.className as EWeaponClasses) {
                        case EWeaponClasses.sword:
                        case EWeaponClasses.staff:
                            return 1 / 8;
                        case EWeaponClasses.dagger:
                        case EWeaponClasses.bow:
                            return 1 / 8;
                        default:
                            return 1 / 8;
                    }
                })();
            } else {
                return (() => {
                    switch (this.className as EWeaponClasses) {
                        case EWeaponClasses.sword:
                        case EWeaponClasses.staff:
                            return 1;
                        default:
                            return 1 / 2;
                    }
                })();
            }
        } else if (this.type === 'ability') {
            if (this.tier <= 5) {
                return (() => {
                    switch (this.className as EAbilityClasses) {
                        case EAbilityClasses.helmet:
                        case EAbilityClasses.shield:
                        case EAbilityClasses.seal:
                        case EAbilityClasses.spell:
                            return 1 / 4;
                        case EAbilityClasses.lute:
                        case EAbilityClasses.cloak:
                        case EAbilityClasses.quiver:
                            return 1 / 6;
                        default:
                            return 1 / 8;
                    }
                })();
            } else {
                return (() => {
                    switch (this.className as EAbilityClasses) {
                        case EAbilityClasses.helmet:
                            return 3;
                        case EAbilityClasses.spell:
                        case EAbilityClasses.shield:
                        case EAbilityClasses.seal:
                            return 2;
                        case EAbilityClasses.quiver:
                        case EAbilityClasses.tome:
                        case EAbilityClasses.poison:
                        case EAbilityClasses.skull:
                            return 1;
                        default:
                            return 1 / 2;
                    }
                })();
            }
        } else {
            // armor
            if (this.tier <= 11) {
                return 1 / 8;
            } else if (this.tier === 12) {
                return 1 / 6;
            } else {
                return 1 / 2;
            }
        }
    }
}

interface ISet {
    weapon?: Equipment,
    ability?: Equipment,
    armor?: Equipment
}

class EquipmentManager {
    constructor(public readonly equipments: Equipment[]) {
        equipments.forEach(e => this.hashedEquipments[e.id] = e);
    }

    public readonly hashedEquipments: Record<string, Equipment> = {};

    public getEquipmentById(id: number | string) {
        return this.hashedEquipments[id];
    }

    private valueOfSet(set: ISet) {
        const { weapon, ability, armor } = set;
        const factor = (() => {
            switch ([ weapon, ability, armor ].filter(x => x !== undefined).length) {
                case 3:
                    return 2 / 3;
                case 2:
                    return 4 / 5;
                default:
                    return 1;
            }
        })();

        return ((weapon?.value ?? 0) + (ability?.value ?? 0) + (armor?.value ?? 0)) * factor;
    }

    public generateSetOffer(set: ISet): IOffer | undefined {

        if (set.weapon && set.ability
            || set.weapon && set.armor
            || set.ability && set.armor) {
            const combinations: [ EWeaponClasses, EAbilityClasses, EArmorClasses ][] = [
                [ EWeaponClasses.dagger, EAbilityClasses.cloak, EArmorClasses.light ],
                [ EWeaponClasses.bow, EAbilityClasses.quiver, EArmorClasses.light ],
                [ EWeaponClasses.staff, EAbilityClasses.spell, EArmorClasses.robe ],
                [ EWeaponClasses.wand, EAbilityClasses.tome, EArmorClasses.robe ],
                [ EWeaponClasses.sword, EAbilityClasses.helmet, EArmorClasses.heavy ],
                [ EWeaponClasses.sword, EAbilityClasses.shield, EArmorClasses.heavy ],
                [ EWeaponClasses.sword, EAbilityClasses.seal, EArmorClasses.heavy ],
                [ EWeaponClasses.dagger, EAbilityClasses.poison, EArmorClasses.light ],
                [ EWeaponClasses.staff, EAbilityClasses.skull, EArmorClasses.robe ],
                [ EWeaponClasses.bow, EAbilityClasses.trap, EArmorClasses.light ],
                [ EWeaponClasses.staff, EAbilityClasses.orb, EArmorClasses.robe ],
                [ EWeaponClasses.dagger, EAbilityClasses.prism, EArmorClasses.light ],
                [ EWeaponClasses.wand, EAbilityClasses.scepter, EArmorClasses.robe ],
                [ EWeaponClasses.katana, EAbilityClasses.star, EArmorClasses.light ],
                [ EWeaponClasses.katana, EAbilityClasses.wakizashi, EArmorClasses.heavy ],
                [ EWeaponClasses.bow, EAbilityClasses.lute, EArmorClasses.robe ],
            ];

            if ((set.weapon && set.ability && !set.armor && !combinations.find(c => set.weapon!.className === c[0] && set.ability!.className === c[1]))
                || (set.weapon && !set.ability && set.armor && !combinations.find(c => set.weapon!.className === c[0] && set.armor!.className === c[2]))
                || (!set.weapon && set.ability && set.armor && !combinations.find(c => set.ability!.className === c[1] && set.armor!.className === c[2]))
                || (set.weapon && set.ability && set.armor && !combinations.find(c => set.weapon!.className === c[0] && set.ability!.className === c[1] && set.armor!.className === c[2]))) {
                return undefined;
            }
        }

        const valueOfSet = ((v: number) => {
            const remainder = v % 0.125;
            const addValue: boolean = Math.random() < remainder * 8;
            return v - remainder + (addValue ? 0.125 : 1);
        })(this.valueOfSet(set));

        // compute potions
        const potionRecord: Record<string, number> = {};
        let valueOfOffer = 0;

        function pushPotion(id: string) {
            if (potionRecord[id]) {
                potionRecord[id] += 1;
            } else {
                potionRecord[id] = 1;
            }
        }

        while (valueOfOffer < valueOfSet) {
            const difference = valueOfSet - valueOfOffer;
            const EPSILON = 1e-6;

            // glifes
            if (Math.abs(difference - 1) < EPSILON) {
                pushPotion(EPotionIds.glife.toString());
                valueOfOffer += 1;
            } else if (Math.abs(difference - 1 / 2) < EPSILON) {
                pushPotion(EPotionIds.life.toString());
                valueOfOffer += 1 / 2;
            } else if (Math.abs(difference - 1 / 4) < EPSILON) {
                pushPotion(PotionGenerator.randomPot(1).toString());
                valueOfOffer += 1 / 4;
            } else if (Math.abs(difference - 1 / 6) < EPSILON) {
                pushPotion(PotionGenerator.randomPot(2).toString());
                valueOfOffer += 1 / 4;
            } else if (Math.abs(difference - 1 / 8) < EPSILON) {
                pushPotion(PotionGenerator.randomPot(3).toString());
                valueOfOffer += 1 / 4;
            } else {
                break;
            }
        }

        if (Object.keys(potionRecord).length === 0) {
            return undefined;
        }

        const equipments = [ set.weapon, set.ability, set.armor ].filter(x => x !== undefined) as Equipment[];
        return {
            sellingItems: equipments.map(e => e.id),
            sellingQuantities: equipments.map(e => 1),
            buyingItems: Object.keys(potionRecord),
            buyingQuantities: Object.keys(potionRecord).map(e => 1),
            quantity: 1,
            suspended: false,
        };
    }

}

export const equipmentManager = new EquipmentManager([
    new Equipment({ 'id': 2692, 'tier': 10, 'slotType': 1, 'name': 'Archon Sword' }),
    new Equipment({ 'id': 2631, 'tier': 11, 'slotType': 1, 'name': 'Skysplitter Sword' }),
    new Equipment({ 'id': 2827, 'tier': 12, 'slotType': 1, 'name': 'Sword of Acclaim' }),
    new Equipment({ 'id': 3150, 'tier': 10, 'slotType': 24, 'name': 'Ichimonji' }),
    new Equipment({ 'id': 3151, 'tier': 11, 'slotType': 24, 'name': 'Muramasa' }),
    new Equipment({ 'id': 3152, 'tier': 12, 'slotType': 24, 'name': 'Masamune' }),
    new Equipment({ 'id': 2697, 'tier': 10, 'slotType': 2, 'name': 'Emeraldshard Dagger' }),
    new Equipment({ 'id': 2698, 'tier': 11, 'slotType': 2, 'name': 'Agateclaw Dagger' }),
    new Equipment({ 'id': 2815, 'tier': 12, 'slotType': 2, 'name': 'Dagger of Foul Malevolence' }),
    new Equipment({ 'id': 2700, 'tier': 10, 'slotType': 3, 'name': 'Bow of Fey Magic' }),
    new Equipment({ 'id': 2701, 'tier': 11, 'slotType': 3, 'name': 'Bow of Innocent Blood' }),
    new Equipment({ 'id': 2818, 'tier': 12, 'slotType': 3, 'name': 'Bow of Covert Havens' }),
    new Equipment({ 'id': 2721, 'tier': 10, 'slotType': 17, 'name': 'Staff of Diabolic Secrets' }),
    new Equipment({ 'id': 2722, 'tier': 11, 'slotType': 17, 'name': 'Staff of Astral Knowledge' }),
    new Equipment({ 'id': 2824, 'tier': 12, 'slotType': 17, 'name': 'Staff of the Cosmic Whole' }),
    new Equipment({ 'id': 2694, 'tier': 10, 'slotType': 8, 'name': 'Wand of Shadow' }),
    new Equipment({ 'id': 2695, 'tier': 11, 'slotType': 8, 'name': 'Wand of Ancient Warning' }),
    new Equipment({ 'id': 2806, 'tier': 12, 'slotType': 8, 'name': 'Wand of Recompense' }),
    new Equipment({ 'id': 2785, 'tier': 5, 'slotType': 13, 'name': 'Cloak of Endless Twilight' }),
    new Equipment({ 'id': 2855, 'tier': 6, 'slotType': 13, 'name': 'Cloak of Ghostly Concealment' }),
    new Equipment({ 'id': 2661, 'tier': 5, 'slotType': 15, 'name': 'Golden Quiver' }),
    new Equipment({ 'id': 2856, 'tier': 6, 'slotType': 15, 'name': 'Quiver of Elvish Mastery' }),
    new Equipment({ 'id': 2651, 'tier': 5, 'slotType': 4, 'name': 'Tome of Divine Favor' }),
    new Equipment({ 'id': 2608, 'tier': 5, 'slotType': 11, 'name': 'Magic Nova Spell' }),
    new Equipment({ 'id': 2852, 'tier': 6, 'slotType': 11, 'name': 'Elemental Detonation Spell' }),
    new Equipment({ 'id': 2853, 'tier': 6, 'slotType': 4, 'name': 'Tome of Holy Guidance' }),
    new Equipment({ 'id': 2667, 'tier': 5, 'slotType': 16, 'name': 'Golden Helm' }),
    new Equipment({ 'id': 2857, 'tier': 6, 'slotType': 16, 'name': 'Helm of the Great General' }),
    new Equipment({ 'id': 2572, 'tier': 5, 'slotType': 5, 'name': 'Mithril Shield' }),
    new Equipment({ 'id': 2850, 'tier': 6, 'slotType': 5, 'name': 'Colossus Shield' }),
    new Equipment({ 'id': 2645, 'tier': 5, 'slotType': 12, 'name': 'Seal of the Holy Warrior' }),
    new Equipment({ 'id': 2854, 'tier': 6, 'slotType': 12, 'name': 'Seal of the Blessed Champion' }),
    new Equipment({ 'id': 2728, 'tier': 5, 'slotType': 18, 'name': 'Nightwing Venom' }),
    new Equipment({ 'id': 2858, 'tier': 6, 'slotType': 18, 'name': 'Baneserpent Poison' }),
    new Equipment({ 'id': 2735, 'tier': 5, 'slotType': 19, 'name': 'Lifedrinker Skull' }),
    new Equipment({ 'id': 2859, 'tier': 6, 'slotType': 19, 'name': 'Bloodsucker Skull' }),
    new Equipment({ 'id': 2742, 'tier': 5, 'slotType': 20, 'name': 'Dragonstalker Trap' }),
    new Equipment({ 'id': 2860, 'tier': 6, 'slotType': 20, 'name': 'Giantcatcher Trap' }),
    new Equipment({ 'id': 2630, 'tier': 5, 'slotType': 21, 'name': 'Banishment Orb' }),
    new Equipment({ 'id': 2861, 'tier': 6, 'slotType': 21, 'name': 'Planefetter Orb' }),
    new Equipment({ 'id': 2848, 'tier': 5, 'slotType': 22, 'name': 'Prism of Phantoms' }),
    new Equipment({ 'id': 2851, 'tier': 6, 'slotType': 22, 'name': 'Prism of Apparitions' }),
    new Equipment({ 'id': 2866, 'tier': 5, 'slotType': 23, 'name': 'Scepter of Skybolts' }),
    new Equipment({ 'id': 2867, 'tier': 6, 'slotType': 23, 'name': 'Scepter of Storms' }),
    new Equipment({ 'id': 3160, 'tier': 5, 'slotType': 25, 'name': 'Ice Star' }),
    new Equipment({ 'id': 3161, 'tier': 6, 'slotType': 25, 'name': 'Doom Circle' }),
    new Equipment({ 'id': 6831, 'tier': 5, 'slotType': 27, 'name': 'Jade-Imbued Wakizashi' }),
    new Equipment({ 'id': 6832, 'tier': 6, 'slotType': 27, 'name': 'Royal Wakizashi' }),
    new Equipment({ 'id': 53238, 'tier': 5, 'slotType': 28, 'name': 'Regal Lute' }),
    new Equipment({ 'id': 53239, 'tier': 6, 'slotType': 28, 'name': 'Skyward Lute' }),
    new Equipment({ 'id': 2709, 'tier': 11, 'slotType': 14, 'name': 'Robe of the Moon Wizard' }),
    new Equipment({ 'id': 2710, 'tier': 12, 'slotType': 14, 'name': 'Robe of the Elder Warlock' }),
    new Equipment({ 'id': 2821, 'tier': 13, 'slotType': 14, 'name': 'Robe of the Grand Sorcerer' }),
    new Equipment({ 'id': 2703, 'tier': 11, 'slotType': 6, 'name': 'Hippogriff Hide Armor' }),
    new Equipment({ 'id': 2704, 'tier': 12, 'slotType': 6, 'name': 'Griffon Hide Armor' }),
    new Equipment({ 'id': 2809, 'tier': 13, 'slotType': 6, 'name': 'Hydra Skin Armor' }),
    new Equipment({ 'id': 2706, 'tier': 11, 'slotType': 7, 'name': 'Vengeance Armor' }),
    new Equipment({ 'id': 2707, 'tier': 12, 'slotType': 7, 'name': 'Abyssal Armor' }),
    new Equipment({ 'id': 2812, 'tier': 13, 'slotType': 7, 'name': 'Acropolis Armor' }),
]);
