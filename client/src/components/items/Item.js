import React, { Component } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import DisplayDataModal from "../DisplayDataModal";
import DisplayDataModalClass from "../lecture7/DisplayDataModalClass";
import AddNewItemModal from "../lecture7/AddNewItemModal";
import ShowDetails from "../lecture7/ShowDetails";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";

class Item extends Component {
    state = {
        items: [],
    }

    componentDidMount() {
        //this._getData();
        //this.props.getItems();
        console.log(this.props.items);
        this.setState({items: this.props.items})
    }

    _getData = () => {
        axios.get('/api/items')
            .then(res => {
                this.setState({items: res.data})
            });
    }

    render() {

        const {items} = this.props;

        const columns = [
            "Name",
            "Date",
            "Actions",
            "Class Action"
        ];

        const options = {
            filterType: "dropdown",
            responsive: "vertical",
            isRowSelectable: function(dataIndex) {
                return true;
            }
        };

        const data = items.map( item => {
            return [
                item.name,
                item.date,
                <DisplayDataModal
                    key={item._id}
                    itemData={item}
                />,
                <DisplayDataModalClass
                    key={item._id}
                    itemData={item}
                />
            ]
        } )

        return (
            <React.Fragment>
                <AddNewItemModal
                    refreshTable={this._getData}
                />
                <Button onClick={() => this.props.getItems()} style={{marginTop: '100px'}}>Click For state update</Button>
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
const mapDispatchToProps = dispatch => ({
    getItems: () => dispatch({type: 'GET_ITEMS'}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Item);
