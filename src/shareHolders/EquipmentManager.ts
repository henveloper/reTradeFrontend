import {
    EAbilityClasses,
    EArmorClasses,
    EEquipmentClasses,
    EWeaponClasses,
    IEquipment,
    IOffer,
    TEquipmentTypes
} from './index';
import { EPotionIds } from '../data/itemIds';
import { PotionGenerator } from './PotionGenerator';

export class Equipment {
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

    // in glife unit
    public get value() {
        if (this.type === 'weapon') {
            if (this.tier === 11) {
                return 1 / 6;
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
                        case EAbilityClasses.shield:
                        case EAbilityClasses.helmet:
                            return 4;
                        case EAbilityClasses.seal:
                            return 3;
                        case EAbilityClasses.spell:
                        case EAbilityClasses.tome:
                            return 2;
                        case EAbilityClasses.cloak:
                        case EAbilityClasses.quiver:
                        case EAbilityClasses.poison:
                        case EAbilityClasses.skull:
                        case EAbilityClasses.trap:
                        case EAbilityClasses.orb:
                        case EAbilityClasses.prism:
                        case EAbilityClasses.scepter:
                        case EAbilityClasses.lute:
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
                if (this.className === EArmorClasses.robe) {
                    return 1;
                }
                return 1 / 2;
            }
        }
    }

    public get imageUrl(): string | undefined {
        const urls: Record<EEquipmentClasses, Record<number, string>> = {
            [EWeaponClasses.sword]: {
                11: 'https://i.imgur.com/qK9nqSz.png',
                12: 'https://i.imgur.com/QNbjO5z.png',
            },
            [EWeaponClasses.katana]: {
                11: 'https://i.imgur.com/3QfXSgt.png',
                12: 'https://i.imgur.com/Km8Rg1Z.png',
            },
            [EWeaponClasses.dagger]: {
                11: 'https://i.imgur.com/ds9wJeI.png',
                12: 'https://i.imgur.com/BaLWiQC.png',
            },
            [EWeaponClasses.bow]: {
                11: 'https://i.imgur.com/4FEOoNA.png',
                12: 'https://i.imgur.com/rWc6UAy.png',
            },
            [EWeaponClasses.staff]: {
                11: 'https://i.imgur.com/uVcGAae.png',
                12: 'https://i.imgur.com/cnKvKxT.png',
            },
            [EWeaponClasses.wand]: {
                11: 'https://i.imgur.com/2idkCvn.png',
                12: 'https://i.imgur.com/YdwFDes.png',
            },

            [EAbilityClasses.cloak]: { 6: 'https://i.imgur.com/vvDokyq.png' },
            [EAbilityClasses.quiver]: { 6: 'https://i.imgur.com/JVpRuPl.png' },
            [EAbilityClasses.spell]: { 6: 'https://i.imgur.com/gGXWCi9.png' },
            [EAbilityClasses.tome]: { 6: 'https://i.imgur.com/63EtuBe.png' },
            [EAbilityClasses.helmet]: { 6: 'https://i.imgur.com/vzrYC5J.png' },
            [EAbilityClasses.shield]: { 6: 'https://i.imgur.com/vzrYC5J.png' },
            [EAbilityClasses.seal]: { 6: 'https://i.imgur.com/xRGtewS.png' },
            [EAbilityClasses.poison]: { 6: 'https://i.imgur.com/GnMp8Q9.png' },
            [EAbilityClasses.skull]: { 6: 'https://i.imgur.com/WvCtWYR.png' },
            [EAbilityClasses.trap]: { 6: 'https://i.imgur.com/Vs5zLp8.png' },
            [EAbilityClasses.orb]: { 6: 'https://i.imgur.com/FDRA6b5.png' },
            [EAbilityClasses.prism]: { 6: 'https://i.imgur.com/JePn0fw.png' },
            [EAbilityClasses.scepter]: { 6: 'https://i.imgur.com/DIRbsr6.png' },
            [EAbilityClasses.star]: { 6: 'https://i.imgur.com/kXK5B0o.png' },
            [EAbilityClasses.wakizashi]: { 6: 'https://i.imgur.com/ycLPRDX.png' },
            [EAbilityClasses.lute]: { 6: 'https://i.imgur.com/7QhzvyK.png' },

            [EArmorClasses.robe]: {
                12: 'https://i.imgur.com/qvD85dq.png',
                13: 'https://i.imgur.com/Oup28jC.png'
            },
            [EArmorClasses.light]: {
                12: 'https://i.imgur.com/5lKzW3e.png',
                13: 'https://i.imgur.com/Wvu0LU7.png'
            },
            [EArmorClasses.heavy]: {
                12: 'https://i.imgur.com/doHDO0P.png',
                13: 'https://i.imgur.com/8PWmkCU.png'
            },
        };

        return urls[this.className][this.tier];
    }
}

