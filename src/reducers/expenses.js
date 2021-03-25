


// Expenses Reducer ACTION
const expensesReducerDefaultState = {};

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expenses];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expenses) => {
        if (expenses.id === action.id) {
          return {
            ...expenses,
            ...action.updates,
          };
        } else {
          return expenses;
        }
      });
    default:
      return state;
  }
};



export default expensesReducer;