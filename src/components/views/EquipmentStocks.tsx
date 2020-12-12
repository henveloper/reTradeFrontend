import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, Typography } from '@material-ui/core';
import { ItemTable } from '../shared/ItemTable';

interface IEquipmentStocks extends IDefaultProps {
    data: number[][];
    types: string[];
    maxTier: number;
    type: string;
}

export function EquipmentStocks(props: IEquipmentStocks) {
    const { styles } = props;

    return <Grid container direction='column'>

        <Grid item>
            <Typography variant='h6'>
                {props.type}
            </Typography>
        </Grid>

        <Grid item container>
            <ItemTable data={ props.data } styles={ styles } types={ props.types } maxTier={ props.maxTier }/>
        </Grid>
    </Grid>;
}
