import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

interface CompanyPopupState {
  companyPopupToggle: boolean;
}

const initialState: CompanyPopupState = {
  companyPopupToggle: false,
};

const companyPopupSlice = createSlice({
  name: 'company_popup',
  initialState,
  reducers: {
    companyPopupSliceData(state, action: PayloadAction<{ companyPopupToggle: boolean }>) {
      state.companyPopupToggle = action.payload.companyPopupToggle;
    },
  },
});

export const company_popup_selector = (state: RootState) => state.companyPopupReducer;
export const { companyPopupSliceData } = companyPopupSlice.actions;
export default companyPopupSlice.reducer;
