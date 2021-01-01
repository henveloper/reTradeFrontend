export type IStocks = Map<number, number>;

export type IOffer = {
    sellingItems: number[],
    sellingQuantities: number[],
    buyingItems: number[],
    buyingQuantities: number[],
    quantity: number,
    suspended: boolean,
}

export enum EClasses {
    rogue, archer, wizard, priest,
    warrior, knight, paladin, assassin,
    necromancer, huntress, mystic, trickster,
    sorcerer, ninja, samurai, bard,
}

export enum EWeaponClasses {
    dagger = 2, bow = 3, staff = 17, wand = 8, sword = 1, katana = 24,
}

export enum EAbilityClasses {
    cloak = 13, quiver = 15, spell = 11, tome = 4,
    helmet = 16, shield = 5, seal = 12, poison = 18,
    skull = 19, trap = 20, orb = 21, prism = 22,
    scepter = 23, star = 25, wakizashi = 27, lute = 28,
}

export enum EArmorClasses {
    robe = 14, light = 6, heavy = 7,
}

export type EEquipmentClasses = EWeaponClasses | EAbilityClasses | EArmorClasses;

export interface IGameItem {
    id: number;
}

export interface IEquipment<T = number, S = EEquipmentClasses> extends IGameItem {
    tier: T,
    slotType: S,
    name: string,
}

export type TEquipmentTypes = 'weapon' | 'ability' | 'armor';

/**
 * @deprecated
 */
export type TWeapons = 'dagger' | 'bow' | 'staff' | 'wand' | 'sword' | 'katana';

/**
 * @deprecated
 */
export type TAbilities = 'cloak' | 'quiver' | 'spell' | 'tome' |
    'helmet' | 'shield' | 'seal' | 'poison' |
    'skull' | 'trap' | 'orb' | 'prism' |
    'scepter' | 'star' | 'wakizashi' | 'lute';

/**
 * @deprecated
 */
export type TArmors = 'robe' | 'light' | 'heavy';

/**
 * @deprecated
 */
export type TEquipments = TWeapons | TAbilities | TArmors;
