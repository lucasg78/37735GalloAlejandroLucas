import productos from "./data";

export const pedirDatos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(productos);
        }, 500);
    });
};

export const getItem = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(productos[id]);
        }, 500);
    });
};