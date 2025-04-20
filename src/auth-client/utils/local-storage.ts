function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorage(key: string): string | null {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
}

function removeLocalStorage(key: string) {
    localStorage.removeItem(key)
}

function clearLocalStorage() {
    localStorage.clear()
}

export { setLocalStorage, getLocalStorage, removeLocalStorage, clearLocalStorage }
