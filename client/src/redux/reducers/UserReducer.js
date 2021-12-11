const SET_NICKNAME = "SET_NICKNAME";
const initialState = {
  username: localStorage.getItem('nickname') || "No nickname",
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICKNAME: {
			localStorage.setItem('nickname', action.nickname);
      return { ...state, username: action.nickname };
    }
    default:
      return state;
  }
};

export default UserReducer;
