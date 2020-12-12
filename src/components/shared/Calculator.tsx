import React, { useState } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import { appStore } from '../../AppStore';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export function Calculator(props: IDefaultProps) {
    const [ trades, setTrades ] = useState('');


    return <Grid container direction='column' alignItems='center' spacing={ 1 }>

        <Grid item container spacing={ 3 }>
            <Grid item xs>
                <Button fullWidth variant='contained' onClick={ () => setTrades(appStore.computeTradesString()) }>
                    Compute
                </Button>
            </Grid>
            { trades && <Grid item xs>
                <CopyToClipboard text={ trades }>
                    <Button fullWidth variant='contained' onClick={ () => appStore.successMessage = 'copied' }>
                        copy
                    </Button>
                </CopyToClipboard>
            </Grid> }
        </Grid>

        { trades && <Grid item container style={ { overflowY: 'scroll', maxHeight: 150 } }>
            < TextField fullWidth multiline value={ trades } variant='outlined'/>
        </Grid> }
    </Grid>;
}
