import React, {Component} from 'react';
import Content from "./Content";
import Header from "./Header";
import Introduction from "./Introduction";
import GithubRibbon from "./GithubRibbon";

const S_App = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  alignContent: 'flex-end',
}

class App extends Component {
  render() {
    return [
      <GithubRibbon url={'https://github.com/chrvadala/react-refactor'}/>,
      <div className="App" style={S_App}>
        <Header/>
        <Introduction/>
        <Content/>
      </div>
    ]
  }
}

export default App;
