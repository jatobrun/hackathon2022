import React from 'react';
import PropTypes from 'prop-types';

class CodeView extends React.Component {
 
 render() {
  return (
    <div>
      CodeView Component
      <div>{this.props.code}</div>
    </div>
   );
  }
 }

/*const CodeView = () => (
  <div>
    CodeView Component
  </div>
);*/

/*CodeView.propTypes = {
  code: PropTypes.string
};*/

CodeView.defaultProps = {};

export default CodeView;
