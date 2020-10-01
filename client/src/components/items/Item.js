import React, { Component } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import DisplayDataModal from "../DisplayDataModal";
import DisplayDataModalClass from "../lecture7/DisplayDataModalClass";
import AddNewItemModal from "../lecture7/AddNewItemModal";
import ShowDetails from "../lecture7/ShowDetails";
import {connect} from "react-redux"; 
import {Button} from "@material-ui/core";
import {getItems, deleteItem, addItem} from "../../redux/actions/itemActions";

class Item extends Component {
    state = {
        items: [],
    }

    componentDidMount() {
        this._getData();
    }

    _getData = () => {
        this.props.getItems();
    }

    render() {

        const {items} = this.props;
        console.log(this.props);
        const columns = [
            "Name",
            "Date",
            "Display Data",
            "Delete",

        ];

        const options = {
            filterType: "dropdown",
            responsive: "vertical",
            isRowSelectable: function(dataIndex) {
                return true;
            }
        };

        const data = items.map( item => (
             [
                item.name,
                item.date,
                <DisplayDataModal
                    key={item._id}
                    itemData={item}
                />,
                <Button
                    variant={"outlined"}
                    color={"danger"}
                    onClick={() => this.props.deleteItem(item._id)}
                >
                    Delete
                </Button>
            ]
        ) )

        return (
            <React.Fragment>
                <AddNewItemModal
                    refreshTable={this._getData}
                    addItem={this.props.addItem}
                />
                {
                    data.length ? (<MUIDataTable
                        title={"List of Items"}
                        data={data}
                        columns={columns}
                        options={options}
                    />) : null
                }
            </React.Fragment>
        );
    }
}

//Mapping function
//Allow to take the items state and maps it into a component property
const mapStateToProps = state => ({
    items: state.items,
});

// Allow to take the item actions and map them to the component props
const mapDispatchToProps = {
    getItems,
    deleteItem,
    addItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
