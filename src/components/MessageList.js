import React, { Component } from "react";
import { Row, Image, View, Subtitle, Caption, Heading } from "@shoutem/ui";
import moment from "moment";
import { FlatList, Text } from "react-native";

const Message = ({ msg }) => {
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
