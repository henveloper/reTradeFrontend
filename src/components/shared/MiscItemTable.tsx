import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import { appStore } from '../../AppStore';
import { EMiscItem } from '../../shareHolders/MiscMarketSupervisor';

export const MiscItemTable = observer((props: IDefaultProps) => {
    const { miscMarketSupervisor } = appStore.marketManager;

    const rowInfo: { type: string, src: string, id: EMiscItem }[] = [
        { type: 'paraDef', src: 'https://i.imgur.com/FfovjO5.png', id: EMiscItem.paraDef },
        { type: 'inc', src: 'https://i.imgur.com/6iJGy69.png', id: EMiscItem.inc },
        { type: 'humanEgg', src: 'https://i.ibb.co/YDmcW5W/egg.jpg', id: EMiscItem.humanoidEgg },
    ];

    // equipments
    return <Grid container spacing={ 6 }>
        { rowInfo.map(i => <Grid item container xs alignItems='center' spacing={ 1 }>
            <Grid item xs>
                <img style={ { width: '100%' } } alt={ i.type } src={ i.src }/>
            </Grid>
            <Grid item xs>
                <TextField fullWidth size='small' variant='standard'
                           onChange={ e => miscMarketSupervisor.changeStocksQuantity(i.id, e.target.value) }
                           value={ miscMarketSupervisor.getStockQuantity(i.id) }/>
            </Grid>
        </Grid>) }

        { Array.from({ length: 6 - rowInfo.length }, _ => <Grid item xs/>) }


    </Grid>;
});
