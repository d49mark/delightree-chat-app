import React from "react";
import { Row, Image, View, Caption } from "@shoutem/ui";
import moment from "moment";
import { FlatList, Text, StyleSheet } from "react-native";
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
            resizeMethod={"scale"}
            resizeMode={"contain"}
            style={styles.image}
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
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});
export default MessageList;
