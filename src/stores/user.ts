import { defineStore } from 'pinia'
import axios from '../lib/axios'
import { computed, ref } from 'vue'

interface User {
  id: number
  name: string
  password: string
  email: string
}

interface Credentials {
  name: string
  password: string
}

interface RegistrationInfo {
  name: string
  email: string
  password: string
  password_confirmation: string
  image: string
}
interface AuthResponse {
  error: string | null
  data: any
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  async function logout() {
    await axios.post('/logout')
    user.value = null
    window.location.href = '/login'
  }

  async function fetchUser() {
    const { data, error }: any = await axios.get('/api/user')
    if (error) {
      console.error(error)
    } else {
      user.value = data as User
    }
  }

  async function login(credentials: Credentials): Promise<AuthResponse> {
    await axios('/sanctum/csrf-cookie')
    const { data, error }: any = await axios.post('/login', credentials)
    if (error) {
      console.error(error)
    } else {
      window.location.href = '/'
      await fetchUser()
    }
    return data
  }

  async function register(info: RegistrationInfo): Promise<AuthResponse> {
    await axios('/sanctum/csrf-cookie')

    const { data, error }: any = await axios.post('/register', info)
    if (error) {
      console.error(error)
    } else {
      await fetchUser()
    }
    return data
  }

  return { user, login, isLoggedIn, fetchUser, logout, register }
})
