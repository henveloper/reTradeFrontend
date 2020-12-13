import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, Typography } from '@material-ui/core';
import { EquipmentStocksTable } from './EquipmentStocksTable';
import { TEquipmentTypes } from '../../types';

interface IEquipmentStocks extends IDefaultProps {
    variant: TEquipmentTypes;
}

export function EquipmentStocks(props: IEquipmentStocks) {
    const { styles, variant } = props;

    return <Grid container direction='column' spacing={ 3 }>

        <Grid item>
            <Typography variant='h4'>
                { props.variant }
            </Typography>
        </Grid>

        <Grid item container>
            <EquipmentStocksTable styles={ styles } variant={ variant }/>
        </Grid>
    </Grid>;
}
