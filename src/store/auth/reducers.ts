import { AuthState } from './types';

const reducers = {
  setUser: (state: AuthState, action: { payload: AuthState['user'] }) => {
    state.user = action.payload;
  },
};

export default reducers;
