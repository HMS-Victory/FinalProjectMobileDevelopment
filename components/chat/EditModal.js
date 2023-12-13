import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { editMessage } from "../../util/crud";
import { MessagesContext } from "../../store/message-context";
import { AuthContext } from "../../store/auth-context";
import { useContext, useState, useEffect } from "react";

function EditModal({
  toggleIsEditing,
  initialMessage,
  editMessageHandler,
  handleOnChange,
  isEditing,
}) {
  const messagesCtx = useContext(MessagesContext);
  const authCtx = useContext(AuthContext);
  const [message, setMessage] = useState({
    text: "",
    email: "",
  });

  function handleOnChange(enteredValue) {
    setMessage({
      ...message,
      text: enteredValue,
    });
  }
  async function editMessageHandler() {
    try {
        // we have already checked to see if they were the correct user before
        // allowing them the context menu the first time
        // now we don't need to check just enter the current authenticated user
      await editMessage(
        { messageData: message.text, email:  authCtx.email},
        messagesCtx.curId,
        authCtx.token
      );
      messagesCtx.updateMessage(messagesCtx.curId, message);
    } catch (error) {
      console.log(error);
    }
  }

  let content;
  if (isEditing) {
    content = (
      <>
        <View style={styles.backdrop}></View>
        <View style={styles.editModalContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              value={message.text}
              styles={styles.textInput}
              onChangeText={handleOnChange.bind(this)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                editMessageHandler();
                toggleIsEditing(false);
              }}
              style={styles.buttonEdit}
            >
              <Text>Edit</Text>
            </Pressable>
            {/* this arrow function is here to prevent this component from automatically running on render, which would instantly 
            change the state back to false, and therefore would show the user nothing */}
            <Pressable
              onPress={()=>toggleIsEditing(false)}
              style={styles.buttonCancel}
            >
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </>
    );
  }
  return <>{content}</>;
}

export default EditModal;

const styles = StyleSheet.create({
  editModalContainer: {
    width: 200,
    backgroundColor: "#dddddd",
    position: "absolute",
    top: "30%",
    left: "26%",
    padding: 10,
    borderRadius: 6,
  },
  textInput: {
    flex: 1,
    borderRadius: 4,
  },
  textInputContainer: {
    width: "100%",
    borderRadius: 4,
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 8,
  },
  buttonCancel: {
    backgroundColor: "grey",
    paddingHorizontal: 5,
    paddingVertical: 2,
    minWidth: 50,
    borderRadius: 6,
  },
  buttonEdit: {
    backgroundColor: "blue",
    paddingHorizontal: 5,
    paddingVertical: 2,
    minWidth: 50,
    alignItems: "center",
    borderRadius: 6,
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.3,
  },
});
