import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {InputLabel, Input} from "@material-ui/core";
import PropTypes from 'prop-types';
import moment from "moment";

export default function DisplayDataModal(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [itemData, setItemData] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
        setItemData(props.itemData);
    };

    const handleClose = () => {
        setOpen(false);
        setItemData(props.itemData);
    };

    const handleInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        const newItemData = {
            ...itemData,
            [name]: value
        }

        setItemData(newItemData);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Display Data
            </Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Display Item Data</DialogTitle>
                <DialogContent>
                    <InputLabel id="name-label-id">
                        Item Name:
                    </InputLabel>

                    <Input
                        name="name"
                        value={itemData.name}
                        onChange={handleInputChange}
                        style={{ marginBottom: theme.spacing(2) }}
                    />

                    <InputLabel
                        id="date-label-id"
                    >
                        Date
                    </InputLabel>
                    <Input
                        name="date"
                        defaultValue={moment(itemData.date).calendar()}
                        readOnly={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

DisplayDataModal.propTypes = {
    itemData: PropTypes.object.isRequired,
}

DisplayDataModal.defaultProps = {
    itemData: {},
}