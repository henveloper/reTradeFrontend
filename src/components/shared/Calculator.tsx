import React, { useState } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Grid } from '@material-ui/core';
import { appStore } from '../../AppStore';

export function Calculator(props: IDefaultProps) {
    const [ trades, setTrades ] = useState('');


    return <Grid container direction='column' alignItems='center'>

        <Grid item>
            <Button variant='contained' onClick={ () => setTrades(appStore.computeTrades()) }>
                Compute
            </Button>
        </Grid>

        <Grid item>
            { trades }
        </Grid>
    </Grid>;
}
