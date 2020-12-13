import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Grid } from '@material-ui/core';
import { Equipment, equipments, } from '../../data/equipments';
import { EEquipmentSlot, TEquipmentTypes } from '../../types';
import { appStore } from '../../AppStore';
import { observer } from 'mobx-react';
import { images } from '../../data/images';

interface IItemTableProps extends IDefaultProps {
    variant: TEquipmentTypes;
}

export const EquipmentTable = observer((props: IItemTableProps) => {
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


    return <Grid container direction='column' spacing={ 3 }
                 style={ { maxHeight: 750, overflowY: 'scroll', flexWrap: 'nowrap' } }>
        { filteredEquipments.map(e => <Grid item container alignItems='center'>
            <Grid item xs={ 2 }>
                <img style={ { width: '100%' } } alt={ e.className } src={ images.equipment[e.className] }/>
            </Grid>
            <Grid item xs={ 1 }>
                T{ e.tier }
            </Grid>
            <Grid item xs={ 3 }>
                { e.name }
            </Grid>
            <Grid item xs={ 2 }>
                <Button fullWidth variant='outlined'
                        onClick={ () => appStore.stockManager.deductStocksQuantity(e.id) }>
                    -
                </Button>
            </Grid>
            <Grid item xs={ 2 } style={ { textAlign: 'center' } }>
                { appStore.stockManager.getStockQuantity(e.id) }
            </Grid>
            <Grid item xs={ 2 }>
                <Button fullWidth variant='outlined' onClick={ () => appStore.stockManager.addStocksQuantity(e.id) }>
                    +
                </Button>
            </Grid>
        </Grid>) }
    </Grid>;
});
