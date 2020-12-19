import React, { ChangeEvent, useState } from 'react';
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

        <Grid item container xs style={ { maxHeight: 480, overflowY: 'scroll' } }>

            <Grid item container spacing={ 1 }>

                <Grid item>
                    <Button fullWidth variant='contained'
                            onClick={ () => marketManager.importStocksString(importField) }>
                        Stocks Import
                    </Button>
                </Grid>

                <Grid item xs>
                    <TextField fullWidth multiline value={ importField }
                               onChange={ (e: ChangeEvent) => setImportField(e.target.nodeValue ?? '') }/>
                </Grid>

            </Grid>

            <Grid item container spacing={ 1 }>

                <Grid item>
                    <CopyToClipboard text={ marketManager.exportString }>
                        <Button fullWidth variant='contained' onClick={ () => appStore.successMessage = 'copied' }>
                            Copy Stocks Export
                        </Button>
                    </CopyToClipboard>
                </Grid>

                <Grid item xs>
                    <TextField fullWidth multiline value={ marketManager.exportString }/>
                </Grid>

            </Grid>

            <Grid item container spacing={ 1 } alignItems='center'>

                <Grid item>
                    <Link href='https://www.realmeye.com/edit-offers-by/SaintBen' variant='button'>
                        RealmEye
                    </Link>
                </Grid>

                <Grid item>
                    <CopyToClipboard text={ marketManager.tradeString }>
                        <Button fullWidth variant='contained' onClick={ () => appStore.successMessage = 'copied' }>
                            Copy Trades String
                        </Button>
                    </CopyToClipboard>
                </Grid>

                <Grid item xs>
                    < TextField fullWidth multiline value={ marketManager.tradeString }/>
                </Grid>

            </Grid>

        </Grid>

        <Grid item container xs direction='column' alignItems='center'>
            <Grid item>
                <Typography variant='h6'>
                    Offers
                </Typography>
            </Grid>

            <Grid item container direction='column' spacing={ 1 }
                  style={ { maxHeight: 480, overflowY: 'scroll', flexWrap: 'nowrap' } }>
                { marketManager.trashGearMarketManager.offers.map(o => <Grid item container alignItems='center'>
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
