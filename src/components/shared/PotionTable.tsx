import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, Slider, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { EPotionIds } from '../../data/itemIds';
import { appStore } from '../../AppStore';
import { OfferTable } from './OfferTable';

export const PotionTable = observer((props: IDefaultProps) => {
    const { styles } = props;
    const { potionMarketSupervisor } = appStore.marketManager;
    const { atk, def, spd, dex, vit, wis, glife } = EPotionIds;

    const rowInfo: { id: EPotionIds, sliderColor: string }[] = [
        { id: atk, sliderColor: 'violet' },
        { id: def, sliderColor: 'black' },
        { id: spd, sliderColor: 'green' },
        { id: dex, sliderColor: 'orange' },
        { id: vit, sliderColor: 'red' },
        { id: wis, sliderColor: 'blue' },
    ];

    // equipments
    return <Grid item container>
        <Grid item container xs direction='column'>
            <Grid item container direction='column' spacing={ 1 }>
                <Grid item>
                    <Typography variant='h6'>
                        Life / Mana Settings
                    </Typography>
                </Grid>
                <Grid item container justify='center'>
                    <Grid item xs>
                        <Slider
                            value={ potionMarketSupervisor.lifeToRainbowSliderValue }
                            marks={ [
                                { value: 0, label: 'off' },
                                { value: 1, label: 'l' },
                                { value: 2, label: 'gl' },
                            ] }
                            valueLabelDisplay='off'
                            onChange={ (_, v) => potionMarketSupervisor.changeLifeToRainbowSource(v as number) }
                            min={ 0 } max={ 2 }
                            style={ { width: '80%', color: 'lightblue' } }
                        />
                    </Grid>

                    <Grid item xs>
                        <Slider
                            value={ potionMarketSupervisor.manaToRainbowSliderValue }
                            marks={ [
                                { value: 0, label: 'off' },
                                { value: 1, label: 'm' },
                                { value: 2, label: 'gm' },
                            ] }
                            valueLabelDisplay='off'
                            onChange={ (_, v) => potionMarketSupervisor.changeManaToRainbowSource(v as number) }
                            min={ 0 } max={ 2 }
                            style={ { width: '80%', color: 'yellow' } }
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item container direction='column' spacing={ 1 }>
                <Grid item>
                    <Typography variant='h6'>
                        Rainbows
                    </Typography>
                </Grid>
                <Grid item container justify='center'>
                    { rowInfo.map(({ id, sliderColor }) =>
                        <Slider
                            value={ potionMarketSupervisor.getStockQuantity(id) }
                            id={ id.toString() }
                            orientation='vertical'
                            defaultValue={ potionMarketSupervisor.getStockQuantity(id) }
                            style={ { height: 100, color: sliderColor } }
                            marks
                            min={ 0 }
                            max={ 4 }
                            onChange={ (_, v) => potionMarketSupervisor.changeStocksQuantity(id, v as number) }
                        />
                    ) }
                </Grid>
            </Grid>
        </Grid>

        <Grid item xs justify='center'>
            <OfferTable offers={ potionMarketSupervisor.offers } styles={ styles }/>
        </Grid>
    </Grid>;
});
;
