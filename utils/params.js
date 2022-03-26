export const filterParams = (paramsObj) => {
    const params = {};
    Object.entries(paramsObj).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            params[key] = value;
        }
    });

    return params;
}

export const trimParams = (obj) => {
    return Object.entries(filterParams(obj)).map(([value, key]) => `${value}=${key}`).join("&");
}