import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WaterState {
  water_selected_date: string | null;
}

const initial_state: WaterState = {
  water_selected_date: new Date().toISOString().split("T")[0],
};

const water_slice = createSlice({
  name: "water",
  initialState: initial_state,
  reducers: {
    set_water_selected_date: (state, action: PayloadAction<WaterState>) => {
      state.water_selected_date = action.payload.water_selected_date;
    },
  },
});

export const { set_water_selected_date } = water_slice.actions;

export default water_slice.reducer;
