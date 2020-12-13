import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { EPotionId } from '../../data/EPotionId';
import { appStore } from '../../AppStore';

export const PotionTable = observer((props: IDefaultProps) => {
    const { stockManager } = appStore;

    const rowInfo: { type: string, src: string, id: EPotionId }[] = [
        { type: 'atk', src: 'https://i.imgur.com/kiIMjr9.png', id: EPotionId.atk },
        { type: 'def', src: 'https://i.imgur.com/xSXLjme.png', id: EPotionId.def },
        { type: 'spd', src: 'https://i.imgur.com/R2U76AH.png', id: EPotionId.spd },
        { type: 'dex', src: 'https://i.imgur.com/7kXmM0O.png', id: EPotionId.dex },
        { type: 'vit', src: 'https://i.imgur.com/1iHlYrD.png', id: EPotionId.vit },
        { type: 'wis', src: 'https://i.imgur.com/WLjcwoA.png', id: EPotionId.wis },
    ];

    // equipments
    return <Grid container direction='column' spacing={ 3 }>
        { rowInfo.map(i => <Grid item container alignItems='center'>
            <Grid item xs={ 1 }>
                <img style={ { width: '100%' } } alt={ i.type } src={ i.src }/>
            </Grid>
            <Grid item xs={ 11 }>
                <TextField fullWidth size='small' variant='outlined'
                           onChange={ e => stockManager.changeStocksQuantity(i.id, e.target.value || '0') }
                           value={ stockManager.getStockQuantity(i.id) }/>
            </Grid>
        </Grid>) }
    </Grid>;
});
