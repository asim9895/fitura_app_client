import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepsState {
  steps_selected_date: string | null;
}

const initial_state: StepsState = {
  steps_selected_date: new Date().toISOString().split("T")[0],
};

const steps_slice = createSlice({
  name: "steps",
  initialState: initial_state,
  reducers: {
    set_steps_selected_date: (state, action: PayloadAction<StepsState>) => {
      state.steps_selected_date = action.payload.steps_selected_date;
    },
  },
});

export const { set_steps_selected_date } = steps_slice.actions;

export default steps_slice.reducer;
