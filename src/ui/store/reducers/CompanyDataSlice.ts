import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../root-reducer"; // Ensure this is correctly imported

// Define the CompanyDataState interface
interface CompanyDataState {
  company_name: string;
  company_address: string;
  company_gstin: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gst_category: string;
}

// Initial state with default empty values
const initialState: CompanyDataState = {
  company_name: "",
  company_address: "",
  company_gstin: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  gst_category: "",
};

// Create the Redux slice
const companyDataSlice = createSlice({
  name: "company_data",
  initialState,
  reducers: {
    companyDataSliceFunc(state, action: PayloadAction<CompanyDataState>) {
      return { ...action.payload }; // ✅ Correctly replaces state
    },
  },
});

// Export selector
export const company_popup_selector = (state: RootState) => state.companyDataReducer;

// Export actions and reducer
export const { companyDataSliceFunc } = companyDataSlice.actions;
export default companyDataSlice.reducer;
