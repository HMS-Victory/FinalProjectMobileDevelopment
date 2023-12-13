import { View, Text, StyleSheet, Pressable, Touchable} from "react-native";
import { deleteMessage } from "../../util/crud";
import { useContext, useState } from "react";
import { MessagesContext } from "../../store/message-context";
import { getMessage } from "../../util/crud";
import { AuthContext } from "../../store/auth-context";

function ContextMenu({ authenticated, id, setIsEditing, setContextMenuActive }) {
  const messagesCtx = useContext(MessagesContext);
  const authCtx = useContext(AuthContext);

  let menu;
  async function deleteHandler() {
    try {
      await deleteMessage(id, authCtx.token);
      messagesCtx.deleteMessage(id);
    } catch (error) {
      console.log(error);
    }
    setContextMenuActive({active: false, id: ""});
  }
  

  async function InputHandler() {
    try {
      const message = await getMessage(authCtx.token, id);
      if (message.email === authCtx.email) {
        await setIsEditing(message);
        await messagesCtx.assignCurId(id);

        setContextMenuActive({active: false, id: ""});
      } else {
        console.log("Cannot edit this item");
      }
    } catch (error) {
      console.log("Cannot edit this item: " + error);
    }
  }
  

  if (authenticated) {
    menu = (
      <View style={styles.menuContainer}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.editMessage, styles.editMessagePressed]
              : styles.editMessage
          }
          onPress={() => {
            InputHandler();
          }}
        >
          <Text>Edit Message</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.deleteMessage, styles.deleteMessagePressed]
              : styles.deleteMessage
          }
          onPress={deleteHandler}
        >
          <Text>Delete Message</Text>
        </Pressable>
      </View>
    );
  } else {
    menu = (
      <View style={styles.menuContainer}>
        <Text>You cannot take action on these messages</Text>
      </View>
    );
  }
  return (
    <>
      {menu}
      
    </>
  );
}

export default ContextMenu;

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: "#eeeeee",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 100,
    borderRadius: 6,
    elevation: 6,
    minWidth: 120,
  },
  editMessage: {
    flex: 1,
    paddingTop: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    width: "100%",
    alignItems: "center",
    paddingBottom: 2,
  },
  editMessagePressed: {
    backgroundColor: "blue",
  },
  deleteMessage: {
    borderTopColor: "#aaa",
    borderTopWidth: 0.5,
    paddingTop: 2,
    paddingBottom: 8,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  deleteMessagePressed: {
    backgroundColor: "red",
  },
  editModal: {
    position: "absolute",
    width: 50,
    height: 50,
    zIndex: 100
  },
});
