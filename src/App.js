import React, {Component} from 'react';
import Content from "./Content";
import Header from "./Header";
import Introduction from "./Introduction";

const S_App = {
  position: 'relative',
}

class App extends Component {
  render() {
    return (
      <div className="App" style={S_App}>
        <Header/>
        <Introduction/>
        <Content/>
      </div>
    );
  }
}

export default App;
