const initialState = {
    items: [
        {
            _id: 9809890,
            name: "Mario",
            date: Date.now()
        }
    ]
}

const itemReducer = (state=initialState, action) => {
    if (action.type === 'GET_ITEMS') {
        return {
            items: [{
                _id: 9809890,
                name: "Test",
                date: Date.now()
            }]
        }
    }
    return state;
}

export default itemReducer;