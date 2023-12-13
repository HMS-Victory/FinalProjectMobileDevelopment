import { createContext, useReducer, useState } from "react";


export const MessagesContext = createContext({
  messages: [],
  curId: '',
  assignCurId: (id)=>{},
  sendMessage: ({ content, email }) => {},
  setMessages: (messages)=>{},
  deleteMessage: (id) => {},
  updateMessage: (id, { content }) => {},
});

function messagesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload}, ...state];
    case "SET":
        return action.payload;
    case "UPDATE":
      const updatableMessageIndex = state.findIndex(
        () => (message) => message.id === action.payload.id
      );
      const updatableMessage=state[updatableMessageIndex];
      const updatedItem={ ...updatableMessage, ...action.payload.data }
      const updatedMessages=[...state];
      updatedMessages[updatableMessageIndex]=updatedItem;
      return updatedMessages;
    case "DELETE":
        //the payload only contains the id turned in to the function
        return state.filter((message)=>message.id !== action.payload)
    default:
      return state;
  }
}

function MessagesContextProvider({ children }) {
  const [messagesState, dispatch] = useReducer(messagesReducer, []);
  const [curId, setCurId]=useState();

  function sendMessage(messageData) {
    dispatch({ type: "ADD", payload: messageData });
  }

  function setMessages(messages){
    dispatch({type: 'SET', payload: messages});
  }

  function updateMessage(id, messageData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: messageData } });
  }

  function deleteMessage(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function assignCurId(id){
    setCurId(id)
  }

  

  const value={
    messages: messagesState,
    curId: curId,
    assignCurId: assignCurId,
    setMessages: setMessages,
    sendMessage: sendMessage,
    deleteMessage: deleteMessage,
    updateMessage: updateMessage
  };

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}

export default MessagesContextProvider;
