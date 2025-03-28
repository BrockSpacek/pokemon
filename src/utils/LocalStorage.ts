function saveToLocalStorageByName(name: string) {
    if (typeof window === 'undefined') return; // Prevents error on server

    let namesArr = getLocalStorage();

    if (!namesArr.includes(name)) {
        namesArr.push(name);
    }

    localStorage.setItem('Names', JSON.stringify(namesArr));
}

function getLocalStorage() {
    if (typeof window === 'undefined') return []; // Prevents error on server

    let localStorageData = localStorage.getItem('Names');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name: string) {
    if (typeof window === 'undefined') return; // Prevents error on server

    let namesArr = getLocalStorage();

    let nameindex = namesArr.indexOf(name);

    if (nameindex !== -1) {
        namesArr.splice(nameindex, 1);
        localStorage.setItem('Names', JSON.stringify(namesArr));
    }
}

export { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage };

​
