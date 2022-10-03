import GenNetworkAdapter from "./GenNetworkAdapter";

export const C_URL = `http://localhost:9002`;
export const C_URL_WEBSOCKET = `ws://localhost:9002`;

class ChatNetwork {
    // login
    getHistoryRoom(roomName : string)  {
        const url = `${C_URL}/roomHistory?roomName=${roomName}`;
        return GenNetworkAdapter.get(url);
    }
    // register
    getRoomList() {
        const url = `${C_URL}/roomList`;
        return GenNetworkAdapter.get(url);
    }
}

export default new ChatNetwork();