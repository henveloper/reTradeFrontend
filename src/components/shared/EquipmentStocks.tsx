import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, Typography } from '@material-ui/core';
import { EquipmentStocksTable } from './EquipmentStocksTable';
import { TEquipment } from '../../types';

interface IEquipmentStocks extends IDefaultProps {
    variant: TEquipment;
}

export function EquipmentStocks(props: IEquipmentStocks) {
    const { styles, variant } = props;

    return <Grid container direction='column'>

        <Grid item>
            <Typography variant='h6'>
                { props.variant }
            </Typography>
        </Grid>

        <Grid item container>
            <EquipmentStocksTable styles={ styles } variant={ variant }/>
        </Grid>
    </Grid>;
}
