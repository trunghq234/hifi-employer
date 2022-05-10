import { Room } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface ChattingState {
  loading?: boolean;
  rooms?: Room[];
  currentRoom?: Room;
}

const initialState: ChattingState = {
  loading: false,
  rooms: undefined,
  currentRoom: undefined,
};

export const chattingSlice = createSlice({
  name: "chatting",
  initialState,
  reducers: {
    setRoomsState: (state, action: PayloadAction<Room[]>) => {
      return { ...state, rooms: action.payload };
    },
    setCurrentRoomState: (state, action: PayloadAction<Room>) => {
      return { ...state, currentRoom: action.payload };
    },
  },
});

export const { setRoomsState, setCurrentRoomState } = chattingSlice.actions;

export const $chatting = (state: RootState) => state.chatting;

export default chattingSlice.reducer;
