import React from 'react';
import CodeEditor from "./CodeEditor";
import * as ReactRefactor from 'react-refactor'
import defaultSource from "./defaultSource";

const S_CONTENT = {
  display: 'flex',
  alignContent: 'stretch',
  justifyContent: 'center',
  padding: "0 10px",
  alignItems: "stretch",
  height: "100%",
}

const S_COL = {
  width: '50%',
  border: "1px solid #2085c1",
  margin: 10,
}

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: defaultSource,
      refactoredCode: this.update(defaultSource, true)
    }
    this.update = this.update.bind(this)
  }

  update(source, skipStateUpdate = false) {
    let output;
    try {
      ({output} = ReactRefactor.execRefactor(source))
    } catch (err) {
      this.setState({refactoredCode: '// Source file can\'t be refactored'})
      console.warn(err)
      return;
    }
    if(!skipStateUpdate) this.setState({refactoredCode: output})
    return output;
  }

  render() {
    return (
      <div style={S_CONTENT}>
        <div style={S_COL}>
          <CodeEditor value={this.state.code} onChange={this.update}/>
        </div>
        <div style={S_COL}>
          <CodeEditor value={this.state.refactoredCode}/>
        </div>
      </div>
    );
  }
}

Content.propTypes = {};
Content.defaultProps = {};


export default Content;
