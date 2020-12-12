export type IArmorTypes = 'robe' | 'light' | 'heavy';
export type IArmorTiers = 11 | 12 | 13;
export type IArmorIds = Record<IArmorTypes, Record<IArmorTiers, number>>;
