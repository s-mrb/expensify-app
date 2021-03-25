
// SET_TEXT_FILTER ACTION
export const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text,
  });
  
  // Sort by date ACTION
  export const sortByDate = () => ({ type: "SORT_BY_DATE" });
  
  // Sort by amount ACTION
  export const sortByAmount = () => ({ type: "SORT_BY_AMOUNT" });
  
  // setStartDate ACTION
  export const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate,
  });
  
  // setEndDate ACTION
  export const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate,
  });
  