import React from 'react';
import CodeEditor from "./CodeEditor";
import ReactRefactor from 'react-refactor'

const S_CONTENT = {
  display: 'flex',
  alignContent: 'strech',
  justifyContent: 'center',
  padding: "0 10px",
}

const S_COL = {
  width: '50%',
  padding: "20px",
}

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {code: "", refactoredCode: ""}
    this.update = this.update.bind(this)
  }

  update(source) {
    let {output} = ReactRefactor.execRefactor(source)
    this.setState({refactoredCode: output})
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
