import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Container, Mark, Slider } from '@material-ui/core';
import { observer } from 'mobx-react';
import { EPotionIds } from '../../data/itemIds';
import { appStore } from '../../AppStore';
import { potionRates } from '../../configs/potionRates';

export const PotionTable = observer((props: IDefaultProps) => {
    const { potionMarketSupervisor } = appStore.marketManager;
    const { buyingRates, sellingRates } = potionRates;
    const maxPotion = 60;
    const { atk, def, spd, dex, vit, wis, glife } = EPotionIds;

    const rowInfo: { imageUrl: string, id: EPotionIds, sliderColor: string }[] = [
        { id: glife, imageUrl: '', sliderColor: 'lightBlue' },
        { id: atk, imageUrl: 'https://i.imgur.com/kiIMjr9.png', sliderColor: 'violet' },
        { id: def, imageUrl: 'https://i.imgur.com/xSXLjme.png', sliderColor: 'black' },
        { id: spd, imageUrl: 'https://i.imgur.com/R2U76AH.png', sliderColor: 'green' },
        { id: dex, imageUrl: 'https://i.imgur.com/7kXmM0O.png', sliderColor: 'orange' },
        { id: vit, imageUrl: 'https://i.imgur.com/1iHlYrD.png', sliderColor: 'red' },
        { id: wis, imageUrl: 'https://i.imgur.com/WLjcwoA.png', sliderColor: 'blue' },
    ];

    const getMarks = (id: EPotionIds): Mark[] => {
        const sellingRate = sellingRates.get(id);
        if (!sellingRate) {
            return [ { value: 0, label: '0' }, { value: maxPotion, label: '60' } ];
        }

        return Array.from({ length: Math.floor(maxPotion / sellingRate) + 1 }, (v, k) => ({
            value: k * sellingRate,
            label: k.toString(),
        }));
    };

    // equipments
    return <Container>
        { rowInfo.map(({ id, imageUrl, sliderColor }) =>
            <Slider
                value={ potionMarketSupervisor.getStockQuantity(id) }
                id={ id.toString() }
                orientation='vertical'
                defaultValue={ potionMarketSupervisor.getStockQuantity(id) }
                style={ { height: 300, color: sliderColor } }
                marks={ getMarks(id) }
                min={ 0 }
                max={ maxPotion }
                valueLabelDisplay='on'
                onChange={ (_, v) => potionMarketSupervisor.changeStocksQuantity(id, v as number) }
            />
        ) }
    </Container>;
});
