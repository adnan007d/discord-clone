export const initialState = {
  user: null,
  server: null,
  channel: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_SERVER":
      return {
        ...state,
        server: action.server,
      };
    case "SET_CHANNEL":
      return {
        ...state,
        channel: action.channel,
      };
    default:
      return state;
  }
};
export default reducer;
