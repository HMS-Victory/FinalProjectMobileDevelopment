import { TextInput, View, StyleSheet } from "react-native";
import { sendMessages } from "../../util/crud";
import SendButton from "./SendButton";
import { useState } from "react";
import { useContext } from "react";
import { MessagesContext } from "../../store/message-context";
import { AuthContext } from "../../store/auth-context";

function MessageInput() {
  const messageCtx = useContext(MessagesContext);
  const authCtx = useContext(AuthContext);
  const [message, setMessage] = useState("");
  function handleOnChange(enteredValue) {
    setMessage(enteredValue);
  }
  async function MessageSubmitHandler() {
    try {
      const id = await sendMessages(message, authCtx.email, authCtx.token);
      messageCtx.sendMessage({ ...message, email: authCtx.email, id: id });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          styles={styles.textInput}
          onChangeText={handleOnChange.bind(this)}
        />
      </View>
      <SendButton
        onPress={() => {
          MessageSubmitHandler();
          setMessage("");
        }}
      />
    </View>
  );
}

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 50,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 8,
    padding: 5,
  },
  textInput: {
    backgroundColor: "white",
    flex: 1,
  },
});
