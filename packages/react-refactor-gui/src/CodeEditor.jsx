import React from 'react';
import PropTypes from 'prop-types';

import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/theme/tomorrow';

class CodeEditor extends React.PureComponent {
  render() {
    return (
      <AceEditor
        mode="jsx"
        theme="tomorrow"
        onChange={v => this.props.onChange(v)}
        value={this.props.value}
        editorProps={{$blockScrolling: true}}
        style={{width: '100%', height: '100%'}}
        readOnly={!this.props.onChange}
      />
    );
  }
}

CodeEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
CodeEditor.defaultProps = {};


export default CodeEditor;
