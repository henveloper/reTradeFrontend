import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { IArmorIds } from '../../types';
import { appStore } from '../../AppStore';

export function Armors(props: IDefaultProps) {
    const { styles } = props;
    const ids: IArmorIds = {
        robe: {
            13: 2692,
            11: 2631,
            12: 2827,
        },
        light: {
            13: 2692,
            11: 2631,
            12: 2827,
        },
        heavy: {
            13: 2692,
            11: 2631,
            12: 2827,
        },
    };

    return <Grid container direction='column'>

        <Grid item>
            <Typography variant='h6'>
                Weapons
            </Typography>
        </Grid>

        <Grid item container>
            <Button onClick={() => appStore.parse()} variant='text'>
                parse
            </Button>
        </Grid>
    </Grid>;
}
