import { EAbilityClasses, EArmorClasses, EClasses, EWeaponClasses } from '../shareHolders';

export interface IEquipmentClassSet {
    weaponClass: EWeaponClasses,
    abilityClass: EAbilityClasses,
    armorClass: EArmorClasses,
}


export const classEquipments: [EClasses, IEquipmentClassSet][] = [
    [ EClasses.rogue, {
        weaponClass: EWeaponClasses.dagger,
        abilityClass: EAbilityClasses.cloak,
        armorClass: EArmorClasses.light
    } ],
    [ EClasses.archer, {
        weaponClass: EWeaponClasses.bow,
        abilityClass: EAbilityClasses.quiver,
        armorClass: EArmorClasses.light
    } ],
    [ EClasses.wizard, {
        weaponClass: EWeaponClasses.staff,
        abilityClass: EAbilityClasses.spell,
        armorClass: EArmorClasses.robe
    } ],
    [ EClasses.priest, {
        weaponClass: EWeaponClasses.wand,
        abilityClass: EAbilityClasses.tome,
        armorClass: EArmorClasses.robe
    } ],
    [ EClasses.warrior, {
        weaponClass: EWeaponClasses.sword,
        abilityClass: EAbilityClasses.helmet,
        armorClass: EArmorClasses.heavy
    } ],
    [ EClasses.knight, {
        weaponClass: EWeaponClasses.sword,
        abilityClass: EAbilityClasses.shield,
        armorClass: EArmorClasses.heavy
    } ],
    [ EClasses.paladin, {
        weaponClass: EWeaponClasses.sword,
        abilityClass: EAbilityClasses.seal,
        armorClass: EArmorClasses.heavy
    } ],
    [ EClasses.assassin, {
        weaponClass: EWeaponClasses.dagger,
        abilityClass: EAbilityClasses.poison,
        armorClass: EArmorClasses.light
    } ],
    [ EClasses.necromancer, {
        weaponClass: EWeaponClasses.staff,
        abilityClass: EAbilityClasses.skull,
        armorClass: EArmorClasses.robe
    } ],
    [ EClasses.huntress, {
        weaponClass: EWeaponClasses.bow,
        abilityClass: EAbilityClasses.trap,
        armorClass: EArmorClasses.light
    } ],
    [ EClasses.mystic, {
        weaponClass: EWeaponClasses.staff,
        abilityClass: EAbilityClasses.orb,
        armorClass: EArmorClasses.robe
    } ],
    [ EClasses.trickster, {
        weaponClass: EWeaponClasses.dagger,
        abilityClass: EAbilityClasses.prism,
        armorClass: EArmorClasses.light
    } ],
    [ EClasses.sorcerer, {
        weaponClass: EWeaponClasses.wand,
        abilityClass: EAbilityClasses.scepter,
        armorClass: EArmorClasses.robe
    } ],
    [ EClasses.ninja, {
        weaponClass: EWeaponClasses.katana,
        abilityClass: EAbilityClasses.star,
        armorClass: EArmorClasses.light
    } ],
    [ EClasses.samurai, {
        weaponClass: EWeaponClasses.katana,
        abilityClass: EAbilityClasses.wakizashi,
        armorClass: EArmorClasses.heavy
    } ],
    [ EClasses.bard, {
        weaponClass: EWeaponClasses.bow,
        abilityClass: EAbilityClasses.lute,
        armorClass: EArmorClasses.robe
    } ],
];
