import uuid from 'uuid';


// Add expense ACTION
export const addExpense = ({
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
  export const removeExpense = ({ id } = {}) => ({
    type: "REMOVE_EXPENSE",
    id,
  });
  
  // Edit Expense ACTION
  export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates,
  });
  