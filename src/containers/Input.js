import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, TextInput } from "@shoutem/ui";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
        <React.Fragment>
          <TextInput
            style={styles.textInput}
            placeholder={this.props.placeholder}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitEditing}
            onLayout={this.onLayout}
            value={this.state.text}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          <Button
            onPress={onPressAttach}
            styleName="light"
            style={styles.attachButton}
          >
            <Icon name="attach" size={30} color="black" />
          </Button>
        </React.Fragment>
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
const styles = StyleSheet.create({
  attachButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  textInput: {
    maxHeight: 80,
    width: "100%",
  },
});
export default connect()(Input);
