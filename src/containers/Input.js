import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, TextInput } from "@shoutem/ui";
import { View, Text } from "react-native";

class Input extends Component {
  state = {
    text: null,
  };

  onChangeText = (text) => {
    this.setState({ text: text });
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  };

  onSubmitEditing = () => {
    this.props.dispatch(this.props.submitAction(this.state.text));

    if (!this.props.noclear) {
      this.setState({
        text: null,
      });
    }
  };

  onFocus = (event) => {
    if (this.props.onFocus) {
    }
  };

  onBlur = () => {
    if (this.props.submitOnBlur) {
      this.onSubmitEditing();
    }
  };

  onLayout = (event) => {
    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  };

  render() {
    const { attachButton, onPressAttach } = this.props;
    if (attachButton) {
      return (
        <View
          style={{
            flexDirection: "row",
            //justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder={this.props.placeholder}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitEditing}
            onLayout={this.onLayout}
            value={this.state.text}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          <Button onPress={onPressAttach} styleName="light">
            <Text>Attach file</Text>
          </Button>
        </View>
      );
    }
    return (
      <TextInput
        placeholder={this.props.placeholder}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
        onLayout={this.onLayout}
        value={this.state.text}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    );
  }
}

export default connect()(Input);
