'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { clearTokens, setTokens, setRefreshToken as setRefreshTokenToHeaders, axiosInstance } from '@/utils/lib/axios-instance'
import { checkToken, refreshTokens } from '@/utils/tokens'
import { getSessionStorage, removeSessionStorage, setSessionStorage } from '@/utils/session-storage'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/local-storage'

interface AuthContextData {
    token: string | null
    setToken: (token: string | null) => void
    refreshToken: string | null
    setRefreshToken: (refreshToken: string | null) => void
    isAuthenticated: boolean
    register: (userData: any) => void
    login: (email: string, password: string, rememberMe: boolean) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const router = useRouter()

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [token, setTokenState] = useState<string | null>(null)
    const [refreshToken, setRefreshTokenState] = useState<string | null>(null)

    const setToken = (token: string | null) => {
        setTokenState(token)
        if (token) {
            setSessionStorage('token', token)
        } else {
            removeSessionStorage('token')
        }
    }

    const setRefreshToken = (refreshToken: string | null) => {
        setRefreshTokenState(refreshToken)
        if (refreshToken) {
            setSessionStorage('refreshToken', refreshToken)
        } else {
            removeSessionStorage('refreshToken')
        }
    }

    const logout = useCallback(() => {
        setToken(null)
        setRefreshToken(null)
        removeSessionStorage('token')
        removeSessionStorage('refreshToken')
        removeLocalStorage('refreshToken')
        clearTokens()
        setIsAuthenticated(false)
        router.push('/login')
    }, [router])

    const register = async (userData: any) => {
        axiosInstance.post('/auth/register', {
            userData
        }).then((res) => {
            // toast({
            //     description: res.data.message
            // })
            setTimeout(() => {
                router.push('/login')
            }, 1000)
        }).catch((error) => {
            // toast({
            //     variant: 'destructive',
            //     description: error.response?.data?.error || 'Um erro inesperado ocorreu, tente novamente mais tarde.'
            // })
        })
    }

    const login = async (email: string, password: string, rememberMe: boolean = false) => {
        axiosInstance.post('/auth/login', {
            email: email,
            password: password,
        }).then((response) => {
            // toast({
            //     description: response.data.message
            // })
            const { token, refreshToken } = response.data
            setToken(token)
            setRefreshToken(refreshToken)
            setIsAuthenticated(true)
            if (rememberMe) {
                setLocalStorage('refreshToken', refreshToken)
            } else {
                removeLocalStorage('refreshToken')
            }
            router.push('/home')
        }).catch((error) => {
            if (error.response?.status === 404) {
                // toast({
                //     variant: 'destructive',
                //     description: 'Erro de conexão, tente novamente mais tarde.'
                // })
            } else {
                // toast({
                //     variant: 'destructive',
                //     description: error.response?.data?.error || 'Um erro inesperado ocorreu, tente novamente mais tarde.'
                // })
            }
        })
    }

    const checkTokenAndRefreshToken = useCallback(async () => {
        try {
            const isTokenValid: boolean = await checkToken()
            if (!isTokenValid) {
                const [newToken, newRefreshToken] = await refreshTokens()
                if (!newToken || !newRefreshToken) {
                    throw new Error('Invalid token response')
                }
            }
        } catch {
            logout()
        }
    }, [logout])

    const checkRememberMe = useCallback(async (): Promise<[string, string] | null> => {
        const storedRefreshToken = getLocalStorage('refreshToken')
        if (storedRefreshToken) {
            try {
                setRefreshTokenToHeaders(storedRefreshToken) // set the refresh token in the axios instance headers
                const [newToken, newRefreshToken] = await refreshTokens()
                if (!newToken || !newRefreshToken) {
                    throw new Error('Invalid token response')
                }
                return [newToken, newRefreshToken]
            } catch (error) { // token is invalid or expired
                throw error
            }
        }
        removeLocalStorage('refreshToken') // clear for guarantee
        return null // remember-me is off
    }, [])

    useEffect(() => {
        if (token && refreshToken) {
            setTokens(token, refreshToken)
        } else {
            clearTokens()
        }
    }, [token, refreshToken])

    useEffect(() => {
        const initializeAuth = async () => { // checks local and session storage for tokens and sets them in the context
            try {
                const tokens = await checkRememberMe() // check if the remember me token is valid and refresh it if necessary
                if (tokens) { // successfully refreshed remember-me tokens
                    const [newToken, newRefreshToken] = tokens
                    setTokens(newToken, newRefreshToken) // change the header tokens
                    setToken(newToken)
                    setRefreshToken(newRefreshToken)
                    setIsAuthenticated(true)
                    setLocalStorage('refreshToken', newRefreshToken) // store the new refresh token in local storage since remember-me is on
                } else { // remember-me is off
                    const storedToken = getSessionStorage('token')
                    const storedRefreshToken = getSessionStorage('refreshToken')

                    if (storedToken && storedRefreshToken) { // session storage tokens exist
                        try {
                            setTokens(storedToken, storedRefreshToken) // change the header tokens
                            await checkTokenAndRefreshToken() // check if the token is valid and refresh it if necessary
                            setToken(storedToken)
                            setRefreshToken(storedRefreshToken)
                            setIsAuthenticated(true)
                        } catch { // session tokens are invalid or expired
                            logout()
                        }
                    } else { // session storage tokens do not exist
                        logout()
                    }
                }
            } catch { // remember-me token is invalid or expired
                logout()
            }
        }

        initializeAuth()
    }, [checkTokenAndRefreshToken, checkRememberMe, logout, router])

    return (
        <AuthContext.Provider value={{ token, setToken, refreshToken, setRefreshToken, isAuthenticated, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
