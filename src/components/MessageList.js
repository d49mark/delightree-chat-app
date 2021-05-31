import React, { Component } from "react";
import { Row, Image, View, Subtitle, Caption, Heading } from "@shoutem/ui";
import moment from "moment";
import { FlatList, Text } from "react-native";
const isBase64 = (str) => {
  if (str === "" || str.trim() === "") {
    return false;
  }
  var base64regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  return base64regex.test(str);
};
const Message = ({ msg }) => {
  if (isBase64(msg?.text)) {
    return (
      <Row>
        <Image
          styleName="small-avatar top"
          source={{ uri: msg?.author?.avatar }}
        />
        <View styleName="vertical">
          <View styleName="horizontal space-between">
            <Text style={{ color: "black" }}>{msg?.author?.name}</Text>
            <Caption>{moment(msg?.time).from(Date.now())}</Caption>
          </View>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: `data:image/jpeg;base64,${msg?.text}` }}
          />
        </View>
      </Row>
    );
  }
  return (
    <Row>
      <Image
        styleName="small-avatar top"
        source={{ uri: msg?.author?.avatar }}
      />
      <View styleName="vertical">
        <View styleName="horizontal space-between">
          <Text style={{ color: "black" }}>{msg?.author?.name}</Text>
          <Caption>{moment(msg?.time).from(Date.now())}</Caption>
        </View>
        <Text styleName="multiline">{msg?.text}</Text>
      </View>
    </Row>
  );
};

const MessageList = ({ messages, onLayout }) => (
  <FlatList
    data={messages}
    autoHideHeader={true}
    renderItem={({ item }) => <Message msg={item} />}
    onLayout={onLayout}
  />
);

export default MessageList;
