function filterBy (list, key, value) {
    value = value.trim()
    console.log(value)
    return list.filter(
        task => task[key].toString().toLowerCase().includes(value)
    );
}

export default filterBy;