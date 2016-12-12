//Local constant only available within library.js
const pi = 3.14159265359;
//Exported function available externally once imported
export var calcCircumference = (radius) => {
    return 2 * radius * pi;
};
