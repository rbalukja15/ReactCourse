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

// Fragments Demonstration
import Table from "./components/lecture9/FragmentsDemonstration/Table";

//Effect Demonstration
import PersonWithEffect from "./components/lecture9/useEffect/PersonWithEffect"
import moment from "moment";

class App extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    state = {
        items: [],
        myData: {
            name: 'MyName',
            date: Date.now()
        },
        postId: null
    }

  componentDidMount() {
      this._getData();
      this.inputElementRef.current.focus();
  }

  _getData = () => {
      axios.get('/api/items')
          .then(res => {
              this.setState({items: res.data})
          });
  }

    handleMyData = index => {

        this.setState({
            postId: index
        });
    }

  render() {

    const { items, myData }  = this.state;

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

      const dataForUpdate = items.map( (item, index) => {
          return (
              <section
                  key={item._id}
                  onClick={() => this.handleMyData(item._id)}
                  style={{ boxShadow: "3px 3px 3px 3px #9E9E9E", width: '200px' }}
              >
                  {/*<ShowDetails itemData={myData} />*/}
                  <h1>{item.name}</h1>
                  <p>{moment(item.date).calendar()}</p>
                  <input type="text"
                         ref={this.inputElementRef}
                         style={{ marginBottom: "2rem" }}
                  />
              </section>
          )
      } )

    return (
      <div className="App">
        <AppNavbar>
            <AddNewItemModal
                refreshTable={this._getData}
            />
            {/*{*/}
            {/*    data.length ? (<MUIDataTable*/}
            {/*        title={"List of Items"}*/}
            {/*        data={data}*/}
            {/*        columns={columns}*/}
            {/*        options={options}*/}
            {/*    />) : null*/}
            {/*}*/}
            <Table />

            {/*{dataForUpdate.splice(0,2)}*/}

            {/*<section*/}
            {/*    style={{ boxShadow: "3px 3px 3px 3px #9E9E9E", width: '200px' }}*/}
            {/*>*/}
            {/*    <h3>Section Data</h3>*/}
            {/*    <input type={"text"}*/}
            {/*           ref={this.inputElementRef}*/}
            {/*           style={{ marginBottom: "2rem" }}*/}
            {/*    />*/}
            {/*    <ShowDetails postId={this.state.postId}/>*/}
            {/*</section>*/}

            <section
                style={{ boxShadow: "3px 3px 3px 3px #9E9E9E", width: '200px' }}
            >
                <h3>Section Data</h3>
                <input type={"text"}
                       ref={this.inputElementRef}
                       style={{ marginBottom: "2rem" }}
                />
                <PersonWithEffect postId={this.state.postId}/>
            </section>
        </AppNavbar>
      </div>
    );
  }
}

export default App;
