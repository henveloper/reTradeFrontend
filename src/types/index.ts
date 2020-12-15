export interface IStock<T = number> {
    id: T;
    quantity: number;
};

export type IOffer = {
    quantity: number,
    sellingItems: number[],
    sellingQuantities: number[],
    buyingItems: number[],
    buyingQuantities: number[],
    suspended: boolean,
}

export enum EWeaponSlot {
    dagger = 2, bow = 3, staff = 17, wand = 8, sword = 1, katana = 24,
}

export enum EAbilitySlot {
    cloak = 13, quiver = 15, spell = 11, tome = 4,
    helmet = 16, shield = 5, seal = 12, poison = 18,
    skull = 19, trap = 20, orb = 21, prism = 22,
    scepter = 23, star = 25, wakizashi = 27, lute = 28,
}

export enum EArmorSlot {
    robe = 14, light = 6, heavy = 7,
}

export type EEquipmentSlot = EWeaponSlot | EAbilitySlot | EArmorSlot;

export interface IGameItem {
    id: number;
}

export interface IEquipment<T = number, S = EEquipmentSlot> extends IGameItem {
    tier: T,
    slotType: S,
    name: string,
}

export type TEquipmentTypes = 'weapon' | 'ability' | 'armor';

export type TWeapons = 'dagger' | 'bow' | 'staff' | 'wand' | 'sword' | 'katana';

export type TAbilities = 'cloak' | 'quiver' | 'spell' | 'tome' |
    'helmet' | 'shield' | 'seal' | 'poison' |
    'skull' | 'trap' | 'orb' | 'prism' |
    'scepter' | 'star' | 'wakizashi' | 'lute';

export type TArmors = 'robe' | 'light' | 'heavy';

export type TEquipments = TWeapons | TAbilities | TArmors;
