import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import axios from "axios";

class ShowDetails extends React.Component{

    state = {
        open: false,
        itemData: {
            _id: 0,
            name: '',
            date: ''
        },
    }

    componentDidMount() {
        console.log(this.props.postId)
        //if (this.props.postId)
        //     axios.get('/api/items/' + this.props.postId)
        //         .then(res => console.log(res.data));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.postId !== this.props.postId) {
            axios.get('/api/items/' + this.props.postId)
                     .then(res => this.setState({ itemData: res.data }));
        }
    }

    render() {

        const { itemData } = this.state;

        return (
            <div>
                <p>{itemData.name}</p>
                <p>{itemData.date}</p>
            </div>
        );
    }
}

ShowDetails.propTypes = {
    itemData: PropTypes.object.isRequired,
}

ShowDetails.defaultProps = {
    itemData: {},
}

export default ShowDetails;