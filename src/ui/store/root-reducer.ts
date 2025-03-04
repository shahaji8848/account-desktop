import { combineReducers } from 'redux';
import CompanyPopupSlice from './reducers/CompanyPopupSlice';
import CompanyDataSlice from './reducers/CompanyDataSlice';

const appReducer = combineReducers({
  companyPopupReducer: CompanyPopupSlice,
  companyDataReducer: CompanyDataSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'Login/LogoutSuccess') {
    state = undefined;

    state = {} as RootState;
  }
  return appReducer(state, action);
};

export default rootReducer;
export type RootState = ReturnType<typeof appReducer>;
