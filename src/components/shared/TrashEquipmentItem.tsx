import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { appStore } from '../../AppStore';
import { ExposureNeg1, PlusOne } from '@material-ui/icons';
import { observer } from 'mobx-react';

interface IItemProps extends IDefaultProps {
    id: number,
}

export const TrashEquipmentItem = observer((props: IItemProps) => {
    const { marketManager: { trashEquipmentManager } } = appStore;
    const { id } = props;

    const quantity = trashEquipmentManager.getStockQuantity(id);
    return <Grid container alignItems='center'>
        <Grid item xs={ 8 }>
            <Typography variant={ quantity ? 'h6' : 'body2' }>
                { quantity }
            </Typography>
        </Grid>

        <Grid item container xs={ 4 } direction='column'>
            <Grid item>
                <IconButton size='small' onClick={ () => trashEquipmentManager.addStocksQuantity(props.id) }>
                    <PlusOne/>
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton size='small' onClick={ () => trashEquipmentManager.deductStocksQuantity(props.id) }>
                    <ExposureNeg1/>
                </IconButton>
            </Grid>
        </Grid>
    </Grid>;
});
