import React, { useState } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import { appStore } from '../../AppStore';

export function Requester(props: IDefaultProps) {

    const [ token, setToken ] = useState('');

    return <Grid container alignItems='center'>

        <Grid item>
            <TextField value={ token }
                       onChange={ e => setToken(e.target.value) }
                       fullWidth
            />
        </Grid>

        <Grid item>
            <Button variant='contained' onClick={() => appStore.sendOffer(token)}>
                Send offer
            </Button>
        </Grid>
    </Grid>;
}
