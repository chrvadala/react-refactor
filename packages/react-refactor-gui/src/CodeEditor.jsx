import React from 'react';
import PropTypes from 'prop-types';
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/jsx/jsx.js";
import "codemirror/addon/selection/active-line.js";
import "codemirror/addon/edit/matchbrackets.js";

import * as CodeMirror from 'codemirror';

const S_TEXAREA = {
  width: '100%',
}

const EditorOpt = {
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
}

class CodeEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.Editor = null;
    this.CodeEditor = null;
  }

  componentDidMount() {
    let {onChange} = this.props;
    let readOnly = !onChange;

    let opt = {...EditorOpt, readOnly}
    this.CodeEditor = CodeMirror.fromTextArea(this.Editor, opt);
    this.CodeEditor.setSize("100%", "100%");
    if (!readOnly) {
      this.CodeEditor.on('changes', instance => onChange(instance.getValue()))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.CodeEditor.setValue(nextProps.value)
    }
  }

  render() {
    return (
      <textarea
        ref={Editor => this.Editor = Editor}
        defaultValue={this.props.value}
        style={S_TEXAREA}/>
    );
  }
}

CodeEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
CodeEditor.defaultProps = {};


export default CodeEditor;
