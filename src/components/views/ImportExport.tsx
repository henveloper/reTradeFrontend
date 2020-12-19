import React, { useState } from 'react';
import { IDefaultProps } from '../../styles/styles';
import { Button, Grid, Link, TextField, Typography } from '@material-ui/core';
import { appStore } from '../../AppStore';
import CopyToClipboard from 'react-copy-to-clipboard';
import { observer } from 'mobx-react';
import { equipmentManager } from '../../shareHolders/EquipmentManager';
import { EPotionIds } from '../../data/itemIds';

export const ImportExport = observer((props: IDefaultProps) => {
    const { marketManager } = appStore;
    const [ importField, setImportField ] = useState('');

    return <Grid container spacing={ 1 }>

        <Grid item container direction='column' alignItems='center' xs style={ { height: 480, overflowY: 'hidden' } }
              spacing={ 1 }>

            <Grid item container direction='column' xs>
                <Grid item>
                    <Button fullWidth variant='contained'
                            onClick={ () => marketManager.importStocksString(importField) }>
                        Stocks Import
                    </Button>
                </Grid>

                <Grid item>
                    <TextField variant='outlined' fullWidth multiline value={ importField }
                               onChange={ e => setImportField(e.target.value) }/>
                </Grid>
            </Grid>

            <Grid item container direction='column' xs>
                <TextField helperText='export' variant='outlined' fullWidth multiline
                           value={ marketManager.exportString }/>
            </Grid>

        </Grid>

        <Grid item container direction='column' alignItems='center' xs
              style={ { height: 480, overflowY: 'hidden', flexWrap: 'nowrap' } }
              spacing={ 1 }>

            <Grid item>
                <Link href='https://www.realmeye.com/edit-offers-by/SaintBen' variant='button'>
                    RealmEye
                </Link>
            </Grid>

            <Grid item>
                <CopyToClipboard text={ marketManager.tradeString }>
                    <Button fullWidth variant='outlined' onClick={ () => appStore.successMessage = 'copied' }>
                        Copy Offer (equipment preview)
                    </Button>
                </CopyToClipboard>
            </Grid>

            <Grid item container direction='column' spacing={ 1 }
                  style={ { maxHeight: 400, overflowY: 'scroll', flexWrap: 'nowrap' } }>
                { marketManager.trashGearMarketSupervisor.offers.map(o => <Grid item container alignItems='center'>
                    <Grid item container xs spacing={ 1 }>
                        { o.sellingItems.map(i => {
                            const equipment = equipmentManager.getEquipmentById(i);
                            return <Grid item container xs={ 3 }>
                                <img alt={ equipment?.name ?? i.toString() }
                                     src={ equipmentManager.getEquipmentById(i)?.image }/>
                            </Grid>;
                        }) }
                    </Grid>

                    <Grid item container xs>
                        <Typography>
                            { o.buyingItems
                                .map(id => EPotionIds[+id])
                                .map((name, i) => `${ o.buyingQuantities[i] } ${ name }`)
                                .join(' + ')
                            }
                        </Typography>
                    </Grid>
                </Grid>) }
            </Grid>
        </Grid>
    </Grid>;
});
