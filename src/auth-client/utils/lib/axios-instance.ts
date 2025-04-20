import axios from 'axios'

const url: string | undefined = process.env.NEXT_PUBLIC_DEV_API_URL
if (!url) {
    throw new Error('NEXT_PUBLIC_DEV_API_URL is not defined')
}

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

function setTokens(token: string, refreshToken: string) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axiosInstance.defaults.headers.common['x-refresh-token'] = refreshToken
}

function setRefreshToken(refreshToken: string) {
    axiosInstance.defaults.headers.common['x-refresh-token'] = refreshToken
}

function clearTokens() {
    delete axiosInstance.defaults.headers.common['Authorization']
    delete axiosInstance.defaults.headers.common['x-refresh-token']
}

export { axiosInstance, setTokens, setRefreshToken, clearTokens }
