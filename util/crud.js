import axios from "axios";

// const API_KEY = "AIzaSyCFOJDdAPDs3kWi4Y6b1jG_w7cxrnl0k4g";
const url = "https://finalprojectreactnative-f2351-default-rtdb.firebaseio.com";

// temporary name
export async function getMessages(token) {
  const response = await axios.get(url + "/messages.json?auth=" + token);

  const messages = [];
  for (const key in response.data) {
    const messageObj = {
      id: key,
      text: response.data[key].messageData,
      email: response.data[key].email,
    };
    messages.push(messageObj);
  }

  return {messages:messages, status: response.status};
}

export async function getMessage(token, id){
  const response=await axios.get(url+`/messages/${id}.json?auth=${token}`);
  const message=response.data;
  return message
}

export async function sendMessages(messageData, email, token) {
  const response = await axios.post(url + "/messages.json/?auth=" + token, {
    messageData,
    email,
  });
  const id = response.data.name;
  return id;
}

export async function editMessage(messageData, id, token) {
  return await axios.put(
    url+`/messages/${id}.json?auth=${token}`,
    messageData
  );
}

export async function deleteMessage(id, token) {
  return await axios.delete(url + `/messages/${id}.json?auth=${token}`);
}
