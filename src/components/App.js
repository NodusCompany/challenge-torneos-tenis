import React from "react";
import logo from "../assets/img/logo.svg";
import "../assets/css/App.css";
import Header from '../components/Header'
import Sidebar from "../components/Sidebar";
import Result from "../components/Result";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      resultData: [],
      loader: true,
      sidebar: false,
      playerName: "",
      tourneyYear: 0,
      tourneyLocation: "",
      tourneyDate: ""
    };
  }

  componentDidMount() {
    this.listResuls();
  }

  listResuls = () => {
    fetch("http://localhost/atpgrandslam/src/api/")
      .then(res => res.json())
      .then(data => {
        if(data.status){
          this.setState({ resultData: data.data, loader: false });
        } else{
          alert(data.message);
        }
       
      });
  };

  openSidebarInfo = data => {
    console.log(data);
    this.setState({
      sidebar: true,
      playerName: data.player_name,
      tourneyYear: data.winnerLast,
      tourneyLocation: data.tourney_location,
      tourneyDate: data.tourney_dates
    });
  };

  closeSidebarInfo = () => {
    this.setState({ sidebar: false });
  };

  render() {
    const { resultData, loader, sidebar } = this.state;

    return (
      <React.Fragment>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <div className="tableResul">
            <Header />

            <Result 
              resultData = {resultData}
              openSidebarInfo = {this.openSidebarInfo}
              loader = {loader}
            />

            <Sidebar
              sidebar={sidebar}
              playerName={this.state.playerName}
              tourneyYear={this.state.tourneyYear}
              tourneyLocation={this.state.tourneyLocation}
              tourneyDate={this.state.tourneyDate}
              closeSidebarInfo={this.closeSidebarInfo}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
