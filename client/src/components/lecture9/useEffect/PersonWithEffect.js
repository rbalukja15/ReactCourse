import React from 'react';
import axios from "axios";

const PersonWithEffect = (props) => {

    const [open, setOpen] = React.useState(false);
    const [itemData, setItemData] = React.useState({ _id: 0, name: '',date: '' })

    React.useEffect( () => {
        if (props.postId)
            axios.get('/api/items/' + props.postId)
                .then(res => setItemData(res.data));
    }, [props.postId] )

        return (
            <div>
                <p>{itemData.name}</p>
                <p>{itemData.date}</p>
            </div>
        );
}

export default PersonWithEffect;