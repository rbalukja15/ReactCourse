import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {InputLabel, Input, FormControl} from "@material-ui/core";
import PropTypes from 'prop-types';
import moment from "moment";
import {getItemById} from "../redux/actions/itemActions";
import {connect} from "react-redux";

function DisplayDataModal(props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [itemData, setItemData] = useState({});

    const handleClickOpen = () => {
        props.getItemById(props.itemId).then((data) => {
            setItemData(data.payload)
            setOpen(true);
        });
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
                    <div>
                        <FormControl>
                            <InputLabel id="name-label-id">
                                Item Name:
                            </InputLabel>

                            <Input
                                name="name"
                                defaultValue={itemData.name}
                                onChange={handleInputChange}
                                style={{ marginBottom: theme.spacing(2) }}
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
                                defaultValue={itemData.origin}
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
                                defaultValue={itemData.price}
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
                                defaultValue={itemData.quantity}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
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
                        </FormControl>
                    </div>
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
    itemId: PropTypes.string.isRequired,

}

DisplayDataModal.defaultProps = {
    item: '',
}

// Allow to take the item actions and map them to the component props
const mapDispatchToProps = {
    getItemById,
}

export default connect(null, mapDispatchToProps)(DisplayDataModal);