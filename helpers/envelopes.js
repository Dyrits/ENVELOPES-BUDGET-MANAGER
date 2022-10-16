module.exports = {
    create(data) {
        const latest = data[data.length - 1];
        const identifier = latest.id + 1;
        if (isNaN(identifier) || identifier < 0 || !identifier) { console.error("The generated identifier is invalid."); }
        return identifier;
    },
    find(data, identifier) {
        const record = data.find((item) => item.id === parseInt(identifier));
        if (!record) { console.log("Record not found"); }
        return record;
    },
    remove(data, identifier) {
        const index = data.findIndex((item) => item.id === parseInt(identifier));
        if (~index) { console.error("The index is invalid."); }
        data.splice(index, 1);
        return data;
    }
};
