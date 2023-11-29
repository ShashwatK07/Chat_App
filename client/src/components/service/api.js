import axios from "axios";

const url = "http://localhost:5000";

export const loginUser = async (data) => {
  try {
    let response = await axios.post(`${url}/login`, data);
    return response.data;
  } catch (error) {
    console.log("Error while logging in: ", error);
  }
};

export const currentUser = async () => {
  try {
    let res = await axios.get(`${url}/currentUser`);
    return res;
  } catch (err) {
    console.log("Error while fetching user:", err.message);
  }
};

export const getUserFriends = async (data) => {
  try {
    const currentUserData = data;

    if (!currentUserData || !currentUserData._id) {
      throw new Error("User data is missing or incomplete.");
    }

    const res = await axios.get(`${url}/${currentUserData._id}/friends`);

    return res.data;
  } catch (err) {
    console.log("Error while fetching user friends:", err.message);
    return [];
  }
};

export const getUsers = async () => {
  try {
    let res = await axios.get(`${url}/users`);
    return res.data;
  } catch (err) {
    console.log("Error while fetching users:", err.message);
  }
};

export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (err) {
    console.log("Error while setting convo:", err.message);
  }
};

export const getConversation = async (data) => {
  try {
    const res = await axios.post(`${url}/conversation/get`, data);
    return res.data;
  } catch (err) {
    console.log("Error while getting convo:", err.message);
  }
};

export const newMessage = async (data) => {
  try {
    await axios.post(`${url}/message/add`, data);
  } catch (err) {
    console.log("Error while calling new message:", err.message);
  }
};

export const getMessage = async (id) => {
  try {
    let res = await axios.get(`${url}/messages/get/${id}`);
    return res.data;
  } catch (err) {
    console.log("Error while fetching message:", err.message);
  }
};

export const uploadFile = async (data) => {
  try {
    let res = await axios.post(`${url}/file`, data);
    return res.data;
  } catch (err) {
    console.log("Error while storing the file :", err.message);
  }
};
