import React from 'react';

let cars = ['Газель', 'Камаз', 'Жигули'];
let newCars = ['BMW', 'Mercedes', 'Jaguar'];

class Moving extends React.Component {
  constructor() {
    super();
    this.state = {
      moving: this.randomInteger(0, 1)
    };
  };

  randomInteger (min, max) {
    let num = min + Math.random() * (max + 1 - min);
    return Math.floor(num);
  };

  stop () {
    this.setState(prevState => ({
      moving: prevState.moving - 1
    }));
  };

  move () {
    this.setState(prevState => ({
    moving: prevState.moving + 1
    }));
  };

  moveState () {
    return (
      <div className="motor-on">
        <p>Машина едет</p>
        <p>Колёса крутятся</p>
        <button
          className="btn green"
          onClick={this.stop.bind(this)}
        >
          Остановиться
        </button>
      </div>
    );
  };

  stopState () {
    return (
      <div className="motor-on">
        <p>Машина стоит</p>
        <p>Колёса не крутятся</p>
        <button
         className="btn green"
         onClick={this.move.bind(this)}
        >
          Поехать
        </button>
      </div>
    );
  };

  render () {
    if (this.state.moving === 1) {
      return this.moveState();
    } else {
      return this.stopState();
    };
  };
};

class Motor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motor: this.randomInteger(0, 1)
    };
  };

  randomInteger (min, max) {
    let num = min + Math.random() * (max + 1 - min);
    return Math.floor(num);
  };

  off () {
    this.setState({ motor: 1 });
  };

  on () {
    this.setState({ motor: 0 });
  };

  motorOn () {
    return (
      <div>
        <p>Двигатель заведён</p>
        <button
        className="btn blue"
        onClick={this.off.bind(this)}
        >
          Заглушить двигатель
        </button>
        <Moving />
      </div>
    );
  };

  motorOff () {
    return (
      <div>
        <p>Двигатель заглушён</p>
        <button
        className="btn blue"
        onClick={this.on.bind(this)}
        >
          Завести двигатель
        </button>
        <div className="motor-off">
          <p>Машина стоит</p>
          <p>Колёса не крутятся</p>
          <button className="btn green">&uarr; Заведите двигатель, чтобы поехать</button>
        </div>
      </div>
    );
  };

  render () {
    if (this.state.motor === 0) {
      return this.motorOn();
    } else {
      return this.motorOff();
    };
  };
};

class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cars };
  };

  deleteCar = (i) => {
    let newList = this.state.cars;
    newList.splice(i, 1);
    this.setState({ cars: newList });
  };

  addCar (car) {
    this.state.cars.push(car);
    this.setState({
      cars: this.state.cars
    });
  };

  eachCar (item, i) {
    return (
      <div className="card">
        <h3>{item}</h3>
        <div
          key={i}
          index={i}
          name={item}
        >
        </div>
        <Motor />
        <button
          className="btn delete"
          onClick={this.deleteCar.bind(this, i)}
        >
          Удалить
        </button>
      </div>
    );
  };

  render () {
    return (
      <div>
        <div>
          {this.state.cars.map((item, i) => this.eachCar(item, i))}
        </div>
        <button
         className="btn"
         onClick={this.addCar.bind(this, this.props.selectedCar)}
         >
         Добавить
         </button>
      </div>
    );
  };
};

class Select extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedCar: newCars[0]
    };
  };

  eachCar (item, i) {
    return (
      <option
        key={i}
        index={i}
        value={item}
      >
        {item}
      </option>
    )
  };

  handleChange (e) {
    this.setState({
      selectedCar: e.target.value
    });
  };

  render () {
    return (
      <select
        className="select car"
        onChange={
          (e) => {
            this.handleChange(e);
            this.props.updateSelectedCar(e.target.value)
          }
        }
      >
      {newCars.map((item, i) => this.eachCar(item, i))}
      </select>
    )
  };
};

class Shed extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedCar: newCars[0]
    };
  };

  updateSelectedCar = (car) => {
    this.setState({
      selectedCar: car
    });
  };

  render () {
    return (
      <div>
        <Car selectedCar={this.state.selectedCar}/>
        <Select updateSelectedCar={this.updateSelectedCar}/>
      </div>
    )
  };
};

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Shed />
      </div>
    );
  };
};
