import React, { useEffect } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { TEquipmentTypes } from '../../shareHolders';
import { appStore } from '../../AppStore';
import { observer } from 'mobx-react';
import { equipmentManager } from '../../shareHolders/EquipmentManager';

interface IItemTableProps extends IDefaultProps {
    variant: TEquipmentTypes;
}

export const EquipmentTable = observer((props: IItemTableProps) => {
    const { variant } = props;
    const { trashGearMarketManager } = appStore.marketManager;

    // equipments
    const filteredEquipments = equipmentManager.equipments.filter(e => e.type === variant);

    useEffect(() => {
        filteredEquipments.sort((a, b) => a.className);
    }, []);


    return <Grid container spacing={ 3 }>
        { filteredEquipments.map(e => <Grid item container xs={ 2 } alignItems='center'>

            <Grid item xs>
                <img alt='item' src={ e.image }/>
            </Grid>

            <Grid item xs>
                <IconButton size='small'
                            onClick={ () => trashGearMarketManager.deductStocksQuantity(e.id) }>
                    <Remove/>
                </IconButton>
            </Grid>

            <Grid item xs>
                <Typography variant='h6' align='center'>
                    { trashGearMarketManager.getStockQuantity(e.id) }
                </Typography>
            </Grid>

            <Grid item xs>
                <IconButton size='small' onClick={ () => trashGearMarketManager.addStocksQuantity(e.id) }>
                    <Add/>
                </IconButton>
            </Grid>

        </Grid>) }
    </Grid>;
});
