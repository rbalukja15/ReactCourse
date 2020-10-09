import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import DisplayDataModal from "../DisplayDataModal";
import AddNewItemModal from "../lecture7/AddNewItemModal";
import {connect} from "react-redux"; 
import {Button} from "@material-ui/core";
import {getItems, deleteItem, addItem, getItemById} from "../../redux/actions/itemActions";

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
                    itemId={item._id}
                />,
                <Button
                    variant={"outlined"}
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
    items: state.item.items,
});

// Allow to take the item actions and map them to the component props
const mapDispatchToProps = {
    getItems,
    deleteItem,
    addItem,
    getItemById,
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);
