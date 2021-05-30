import React from 'react';
import { IDefaultProps } from '../../styles/styles';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import { observer } from 'mobx-react';
import { IOffer } from '../../shareHolders';
import { images } from '../../data/images';

interface IOfferTableProps extends IDefaultProps {
    offers: IOffer[];
}

export const OfferTable = observer((props: IOfferTableProps) => {
    const { offers } = props;

    return <TableContainer component={ Paper }>
        <Table size='small' style={ { width: '100%' } }>
            <TableHead>
                <TableRow>
                    <TableCell>Selling</TableCell>
                    <TableCell>Buying</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { offers.map((offer, i) => (
                    <TableRow key={ i }>
                        <TableCell>
                            <Grid item container alignItems='center'>
                                <Grid item>
                                    <img src={ images.get(offer.sellingItems[0]!) ?? '' }/>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        x{ offer.sellingQuantities }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            <Grid item container alignItems='center'>
                                <Grid item>
                                    <img src={ images.get(offer.buyingItems[0]!) ?? '' }/>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        x{ offer.buyingQuantities }
                                    </Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                    </TableRow>
                )) }
            </TableBody>
        </Table>
    </TableContainer>;
});
