import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, Typography } from '@material-ui/core';

interface IEquipmentStocks extends IDefaultProps {
    children: React.ReactNode;
    header: string;
}

export function ItemStocks(props: IEquipmentStocks) {
    const { children, header } = props;

    return <Grid container direction='column' spacing={ 3 }>

        <Grid item>
            <Typography variant='h4'>
                { header }
            </Typography>
        </Grid>

        <Grid item container>
            { children }
        </Grid>
    </Grid>;
}
