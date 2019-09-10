import React from "react";
//import Motor from "./components/Motor";


class Motor extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.status}</p>
      </div>
    )
  }
}

class Car extends React.Component {
  render () {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <Motor status="Двигатель заведён"/>
      </div>
    )
  }
}

export default Car;
