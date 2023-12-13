import { View, Text, StyleSheet, Pressable } from "react-native";

import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import ContextMenu from "./ContextMenu";

function Message({ text, id, email, setIsEditing, setContextMenuActive, contextMenuActive }) {
  const authCtx = useContext(AuthContext);
  function longPressHandler() {
    setContextMenuActive({ active: true, id: id });
  }

  return (
    <View style={styles.container}>
      {contextMenuActive.active && contextMenuActive.id===id &&
        (authCtx.email === email ? (
          <ContextMenu
            authenticated={true}
            id={id}
            token={authCtx.token}
            setIsEditing={setIsEditing}
            setContextMenuActive={setContextMenuActive}
          />
        ) : (
          <ContextMenu authenticated={false} />
        ))}
      <Pressable onLongPress={longPressHandler}>
        <Text style={styles.senderText}>{email}</Text>
        <View style={authCtx.email===email ? [styles.messageContainer, styles.userMessage] : styles.messageContainer}>
          <Text style={authCtx.email===email ? [styles.messageContent, styles.userMessageText] : styles.messageContent}>{text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: "white",
    padding: 3,
    margin: 5,
    borderRadius: 5,
    position: "relative",
  },
  container: {
    marginTop: 10,
  },
  senderText: {
    fontSize: 10,
    alignSelf: "center",
  },
  messageContent: {
    justifyContent: "center",
    paddingLeft: 5,
  },
  userMessage:{
    backgroundColor: '#4F4AFF',
  },
  userMessageText:{
    color: 'white'
  }
});
