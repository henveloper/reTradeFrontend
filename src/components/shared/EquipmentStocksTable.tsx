import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid } from '@material-ui/core';
import { Item } from './Item';
import { abilitySlotSorting, armorSlotSorting, equipments, weaponSlotSorting } from '../../data/equipments';
import { EEquipmentSlot } from '../../types';

interface IItemTableProps extends IDefaultProps {
    variant: 'weapon' | 'ability' | 'armor';
}

export function EquipmentStocksTable(props: IItemTableProps) {
    const { styles, variant } = props;

    const enumArray: EEquipmentSlot[] = (() => {
        switch (variant) {
            case 'weapon':
                return weaponSlotSorting;
            case 'ability':
                return abilitySlotSorting;
            case 'armor':
                return armorSlotSorting;
            default:
                return [];
        }
    })();

    // equipments
    const filteredEquipments = equipments.filter(e => enumArray.includes(e.slotType));
    filteredEquipments.sort((a, b) => enumArray.indexOf(a.slotType) - enumArray.indexOf(b.slotType));

    // tier range
    const tiers = filteredEquipments.map(e => e.tier)
    const minTier = Math.min(...tiers);
    const maxTier = Math.max(...tiers);

    return <Grid container direction='column' spacing={ 3 } style={ { maxHeight: 750 } }>
        <Grid item container spacing={ 8 }>
            <Grid item xs style={ { maxWidth: 100 } }/>
            { Array.from({ length: props.data[0].length }, (_, k) => props.maxTier - props.data[0].length + k + 1).map(t =>
                <Grid item xs style={ { maxWidth: 100, textAlign: 'center' } }>
                    T{ t }
                </Grid>) }
        </Grid>

        { props.data.map((typeIds, i0) => <Grid item container alignItems='center' spacing={ 8 }>
            <Grid item xs style={ { maxWidth: 100 } }>
                { props.types[i0] }
            </Grid>
            { typeIds.map(tierId => <Grid item xs style={ { maxWidth: 100 } }>
                <Item id={ tierId } styles={ styles }/>
            </Grid>) }
        </Grid>) }
    </Grid>;
}