export type ISet = Partial<Record<TEquipmentTypes, Equipment>>;

class EquipmentManager {
    constructor(public readonly equipments: Equipment[]) {
        equipments.forEach(e => this.hashedEquipments[e.id] = e);
    }

    public readonly hashedEquipments: Record<string, Equipment> = {};

    public getEquipmentById(id: number | string) {
        return this.hashedEquipments[id];
    }

    public findEquipment(equipmentClass: EEquipmentClasses, tier: number) {
        return this.equipments.find(e => e.className === equipmentClass && e.tier === tier);
    }

    /**
     * @deprecated
     */
    public get weapons() {
        return this.equipments.filter(e => e.type === 'weapon');
    }

    /**
     * @deprecated
     */
    public get abilities() {
        return this.equipments.filter(e => e.type === 'ability');
    }

    /**
     * @deprecated
     */
    public get armors() {
        return this.equipments.filter(e => e.type === 'armor');
    }

    public valueOfSet(set: ISet) {
        const { weapon, ability, armor } = set;
        const factor = (() => {
            switch ([ weapon, ability, armor ].filter(x => x !== undefined).length) {
                // case 3:
                //     return 2 / 3;
                // case 2:
                //     return 4 / 5;
                default:
                    return 1;
            }
        })();
        return ((weapon?.value ?? 0) + (ability?.value ?? 0) + (armor?.value ?? 0)) * factor;
    }

    public generateSetOffer = (set: ISet): IOffer | undefined => {

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
            if (Math.abs(v % (1 / 12)) < 1e-6) {
                return v;
            }
            const remainder = v % (1 / 24);
            const addValue: boolean = Math.random() < (remainder * 24);
            return v - remainder + (addValue ? 1 / 24 : 0);
        })(this.valueOfSet(set));

        // compute potions
        const potionRecord: Map<number, number> = new Map();
        let valueOfOffer = 0;

        function pushPotion(id: number) {
            potionRecord.set(id, (potionRecord.get(id) ?? 0) + 1);
        }

        while (true) {

            const difference = valueOfSet - valueOfOffer;
            const EPSILON = 1e-6;

            // glifes
            if (difference + EPSILON >= 1) {
                pushPotion(EPotionIds.glife);
                valueOfOffer += 1;
            } else if (difference + EPSILON >= 1 / 2) {
                pushPotion(EPotionIds.life);
                valueOfOffer += 1 / 2;
            } else if (difference + EPSILON >= 1 / 4) {
                pushPotion(PotionGenerator.randomPot(1));
                valueOfOffer += 1 / 4;
            } else if (difference + EPSILON >= 1 / 6) {
                pushPotion(PotionGenerator.randomPot(2));
                valueOfOffer += 1 / 6;
            } else if (difference + EPSILON >= 1 / 8) {
                pushPotion(PotionGenerator.randomPot(3));
                valueOfOffer += 1 / 8;
            } else {
                break;
            }
        }

        if (Array.from(potionRecord.keys()).length === 0) {
            return undefined;
        }

        const equipments = [ set.weapon, set.ability, set.armor ].filter(x => x !== undefined) as Equipment[];
        return {
            sellingItems: equipments.map(e => e.id),
            sellingQuantities: equipments.map(_ => 1),
            buyingItems: Array.from(potionRecord.keys()),
            buyingQuantities: Array.from(potionRecord.keys()).map(k => potionRecord.get(k) ?? 99),
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
    new Equipment({ 'id': 2853, 'tier': 6, 'slotType': 4, 'name': 'Tome of Holy Guidance' }),
    new Equipment({ 'id': 2608, 'tier': 5, 'slotType': 11, 'name': 'Magic Nova Spell' }),
    new Equipment({ 'id': 2852, 'tier': 6, 'slotType': 11, 'name': 'Elemental Detonation Spell' }),
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
