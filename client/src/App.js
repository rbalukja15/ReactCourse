import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
//Navigation
import AppNavbar from './components/navigation/AppNavbar';
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import DisplayDataModal from "./components/DisplayDataModal";
import DisplayDataModalClass from "./components/lecture7/DisplayDataModalClass";
import ChildrenProp from "./components/lecture4/ChildrenProp";
import AddNewItemModal from "./components/lecture7/AddNewItemModal";
import ShowDetails from "./components/lecture7/ShowDetails";

class App extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    state = {
        items: [],
    }

  componentDidMount() {
      this._getData();
  }

  _getData = () => {
      axios.get('/api/items')
          .then(res => {
              this.setState({items: res.data})
          });
  }

  render() {

    const { items }  = this.state;

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
      <div className="App">
        <AppNavbar>
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
        </AppNavbar>
      </div>
    );
  }
}

export default App;
