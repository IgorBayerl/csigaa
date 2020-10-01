import React, { Component } from 'react';
import ReactDOM from "react-dom";

// create and get reference to Modal DOM node
const appRoot = document.getElementById('root');
appRoot.insertAdjacentHTML('afterend', '<div id="modal-root"></div>');
const modalRoot = document.getElementById('modal-root');

class InnerModal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // https://reactjs.org/docs/portals.html

    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const containerStyle = {
      // copied from RNW View/StyleSheet/constants
      alignItems: 'stretch',
      border: '0 solid black',
      boxSizing: 'border-box',
      display: 'flex',
      flexBasis: 'auto',
      flexDirection: 'column',
      flexShrink: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      minHeight: 0,
      minWidth: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      position: 'relative',
      zIndex: 0,

      // modal
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,

      // etc
      backgroundColor: this.props.transparent ? 'transparent' : 'white',
    };

    return ReactDOM.createPortal(
      <div style={containerStyle}>
        {this.props.children}
      </div>,
      this.el,
    );
  }
}

export default class Modal extends Component {
  render() {
    if (this.props.visible) {
      return <InnerModal {...this.props}/>;
    }
    return null;
  }
}