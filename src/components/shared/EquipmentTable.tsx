import React, { useEffect } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { TEquipmentTypes } from '../../shareHolders';
import { appStore } from '../../AppStore';
import { observer } from 'mobx-react';
import { equipmentManager } from '../../shareHolders/EquipmentManager';
import { trace } from 'mobx';

interface IItemTableProps extends IDefaultProps {
    variant: TEquipmentTypes;
    dense?: true;
}

export const EquipmentTable = observer((props: IItemTableProps) => {
    const { variant } = props;
    const { equipmentMarketSupervisor } = appStore.marketManager;

    // equipments
    const filteredEquipments = equipmentManager.equipments.filter(e => e.type === variant);

    return <Grid container spacing={ 3 }>
        { filteredEquipments.map(e => <Grid item container xs={ 2 } alignItems='center'>

            <Grid item xs>
                <img alt='item' src={ e.image }/>
            </Grid>

            <Grid item xs>
                <IconButton size='small'
                            onClick={ () => equipmentMarketSupervisor.deductStocksQuantity(e.id) }>
                    <Remove/>
                </IconButton>
            </Grid>

            <Grid item xs>
                <Typography variant='h6' align='center'>
                    { equipmentMarketSupervisor.getStockQuantity(e.id) }
                </Typography>
            </Grid>

            <Grid item xs>
                <IconButton size='small' onClick={ () => equipmentMarketSupervisor.incrementStock(e.id) }>
                    <Add/>
                </IconButton>
            </Grid>

        </Grid>) }
    </Grid>;
});
