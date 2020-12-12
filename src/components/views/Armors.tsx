import React, { useEffect, useState } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { appStore } from '../../AppStore';

export function Armors(props: IDefaultProps) {
    const { styles } = props;

    return <Grid container direction='column'>

        <Grid item>
            <Typography variant='h6'>
                Weapons
            </Typography>
        </Grid>

        <Grid item container>

        </Grid>
    </Grid>;
}
