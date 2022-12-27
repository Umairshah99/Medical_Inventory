import React, { Component } from "react";
import InventoryCard from "../Components/InventoryCard";
import axios from "axios";
import Moment from "react-moment";

var moment = require("moment");
let count = 0;
class Inventory extends Component {
  // const Inventory = () => {
  state = {
    data: [],
    inventory: [],
    c: [],
  };
  async componentDidMount() {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      window.location.replace("/");
    }
    const res = await axios.get(`${process.env.REACT_APP_URL}/getInventory`, {
      headers: { Authorization: `JWT ${jwtToken}` },
    });
    this.setState({ data: res.data });
    let inventory_set = [...new Set(this.state.data.map((item) => item.name))];
    this.setState({ inventory: inventory_set });
    const res_1 = await axios.get(`${process.env.REACT_APP_URL}/getThreshold`);
    this.setState({ thresholds: res_1.thresholds });
  }

  async componentDidUpdate(prevState) {
    if (prevState.data !== this.state.data) {
      //   const jwtToken = localStorage.getItem("token");
      //   if (!jwtToken) {
      //     window.location.replace("/");
      //   }
      //   const res = await axios.get(`${process.env.REACT_APP_URL}/getInventory`, {
      //     headers: { Authorization: `JWT ${jwtToken}` },
      //   });
      //   this.setState({ data: res.data });
      //   let inventory_set = [
      //     ...new Set(this.state.data.map((item) => item.name)),
      //   ];
      //   this.setState({ inventory: inventory_set });
    }
  }

  render() {
    return (
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Exp_date</th>
          </tr>
        </thead>
        <tbody>
          {this.state.inventory.map(
            (name, key) => {
              return (
                <>
                  <tr style={{ fontWeight: "bold", color: "blueviolet" }}>
                    {name}
                  </tr>
                  {this.state.data.map((item) => {
                    count += item.quantity;

                    return name == item.name ? (
                      <InventoryCard
                        name={item.name}
                        qty={item.quantity}
                        price={item.price_unit}
                        exp_date={moment(item.exp_date).format("YYYY-MM-DD")}
                        color={
                          moment(item.exp_date).format("YYYY-MM-DD") <
                          moment().format("YYYY-MM-DD")
                            ? "red"
                            : "black"
                        }
                      />
                    ) : (
                      //   <div>ALERT<div/>
                      <></>
                    );
                  })}{" "}
                </>
              );
            }
            // console.log("Name: ", name, "Qty: ", count);
            // count = 0;
          )}
        </tbody>
      </table>
    );
  }
}
export default Inventory;
