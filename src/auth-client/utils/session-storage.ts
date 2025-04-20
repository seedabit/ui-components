function setSessionStorage(key: string, value: string) {
    sessionStorage.setItem(key, value)
}

function getSessionStorage(key: string): string | null {
    return sessionStorage.getItem(key)
}

function removeSessionStorage(key: string) {
    sessionStorage.removeItem(key)
}

function clearSessionStorage() {
    sessionStorage.clear()
}

export { setSessionStorage, getSessionStorage, removeSessionStorage, clearSessionStorage }
