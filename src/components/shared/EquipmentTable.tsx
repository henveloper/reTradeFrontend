import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { appStore } from '../../AppStore';
import { observer } from 'mobx-react';
import { classEquipments } from '../../types';
import { EClasses } from '../../shareHolders';
import { Equipment, equipmentManager } from '../../shareHolders/EquipmentManager';
import { ArrowDropDown, ArrowDropDownRounded, ArrowDropUpRounded, Error } from '@material-ui/icons';

interface IEquipmentItemProps extends IDefaultProps {
    equipment?: Equipment,
}

const EquipmentItem = observer((props: IEquipmentItemProps) => {
    const { equipmentMarketSupervisor } = appStore.marketManager;
    const { equipment } = props;

    if (!equipment) {
        return <Error/>;
    }

    return <Grid container alignItems='center'>
        <Grid item xs>
            <img src={ equipment.imageUrl } alt='*'/>
        </Grid>
        <Grid item container direction='column' alignItems='center' xs>
            <Grid item>
                <IconButton size='small' onClick={ () => equipmentMarketSupervisor.incrementStock(equipment.id) }>
                    <ArrowDropUpRounded/>
                </IconButton>
            </Grid>
            <Grid item>
                <Typography variant='caption'>
                    { equipmentMarketSupervisor.getStockQuantity(equipment.id) }
                </Typography>
            </Grid>
            <Grid item>
                <IconButton size='small' onClick={ () => equipmentMarketSupervisor.decrementStock(equipment.id) }>
                    <ArrowDropDownRounded/>
                </IconButton>
            </Grid>
        </Grid>
    </Grid>;
});

export const EquipmentTable = observer((props: IDefaultProps) => {
    const { styles } = props;
    // equipments
    const classImages = [
        'https://www.realmeye.com/s/a/img/wiki/Rogue.PNG',
        'https://www.realmeye.com/s/a/img/wiki/Archer_0.PNG',
        'https://www.realmeye.com/s/a/img/wiki/Wizard_0.PNG',
        'https://www.realmeye.com/s/a/img/wiki/Priest_1.PNG',
        'https://www.realmeye.com/s/a/img/wiki/Warrior_1.PNG',
        'https://www.realmeye.com/s/a/img/wiki/Knight_1.PNG',
        'https://www.realmeye.com/s/a/img/wiki/Paladin.PNG',
        'https://www.realmeye.com/s/a/img/wiki/assassin_0.PNG',
        'https://www.realmeye.com/s/a/img/wiki/Necromancer.png',
        'https://www.realmeye.com/s/a/img/wiki/Huntress.png',
        'https://www.realmeye.com/s/a/img/wiki/Mystic_0.png',
        'https://www.realmeye.com/s/a/img/wiki/Trickster_0.PNG',
        'https://www.realmeye.com/s/a/img/wiki/Sorcerer_0.png',
        'https://www.realmeye.com/s/a/img/wiki/ninja_3.png',
        'https://i.imgur.com/fCSXHwv.png',
        'https://i.imgur.com/SyW1gzN.png',
    ];

    return <Grid container spacing={ 3 }>
        { classEquipments.map((v, i) => <Grid item container direction='column' alignItems='center' xs={ 3 }>
            <Grid item container justify='center'>
                <img src={ classImages[i] } alt={ EClasses[v[0]] }
                     style={ { width: '25%' } }/>
            </Grid>
            <Grid item>
                <Typography variant='body2' style={ { textTransform: 'capitalize' } }>
                    { EClasses[v[0]] }
                </Typography>
            </Grid>

            <Grid item container>
                { [
                    equipmentManager.findEquipment(v[1].weaponClass, 12),
                    equipmentManager.findEquipment(v[1].abilityClass, 6),
                    equipmentManager.findEquipment(v[1].armorClass, 13),
                ].map(e => <Grid item>
                    <EquipmentItem styles={ styles } equipment={ e }/>
                </Grid>) }
            </Grid>
        </Grid>) }
    </Grid>;
});
