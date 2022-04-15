export const initialStateForAdmin = null ;

export const reducerForAdmin = (state ,action) => {
    if(action.type === "ADMIN") {
        return action.payload ;
    }
    return state ;
}