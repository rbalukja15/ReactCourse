import React from 'react';

function ChildrenProp(props) {

  const [lineItems, setLineItems] = React.useState([{ variantID: 1, qty: 2 }]);

  const changeQty = (variantID, qty) => {
    let lines = [...lineItems];
    lines.forEach(line => {
      if (line.variantID === variantID)
        line.qty = qty;
    })

    setLineItems(lines);
  }

  return (
    <div>
      <button onClick={() => changeQty(1,3)}>Click to change</button>
      <p>This item is {lineItems[0].qty}</p>
    </div>
  );
};

export default ChildrenProp;