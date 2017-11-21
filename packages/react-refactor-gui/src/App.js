import React, {Component} from 'react';
import Content from "./Content";
import Header from "./Header";
import Introduction from "./Introduction";
import GithubRibbon from "./GithubRibbon";
import Footer from "./Footer";

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
      <GithubRibbon key='ribbon' url={'https://github.com/chrvadala/react-refactor'}/>,
      <div key='app' style={S_App}>
        <Header/>
        <Introduction/>
        <Content/>
        <Footer/>
      </div>
    ]
  }
}

export default App;
