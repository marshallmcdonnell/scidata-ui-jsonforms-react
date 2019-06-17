import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Menu, Button, Container, Divider } from "semantic-ui-react";
import { JsonForms } from "@jsonforms/react";
import { getData } from "@jsonforms/core";

import SciDataTab from "./SciDataTab";
import SciDataTabPanel from "./SciDataTabPanel";

Array.prototype.contains = function(element) {
  return this.indexOf(element) > -1;
};

// Tabs Component
class SciDataTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "",
      childActiveItem: "Input",
      childDisplay: this.renderJsonForm({}, {}, "")
    };

    this.defaultDisplay = <h1> </h1>;
    this.methodChoices = [
      "basisset",
      "calculation",
      "measurement",
      "methodology",
      "procedure",
      "resource",
      "software"
    ];
    this.dataChoices = ["dataset", "parameter", "unit", "value"];

    this.changeTab = this.changeTab.bind(this);
    this.changeChildTab = this.changeChildTab.bind(this);
    this.renderTabFromDataset = this.renderTabFromDataset.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
  }

  static propTypes = {
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string,
        title: PropTypes.string,
        schema: PropTypes.shape({
          properties: PropTypes.object,
          title: PropTypes.string,
          type: PropTypes.string
        }),
        uischema: PropTypes.shape({
          elements: PropTypes.arrayOf(PropTypes.object),
          label: PropTypes.string,
          type: PropTypes.string
        })
      })
    )
  };

  changeTab(tabName) {
    this.setState({
      activeItem: tabName
    });
  }

  changeChildTab(tabName) {
    this.setState({
      childActiveItem: tabName
    });
  }

  renderTabFromDataset(dataset) {
    const activeItem = this.state.activeItem;
    const isActive = activeItem === dataset.name ? true : false;
    return (
      <SciDataTab
        key={dataset.name}
        name={dataset.name}
        title={dataset.title}
        isActive={isActive}
        changeTab={() => this.changeTab(dataset.name)}
      />
    );
  }

  submitForm(formName) {
    console.log("Form " + formName + " submitted!");
  }

  renderJsonForm(dataset) {
    return (
      <div>
        <JsonForms
          key={dataset.name}
          data={dataset.data}
          schema={dataset.schema}
          uischema={dataset.uischema}
          path={dataset.path}
        />
        <Button
          content="Submit"
          color="red"
          onClick={() => this.submitForm(dataset.name)}
        />
      </div>
    );
  }

  renderActiveTabPanel() {
    const activeItem = this.state.activeItem;
    const datasets = this.props.datasets;
    if (datasets.length === 0) return;
    const activeDatasetArray = datasets.filter(obj => activeItem === obj.name);
    const dataset = activeDatasetArray[0];

    const childActiveItem = this.state.childActiveItem;

    if (dataset === undefined) {
      return this.defaultDisplay;
    }

    const dataForDataset = this.props.data[dataset.path];

    var display;
    if (childActiveItem === "Input") {
      display = this.renderJsonForm(dataset);
    } else {
      display = JSON.stringify(dataForDataset, null, 2);
    }

    return (
      <SciDataTabPanel
        activeItem={childActiveItem}
        display={display}
        changeChildTab={this.changeChildTab}
      />
    );
  }

  renderTabs(choices) {
    const datasets = this.props.datasets;
    const selection = datasets.filter(obj => choices.contains(obj.name));
    const tabs = selection.map(dataset => this.renderTabFromDataset(dataset));
    return tabs;
  }

  render() {
    const display = this.renderActiveTabPanel();
    const methodTabs = this.renderTabs(this.methodChoices);
    const dataTabs = this.renderTabs(this.dataChoices);


    console.log("datasets", this.props.datasets);
    //const myArray = this.createTabs();
    return (
      <div>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Container>
              <Menu.Item header>METHOD</Menu.Item>
                <Divider />
                {methodTabs}
                <Menu.Item header>DATA</Menu.Item>
                <Divider />
                {dataTabs}
              </Container>
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            {display}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { data: getData(state) };
};

export default connect(mapStateToProps)(SciDataTabs);
