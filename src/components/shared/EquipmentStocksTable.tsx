import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { Equipment, equipments, } from '../../data/equipments';
import { EEquipmentSlot, TEquipment } from '../../types';
import { appStore } from '../../AppStore';

interface IItemTableProps extends IDefaultProps {
    variant: TEquipment;
}

export function EquipmentStocksTable(props: IItemTableProps) {
    const { styles, variant } = props;

    const enumArray: EEquipmentSlot[] = (() => {
        switch (variant) {
            case 'weapon':
                return Equipment.weaponSlotTypes;
            case 'ability':
                return Equipment.abilitySlotTypes;
            case 'armor':
                return Equipment.armorSlotTypes;
            default:
                return [];
        }
    })();

    // equipments
    const filteredEquipments = equipments.filter(e => enumArray.includes(e.slotType));
    filteredEquipments.sort((a, b) => enumArray.indexOf(a.slotType) - enumArray.indexOf(b.slotType));

    // tier range
    const tiers = filteredEquipments.map(e => e.tier);
    const minTier = Math.min(...tiers);
    const maxTier = Math.max(...tiers);

    return <Grid container direction='column' spacing={ 3 } style={ { maxHeight: 750 } }>
        { filteredEquipments.map(e => <Grid item container>
            <Grid item xs={ 2 }>
                { e.className }
            </Grid>
            <Grid item xs={ 1 }>
                T{ e.tier }
            </Grid>
            <Grid item xs={ 3 }>
                { e.name }
            </Grid>
            <Grid item xs={ 2 }>
                <Button fullWidth variant='outlined'>
                    +
                </Button>
            </Grid>
            <Grid item xs={ 2 }>
                { appStore.stocks.find(s => s.id === e.id)?.quantity }
            </Grid>
            <Grid item xs={ 2 }>
                <Button fullWidth variant='outlined'>
                    -
                </Button>
            </Grid>
        </Grid>) }
    </Grid>;
}
