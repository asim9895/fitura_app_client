import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  gender: string;
  height: string;
  weight: string;
  age: number | null;
  profile_completed?: boolean;
  selected_date: string;
}

const initial_state: UserState = {
  name: "",
  gender: "",
  height: "",
  weight: "",
  age: null,
  profile_completed: false,
  selected_date: new Date().toISOString().split("T")[0],
};

const user_slice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    set_user_profile: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
      state.profile_completed = true;
    },
    clear_user_profile: (state) => {
      state.name = "";
      state.gender = "";
      state.age = null;
      state.height = "";
      state.weight = "";
      state.profile_completed = false;
    },
    set_selected_date: (
      state,
      action: PayloadAction<{ selected_date: string }>
    ) => {
      state.selected_date = action.payload.selected_date;
    },
  },
});

export const { set_user_profile, clear_user_profile, set_selected_date } =
  user_slice.actions;

export default user_slice.reducer;
