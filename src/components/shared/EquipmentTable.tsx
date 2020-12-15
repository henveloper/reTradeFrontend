import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
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


    return <Grid container spacing={ 3 }>
        { filteredEquipments.map(e => <Grid item container xs={ 2 } alignItems='center'>

            <Grid item xs>
                <img alt='item' src={images.equipment[e.className][e.tier]}/>
            </Grid>

            <Grid item xs>
                <IconButton size='small'
                            onClick={ () => appStore.stockManager.deductStocksQuantity(e.id) }>
                    <Remove/>
                </IconButton>
            </Grid>

            <Grid item xs>
                <Typography variant='h6' align='center'>
                    { appStore.stockManager.getStockQuantity(e.id) }
                </Typography>
            </Grid>

            <Grid item xs>
                <IconButton size='small' onClick={ () => appStore.stockManager.addStocksQuantity(e.id) }>
                    <Add/>
                </IconButton>
            </Grid>

        </Grid>) }
    </Grid>;
});
