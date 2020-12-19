import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, Switch, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { EPotionIds } from '../../data/itemIds';
import { appStore } from '../../AppStore';

export const PotionTable = observer((props: IDefaultProps) => {
    const { potionMarketSupervisor } = appStore.marketManager;

    const rowInfo: { type: string, src: string, id: EPotionIds }[] = [
        { type: 'atk', src: 'https://i.imgur.com/kiIMjr9.png', id: EPotionIds.atk },
        { type: 'def', src: 'https://i.imgur.com/xSXLjme.png', id: EPotionIds.def },
        { type: 'spd', src: 'https://i.imgur.com/R2U76AH.png', id: EPotionIds.spd },
        { type: 'dex', src: 'https://i.imgur.com/7kXmM0O.png', id: EPotionIds.dex },
        { type: 'vit', src: 'https://i.imgur.com/1iHlYrD.png', id: EPotionIds.vit },
        { type: 'wis', src: 'https://i.imgur.com/WLjcwoA.png', id: EPotionIds.wis },
    ];

    // equipments
    return <Grid container spacing={ 6 }>
        { rowInfo.map(i => <Grid item container xs alignItems='center'>
            <Grid item xs>
                <img style={ { width: '100%' } } alt={ i.type } src={ i.src }/>
            </Grid>
            <Grid item xs>
                <Switch checked={ potionMarketSupervisor.checkout.get(i.id) }
                        onChange={ () => potionMarketSupervisor.toggleUpgradeOnly(i.id) }
                        size='small'/>
            </Grid>
            <Grid item xs>
                <TextField fullWidth size='small' variant='standard'
                           onChange={ e => potionMarketSupervisor.changeStocksQuantity(i.id, e.target.value) }
                           value={ potionMarketSupervisor.getStockQuantity(i.id) }/>
            </Grid>
        </Grid>) }


    </Grid>;
});
