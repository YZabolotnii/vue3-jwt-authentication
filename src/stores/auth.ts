import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

export const useAuthStore = defineStore('auth', () => {
  const userInfo = reactive({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: '',
  })
  const error = ref('')
  const loader = ref(false )

  const auth = async (payload: { email: string, password: string }, type: string) => {
    const stringUrl = type === 'signUp' ? 'signUp' : 'signInWithPassword'

    error.value = ''
    loader.value = true

    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      }
    } catch (err: Error)  {
      switch (err.response?.data?.error?.message) {
        case 'EMAIL_EXISTS':
          error.value = 'Email already exists'
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'No account found'
          break;
        case 'Too_MANY_ATTEMPTS_TRY_LATER':
          error.value = 'Too Many Attending'
          break;
        default:
          error.value = 'Error'
          break;
      }
      throw error.value
    } finally {
      loader.value = false
    }
  }

  return {
    auth,
    userInfo,
    error,
    loader
  }
})