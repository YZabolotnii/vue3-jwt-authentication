import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

const apiKey = 'AIzaSyD4VOld6sJez388qyIyu65V_i7hP5mVpws'

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

  const signup = async (payload: { email: string, password: string }) => {
    error.value = ''
    loader.value = true

    try {
      const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
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
      loader.value = false
    } catch (err) {
      switch (err.response.error.message) {
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
      loader.value = false
    }
  }

  return {
    signup,
    userInfo,
    error,
    loader
  }
})