import {
    EAbilitySlot,
    EArmorSlot,
    EEquipmentSlot,
    EWeaponSlot,
    IEquipment,
    TEquipments,
    TEquipmentTypes
} from '../types';

export class Equipment {
    public id: number;
    public tier: number;
    public slotType: EEquipmentSlot;
    public name: string;

    static weaponSlotTypes: EWeaponSlot[] = [ EWeaponSlot.sword, EWeaponSlot.katana, EWeaponSlot.dagger, EWeaponSlot.bow, EWeaponSlot.staff, EWeaponSlot.wand ];
    static abilitySlotTypes: EAbilitySlot[] = [
        EAbilitySlot.cloak, EAbilitySlot.quiver, EAbilitySlot.spell, EAbilitySlot.tome,
        EAbilitySlot.helmet, EAbilitySlot.shield, EAbilitySlot.seal, EAbilitySlot.poison,
        EAbilitySlot.skull, EAbilitySlot.trap, EAbilitySlot.orb, EAbilitySlot.prism,
        EAbilitySlot.scepter, EAbilitySlot.star, EAbilitySlot.wakizashi, EAbilitySlot.lute,
    ];
    static armorSlotTypes: EArmorSlot[] = [ EArmorSlot.robe, EArmorSlot.light, EArmorSlot.heavy, ];

    constructor(info: IEquipment) {
        this.id = info.id;
        this.tier = info.tier;
        this.slotType = info.slotType;
        this.name = info.name;
    }

    public get type(): TEquipmentTypes{
        if (Equipment.weaponSlotTypes.includes(+this.slotType)) {
            return 'weapon';
        } else if (Equipment.abilitySlotTypes.includes(+this.slotType)) {
            return 'ability';
        } else {
            return 'armor';
        }
    }

    public get className(): TEquipments {
        switch (this.slotType) {
            case EWeaponSlot.sword:
                return 'sword';
            case EWeaponSlot.katana:
                return 'katana';
            case EWeaponSlot.dagger:
                return 'dagger';
            case EWeaponSlot.bow:
                return 'bow';
            case EWeaponSlot.staff:
                return 'staff';
            case EWeaponSlot.wand:
                return 'wand';
            case EAbilitySlot.cloak:
                return 'cloak';
            case EAbilitySlot.quiver:
                return 'quiver';
            case EAbilitySlot.spell:
                return 'spell';
            case EAbilitySlot.tome:
                return 'tome';
            case EAbilitySlot.helmet:
                return 'helmet';
            case EAbilitySlot.shield:
                return 'shield';
            case EAbilitySlot.seal:
                return 'seal';
            case EAbilitySlot.poison:
                return 'poison';
            case EAbilitySlot.skull:
                return 'skull';
            case EAbilitySlot.trap:
                return 'trap';
            case EAbilitySlot.orb:
                return 'orb';
            case EAbilitySlot.prism:
                return 'prism';
            case EAbilitySlot.scepter:
                return 'scepter';
            case EAbilitySlot.star:
                return 'star';
            case EAbilitySlot.wakizashi:
                return 'wakizashi';
            case EAbilitySlot.lute:
                return 'lute';
            case EArmorSlot.robe:
                return 'robe';
            case EArmorSlot.light:
                return 'light';
            case EArmorSlot.heavy:
                return 'heavy';
            default:
                return 'robe';
        }
    }

}

export const equipments: Array<Equipment> = [
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
];


