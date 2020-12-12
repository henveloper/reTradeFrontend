import axios from 'axios';
import { parse } from 'fast-xml-parser';
import * as fs from 'fs';
import { ESlotTypes } from './types';

async function main() {
    const xmlReq = await axios.get('https://static.drips.pw/rotmg/production/current/xmlc/Objects.xml');
    const parsedXml = parse(xmlReq.data, { ignoreAttributes: false });
    const gameObjects: any[] = parsedXml.Objects.Object;

    const weapons: Array<[]> = [];
    {
        const slotTypes: ESlotTypes [] = [
            ESlotTypes.sword,
            ESlotTypes.katana,
            ESlotTypes.dagger,
            ESlotTypes.bow,
            ESlotTypes.staff,
            ESlotTypes.wand,
        ];
        for (const slotType of slotTypes) {
            const entries = [];
            for (let tier = 10; tier <= 12; tier++) {
                const hexString = gameObjects.find(o => o.SlotType === slotType && o.Tier === tier)['@_type'];
                const dec = parseInt(hexString, 16);
                entries.push(dec);
            }
            weapons.push(entries);
        }
    }

    const abilities: Array<number[]> = [];
    {
        const slotTypes: number[] = [
            // cloak, quiv, spell, tome
            13, 15, 11, 4,
            // helms, shield, seal, poison
            16, 5, 12, 18,
            // skulls, traps, orbs, prisms
            19, 20, 21, 22,
            // scepters, stars, waki, lutes
            23, 25, 27, 28
        ];
        for (const slotType of slotTypes) {
            const entries = [];
            for (let tier = 5; tier <= 6; tier++) {
                const hexString = gameObjects.find(o => o.SlotType === slotType && o.Tier === tier)['@_type'];
                const dec = parseInt(hexString, 16);
                entries.push(dec);
            }
            abilities.push(entries);
        }
    }

    const armors: Array<number[]> = [];
    {
        const slotTypes = [ 6, 7, 14 ]; // light heavy robe
        for (const slotType of slotTypes) {
            const entries = [];
            for (let tier = 11; tier <= 13; tier++) {
                const hexString = gameObjects.find(o => o.SlotType === slotType && o.Tier === tier)['@_type'];
                const dec = parseInt(hexString, 16);
                entries.push(dec);
            }
            armors.push(entries);
        }
    }

    // construct file
    function getArrayElementString(src: Array<number[]>) {
        return src.reduce((p, c) => p + `    [ ${ c.join(', ') } ],\n`, '');
    }

    let file = '';
    file += 'export const weapons = [\n';
    file += '    // dagger bow staff wand sword katanas\n';
    file += getArrayElementString(weapons);
    file += '];\n\n';
    file += 'export const abilities = [\n';
    file += '    // cloak, quiv, spell, tome\n'
        + '    // helms, shield, seal, poison\n'
        + '    // skulls, traps, orbs, prisms\n'
        + '    // scepters, stars, waki, lutes\n';
    file += getArrayElementString(abilities);
    file += '];\n\n';
    file += 'export const armors = [\n';
    file += '    // light heavy robe\n';
    file += getArrayElementString(armors);
    file += '];\n\n';

    fs.writeFile('outputs/objectIds.ts', file, () => console.log('done'));
}

main().catch(console.log).then();
