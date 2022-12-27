import React from "react";
import axios from "axios";

const InventoryCard = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.qty}</td>
      <td>{props.price}</td>
      <td style={{color : props.color}}>{props.exp_date}</td>
      <td style={{color : props.color}}>ALERT</td>
    </tr>
  );
};

export default InventoryCard;
