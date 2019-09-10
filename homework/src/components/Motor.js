import React from "react";

class Motor extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.status}</p>
      </div>
    )
  }
}

export default Motor;
