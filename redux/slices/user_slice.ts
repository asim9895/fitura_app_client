import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfileState {
  name: string;
  gender: string;
  height: string;
  weight: string;
  age: number | null;
  profile_completed?: boolean;
}

const initial_state: UserProfileState = {
  name: "",
  gender: "",
  height: "",
  weight: "",
  age: null,
  profile_completed: false,
};

const user_slice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    set_user_profile: (state, action: PayloadAction<UserProfileState>) => {
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
  },
});

export const { set_user_profile, clear_user_profile } = user_slice.actions;

export default user_slice.reducer;
