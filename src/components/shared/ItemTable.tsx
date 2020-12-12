import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Grid } from '@material-ui/core';
import { Item } from './Item';

interface IItemTableProps extends IDefaultProps {
    data: number[][];
    types: string[];
    maxTier: number;
}

export function ItemTable(props: IItemTableProps) {
    const { styles } = props;

    return <Grid container direction='column' spacing={ 3 }>
        <Grid item container spacing={ 8 }>
            <Grid item xs style={ { maxWidth: 100 } }/>
            { Array.from({ length: props.data[0].length }, (_, k) => props.maxTier - props.data[0].length + k + 1).map(t =>
                <Grid item xs style={ { maxWidth: 100, textAlign: 'center' } }>
                    T{ t }
                </Grid>) }
        </Grid>

        { props.data.map((typeIds, i0) => <Grid item container alignItems='center' spacing={ 8 }>
            <Grid item xs style={ { maxWidth: 100 } }>
                { props.types[i0] }
            </Grid>
            { typeIds.map(tierId => <Grid item xs style={ { maxWidth: 100 } }>
                <Item id={ tierId } styles={ styles }/>
            </Grid>) }
        </Grid>) }
    </Grid>;
}
