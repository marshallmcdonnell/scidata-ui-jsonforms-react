import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

// Tab Component
export default class SciDataTab extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    isActive: PropTypes.bool,
    changeTab: PropTypes.func
  };

  render() {
    const { name, title, isActive, changeTab } = this.props;

    return (
      <Menu.Item key={name} active={isActive} onClick={changeTab} as="a">
        {title}
      </Menu.Item>
    );
  }
}
