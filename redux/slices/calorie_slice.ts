import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalorieState {
  calorie_selected_date: string | null;
}

const initial_state: CalorieState = {
  calorie_selected_date: new Date().toISOString().split("T")[0],
};

const calorie_slice = createSlice({
  name: "calorie",
  initialState: initial_state,
  reducers: {
    set_calorie_selected_date: (state, action: PayloadAction<CalorieState>) => {
      state.calorie_selected_date = action.payload.calorie_selected_date;
    },
  },
});

export const { set_calorie_selected_date } = calorie_slice.actions;

export default calorie_slice.reducer;
