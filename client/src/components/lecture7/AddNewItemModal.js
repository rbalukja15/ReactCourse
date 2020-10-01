import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {InputLabel, Input, FormControl, Divider} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {connect} from "react-redux";
import {addItem} from "../../redux/actions/itemActions";

const AddNewItemModal = props => {

    const [open, setOpen] = useState(false);
    const [itemData, setItemData] = useState({});

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;

        const newItemData = {
            ...itemData,
            [name]: value
        }

        setItemData(newItemData);
    }

    const handleSubmit = () => {
        props.addItem(itemData);
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
                <Divider/>
                <DialogContent>
                    <div>
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
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel id="name-label-id">
                                Origin:
                            </InputLabel>

                            <Input
                                name="origin"
                                onChange={handleInputChange}
                                style={{ marginBottom: theme.spacing(2) }}
                                placeholder={"Origin..."}
                                required={true}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel id="name-label-id">
                                Price
                            </InputLabel>

                            <Input
                                name="price"
                                onChange={handleInputChange}
                                style={{ marginBottom: theme.spacing(2) }}
                                placeholder={"Price..."}
                                required={true}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <InputLabel id="name-label-id">
                                Quantity:
                            </InputLabel>

                            <Input
                                name="quantity"
                                onChange={handleInputChange}
                                style={{ marginBottom: theme.spacing(2) }}
                                placeholder={"Quantity..."}
                                required={true}
                            />
                        </FormControl>
                    </div>
                </DialogContent>
                <Divider/>
                <DialogActions>
                    <Button autoFocus
                            onClick={handleClose}
                            variant={"outlined"}
                            color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={"outlined"}
                        color={"primary"}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

//Map dispatch to props
const mapDispatchToProps = {
    addItem
}

export default connect(null, mapDispatchToProps)(AddNewItemModal);