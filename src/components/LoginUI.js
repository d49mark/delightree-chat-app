import React, { Component } from "react";
import { connect } from "react-redux";
import ReactNative from "react-native";
import { Screen, Title, Text, Divider, Button, Spinner } from "@shoutem/ui";

import Input from "../containers/Input";
import LoginButton from "../containers/LoginButton";
import { setUserName, setUserAvatar } from "../actions";

const mapStateToProps = (state) => ({
  authorizing: state.user.authorizing,
});

class LoginUI extends Component {
  state = {
    name: null,
    avatar: null,
  };
  onChangeName = (name) => {
    this.setState({ name: name }, () => {
      this.props.dispatch(setUserName(name));
    });
  };
  onChangeAvatar = (avatar) => {
    this.setState({ avatar: avatar }, () =>
      this.props.dispatch(setUserAvatar(this.state.avatar))
    );
  };

  render() {
    return (
      <Screen style={{ alignItems: "center", justifyContent: "center" }}>
        <Title>Who are you?</Title>
        <Divider />

        <Input
          placeholder="Your name here"
          submitAction={setUserName}
          onChangeText={this.onChangeName}
          submitOnBlur
          noclear
        />
        <Divider />

        <Input
          placeholder="Your avatar URL here"
          submitAction={(text) => setUserAvatar(this.state.avatar)}
          onChangeText={this.onChangeAvatar}
          submitOnBlur
          noclear
        />
        <Divider />

        {this.props.authorizing ? <Spinner /> : <LoginButton />}
      </Screen>
    );
  }
}

export default connect(mapStateToProps)(LoginUI);
