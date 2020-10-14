//Define item actions
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, GET_ITEM_BY_ID, UPDATE_ITEM } from "./types";
import axios from "axios";
import {alertActions} from "./alertActions";

//Action to get the items into the component
export const getItems = () => dispatch => {
    dispatch(setItemsLoading()); //Change the state of the loading
    axios
        .get("/api/items")
        .then(res =>
            dispatch({
                type: GET_ITEMS, //use the get action
                payload: res.data //Get the data from response and send them as a payload
            })
        )
        .catch(err =>
            console.log(err)
        );
};

//Action to get an item by id into the components
export const getItemById = id => dispatch => {
    return axios
        .get(`/api/items/${id}`) //Send the id as defined in our back end api
        .then(res =>
            dispatch({
                type: 'GET_ITEM_BY_ID', //Define the action
                payload: res.data //Send the id as a payload
            })
        )
        .catch(err =>
            console.log(err)
        );

};

//Action to add an item
export const addItem = item => dispatch => {
    axios
        .post("/api/items", item) //Post the data from the modal into the api
        .then(res => {
                dispatch({
                    type: ADD_ITEM, //Define the action
                    payload: res.data //Send as a payload
                });
                dispatch(alertActions.success('Item added successfully'))
            }
        )
        .catch(err =>
            console.log(err)
        );
};

//Action to delete an item
export const deleteItem = id => dispatch => {
    axios
        .delete(`/api/items/${id}`) //Send the id as defined in our back end api
        .then(res => {
                dispatch({
                    type: DELETE_ITEM, //Define the action
                    payload: id //Send the id as a payload
                });
                dispatch(alertActions.success('Item deleted successfully'))
            }
        )
        .catch(err =>
            console.log(err)
        );
};

//Action to update an item
export const updateItem = item => dispatch => {
    axios
        .put(`/api/items/${item._id}`, item)
        .then(res =>
            dispatch({
                type: 'UPDATE_ITEM',
                payload: res.data
            })
        )
        .catch(err =>
            console.log(err)
        );
}

//Dispatch Items Loading
export const setItemsLoading = () => {
    return {
        type: 'ITEMS_LOADING'
    };
};