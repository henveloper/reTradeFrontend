import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { appStore } from '../../AppStore';
import { ExposureNeg1, PlusOne } from '@material-ui/icons';

interface IItemProps extends IDefaultProps {
    id: number,
}


export function Item(props: IItemProps) {

    return <Grid container alignItems='center'>
        <Grid item xs={ 8 }>
            <Typography variant='body2'>
                { appStore.stocks.find(t => t.id === props.id)?.quantity || 0 }
            </Typography>
        </Grid>

        <Grid item container xs={ 4 } direction='column'>
            <Grid item>
                <IconButton size='small' onClick={ () => appStore.addStocksQuantity(props.id) }>
                    <PlusOne/>
                </IconButton>
            </Grid>

            <Grid item>
                <IconButton size='small'  onClick={ () => appStore.deductStocksQuantity(props.id) }>
                    <ExposureNeg1/>
                </IconButton>
            </Grid>
        </Grid>
    </Grid>;
}
