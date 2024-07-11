export const generateRandomId = () => {
    return Math.floor(Math.random() * Date.now()).toString(16)
};
