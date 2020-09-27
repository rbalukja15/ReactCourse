import React from "react";
import Columns from "./Columns";

class Table extends React.Component {
    render() {
        return (
            <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                <tbody>

                    <tr style={{ border: '1px solid black' }}>
                        <Columns />
                    </tr>
                    <tr style={{ border: '1px solid black' }}>
                        <Columns />
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Table;