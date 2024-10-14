import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axiosApiInstance from '@/core/ApiService'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

interface User {
  token: string;
  email: string,
  userId: string,
  refreshToken: string,
  expiresIn: string,
}

export const useAuthStore = defineStore('auth', () => {
  const userInfo = reactive<User>({
    token: localStorage.getItem('access') || '',
    email: '',
    userId: '',
    refreshToken: localStorage.getItem('refresh') || '',
    expiresIn: '',
  })

  const error = ref('')
  const loader = ref(false)

  const auth = async (payload: { email: string, password: string }, type: string) => {
    const stringUrl = type === 'signUp' ? 'signUp' : 'signInWithPassword'

    error.value = ''
    loader.value = true

    try {
      let response = await axiosApiInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })

      // Оновлюємо userInfo і зберігаємо токен в localStorage
      userInfo.token = response.data.idToken
      userInfo.email = response.data.email
      userInfo.userId = response.data.localId
      userInfo.refreshToken = response.data.refreshToken
      userInfo.expiresIn = response.data.expiresIn

      localStorage.setItem('access', userInfo.token)
      localStorage.setItem('refresh', userInfo.refreshToken)

    } catch (err: any) {
      error.value = err.response?.data?.error?.message || 'An error occurred'
      throw new Error(error.value)
    } finally {
      loader.value = false
    }
  }

  const logout = () => {
    userInfo.token = ''
    userInfo.email = ''
    userInfo.userId = ''
    userInfo.refreshToken = ''
    userInfo.expiresIn = ''

    localStorage.setItem('access', '')
    localStorage.setItem('refresh', '')
  }

  return {
    auth,
    logout,
    userInfo,
    error,
    loader
  }
})
