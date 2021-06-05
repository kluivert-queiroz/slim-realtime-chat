const SET_NICKNAME = "SET_NICKNAME";
const initialState = {
  name: localStorage.getItem('nickname') || "No nickname",
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICKNAME: {
			localStorage.setItem('nickname', action.nickname);
      return { ...state, name: action.nickname };
    }
    default:
      return state;
  }
};

export default UserReducer;
