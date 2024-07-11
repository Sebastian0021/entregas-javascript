export const saveDataToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
export const getDataFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};
