import { FlatList, KeyboardAvoidingView } from "react-native";
import { useState, useEffect } from "react";
import Message from "./Message";

function MessageList({ messageData, setIsEditing }) {
  const [contextMenuActive, setContextMenuActive] = useState({
    active: false,
    id: "",
  });

  function renderMessages(itemData) {
    return (
      <Message
        {...itemData.item}
        setIsEditing={setIsEditing}
        contextMenuActive={contextMenuActive}
        setContextMenuActive={setContextMenuActive}
      />
    );
  }
  return (
    <KeyboardAvoidingView>
      <FlatList
        data={messageData}
        renderItem={renderMessages}
        keyExtractor={(item) => item.id}
        useRef="Flatlist"
      />
    </KeyboardAvoidingView>
  );
}

export default MessageList;
