function groupdata(state =[], action){
        return {
            ...state[0],data:action.data
        }
 }
 export default groupdata;