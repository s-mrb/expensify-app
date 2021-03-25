import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// Add expense ACTION
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expenses: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

// Remove Expense ACTION
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// Edit Expense ACTION
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// SET_TEXT_FILTER ACTION
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// Sort by date ACTION
const sortByDate = () => ({ type: "SORT_BY_DATE" });

// Sort by amount ACTION
const sortByAmount = () => ({ type: "SORT_BY_Amount" });

// setStartDate ACTION
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

// setEndDate ACTION
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

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

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = ( state = filtersReducerDefaultState, action ) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};


//Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate })=>{
  return expenses.filter((expense)=>{
      const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

      // figure out if expenses.description has some string inside of it

      return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b)=>{
    if (sortBy === 'date'){
    return a.createdAt < b.createdAt ? 1 : -1; 
    } else if (sortBy === 'amount'){
      return a.amount < b.amount ? 1 : -1;
    }
  });
};

//Store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);


  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: -10000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "coffee", amount: 300, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: expenseOne.expenses.id }));

// store.dispatch(editExpense(expenseTwo.expenses.id, { amount: 500 }));

// store.dispatch(setTextFilter("ffe"));
// store.dispatch(setTextFilter());
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//  store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState = {
  expenses: [
    {
      id: "asfsc",
      description: "January Rent",
      note: "This",
      amount: 54665,
      createdAt: 0,
    },
  ],
  filters: [
    {
      text: "rent",
      sortBy: "amount",
      startDate: undefined,
      endDate: undefined,
    },
  ],
};
