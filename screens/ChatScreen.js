import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import MessageInput from "../components/chat/MessageInput";
import { getMessages, editMessage } from "../util/crud";
import { AuthContext } from "../store/auth-context";
import { MessagesContext } from "../store/message-context";
import { useContext } from "react";
import MessageList from "../components/chat/MessageList";
import EditModal from "../components/chat/EditModal";

function ChatScreen() {
  const authCtx = useContext(AuthContext);
  const messagesCtx = useContext(MessagesContext);
  const [isEditing, toggleIsEditing] = useState(false);
  const [intialMessage, setInitialMessage] = useState({
    text: "",
    email: "",
  });
  useEffect(() => {
    async function getMessageData() {
      try {
        const messagesData = await getMessages(authCtx.token);
        if (messagesData.status === 401) {
          authCtx.logout();
        }
        messagesCtx.setMessages(messagesData.messages);
      } catch (error) {
        console.log("Could not Fetch Messages: " + error);
      }
    }
    getMessageData();
  }, [authCtx.token, messagesCtx.messages]);
  function setIsEditing(messageData) {
    if (messageData) {
      setInitialMessage({
        text: messageData.messageData,
        email: messageData.email,
      });
      toggleIsEditing(true);
    }
  }

  let messages = messagesCtx.messages;
  let content;
  if (messages.length > 0) {
    content = (
      <View style={styles.listContainer}>
        <MessageList
          messageData={messagesCtx.messages}
          setIsEditing={setIsEditing}
          intialMessage={intialMessage}
        />
      </View>
    );
  } else {
    content = <Text>No Messages yet.</Text>;
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.messagesContainer}>{content}</View>
      <MessageInput />

      <EditModal
        toggleIsEditing={toggleIsEditing}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
      />
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#cccccc",
    justifyContent: "flex-end",
    position: "relative",
  },
  messagesContainer: {
    flex: 1,
  },
  listContainer:{
    marginBottom: 30
  }
});
