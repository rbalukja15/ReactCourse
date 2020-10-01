import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {InputLabel, Input, FormControl} from "@material-ui/core";
import moment from "moment";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import axios from "axios";

const AddNewItemModal = props => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = e => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        const newItem = {
            name: name
        }

        props.addItem(newItem);
        props.refreshTable();
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                    style={{ margin: theme.spacing(2) }}
            >
                Add an Item
            </Button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Display Item Data</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel id="name-label-id">
                            Item Name:
                        </InputLabel>

                        <Input
                            name="name"
                            onChange={handleInputChange}
                            style={{ marginBottom: theme.spacing(2) }}
                            placeholder={"Item name..."}
                            required={true}
                        />
                        <Button
                            variant={"outlined"}
                            color={"primary"}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </FormControl>
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

export default AddNewItemModal;