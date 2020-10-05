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
import {Form, Formik} from "formik";
import FormGroup from "@material-ui/core/FormGroup";

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

    const handleSubmit = values => {
        console.log(values);
        props.addItem(values);
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
                    <Formik initialValues={{ name: "", origin: "", price: "", quantity: "" }}
                            onSubmit={handleSubmit}
                            validate={values => {
                                const errors = {};

                                if (!values.name)
                                    errors.name = "Name Required"

                                return errors;
                            }}
                    >{({
                           values,
                           touched,
                           handleChange,
                           handleBlur,
                           handleSubmit,
                           isSubmitting,
                           isValid,
                           errors
                       }) => (
                        <Form>
                            <FormGroup>
                                <FormControl>
                                    <InputLabel id="name-label-id">
                                        Item Name:
                                    </InputLabel>

                                    <Input
                                        name="name"
                                        onChange={handleChange}
                                        style={{ marginBottom: theme.spacing(2) }}
                                        value={values.name}
                                        onBlur={handleBlur}
                                    />

                                    <span style={{ color: 'red' }}>{(errors.name && touched.name) ? errors.name : ''}</span>
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="name-label-id">
                                        Origin:
                                    </InputLabel>

                                    <Input
                                        name="origin"
                                        onChange={handleChange}
                                        style={{ marginBottom: theme.spacing(2) }}
                                        value={values.origin}
                                        onBlur={handleBlur}
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="name-label-id">
                                        Price
                                    </InputLabel>

                                    <Input
                                        name="price"
                                        onChange={handleChange}
                                        style={{ marginBottom: theme.spacing(2) }}
                                        value={values.price}
                                        onBlur={handleBlur}
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel id="name-label-id">
                                        Quantity:
                                    </InputLabel>

                                    <Input
                                        name="quantity"
                                        onChange={handleChange}
                                        style={{ marginBottom: theme.spacing(2) }}
                                        value={values.quantity}
                                        onBlur={handleBlur}
                                    />
                                </FormControl>
                                <Button type="submit"
                                        variant={"outlined"}
                                        color={"primary"}
                                        disabled={isSubmitting || !isValid}
                                >
                                    Submit
                                </Button>
                            </FormGroup>
                        </Form>
                        )}
                    </Formik>
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