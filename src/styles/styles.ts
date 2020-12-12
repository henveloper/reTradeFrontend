import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => makeStyles<any, any, styleKeys>(theme => ({
    fullWidth: { width: '100%' },
}));

type styleKeys = 'fullWidth';

export interface IDefaultProps {
    styles: Record<styleKeys, string>;
};
