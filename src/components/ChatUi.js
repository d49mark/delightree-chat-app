import React, { Component } from "react";
import { connect } from "react-redux";
import ReactNative from "react-native";

import { Title, Screen } from "@shoutem/ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { launchImageLibrary } from "react-native-image-picker";

import Messages from "../containers/Messages";
import Input from "../containers/Input";
import { sendMessage } from "../actions";

const mapStateToProps = (state) => ({
  chatHeight: state.chatroom.meta.height,
  user: state.user,
});

class ChatUI extends Component {
  state = {
    scrollViewHeight: 0,
    inputHeight: 0,
  };
  constructor(props) {
    super(props);
    this.onPressAttach = this.onPressAttach.bind(this);
    this.isBase64 = this.isBase64.bind(this);
  }
  componentDidMount() {
    this.scrollToBottom(false);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onScrollViewLayout = (event) => {
    const layout = event.nativeEvent.layout;

    this.setState({
      scrollViewHeight: layout.height,
    });
  };

  onInputLayout = (event) => {
    const layout = event.nativeEvent.layout;

    this.setState({
      inputHeight: layout.height,
    });
  };

  scrollToBottom(animate = true) {
    const { scrollViewHeight, inputHeight } = this.state,
      { chatHeight } = this.props;

    const scrollTo = chatHeight - scrollViewHeight + inputHeight;

    if (scrollTo > 0) {
      this.refs.scroll.scrollToPosition(0, scrollTo, animate);
    }
  }

  _scrollToInput(reactRef) {
    this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
  }

  sendMessage = (text) => {
    return sendMessage(text, this.props.user);
  };
  isBase64 = (str) => {
    if (str === "" || str.trim() === "") {
      return false;
    }
    var base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    return base64regex.test(str);
  };

  onPressAttach() {
    let options = {
      title: "You can choose one image",
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        ReactNative.Alert.alert("You did not select any image");
      } else if (response.error) {
        ReactNative.Alert.alert("Unexpected error occurred. Please retry");
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.props.dispatch(
          sendMessage(response.assets[0].base64, this.props.user)
        );
      }
    });
  }
  render() {
    return (
      <Screen>
        <Title styleName="h-center" style={{ paddingVertical: 10 }}>
          Chatroom
        </Title>
        <KeyboardAwareScrollView
          ref="scroll"
          onLayout={this.onScrollViewLayout}
        >
          <Messages />
        </KeyboardAwareScrollView>
        <Input
          onPressAttach={this.onPressAttach}
          attachButton={true}
          onLayout={this.onInputLayout}
          onFocus={this._scrollToInput.bind(this)}
          submitAction={this.sendMessage}
          ref="input"
          placeholder="Say something cool ..."
        />
      </Screen>
    );
  }
}

export default connect(mapStateToProps)(ChatUI);
