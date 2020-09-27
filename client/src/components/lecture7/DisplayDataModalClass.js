import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {InputLabel, Input} from "@material-ui/core";
import moment from "moment";

class DisplayDataModalClass extends React.Component{

    state = {
        open: false,
        itemData: {
            _id: 0,
            name: '',
            date: ''
        },
    }

    componentDidMount() {
        this.setState({itemData: this.props.itemData})
    }

    toggleModal = () => {

        this.setState({
            open: !this.state.open,
            itemData: this.props.itemData
        });
    }

    handleInputChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        const {itemData} = this.state;

        const newItemData = {
            ...itemData,
            [name]: value
        }
        this.setState({
            itemData: newItemData
        });
    }

    render() {

        const { open, itemData } = this.state;

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.toggleModal}>
                    Display Data Class
                </Button>

                <Dialog
                    //fullScreen={fullScreen}
                    open={open}
                    onClose={this.toggleModal}
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
                            onChange={this.handleInputChange}
                            style={{ marginBottom: "2rem" }}
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
                        <Button autoFocus onClick={this.toggleModal} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.toggleModal} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

DisplayDataModalClass.propTypes = {
    open: PropTypes.bool,
    itemData: PropTypes.object.isRequired,
}

DisplayDataModalClass.defaultProps = {
    open: false,
    itemData: {},
}

export default DisplayDataModalClass;