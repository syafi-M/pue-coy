<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/user'

const form = ref({
  name: 'gua',
  password: '123123123'
})
const auth = useAuthStore()

async function onLogin(): Promise<void> {
  try {
    const { error }: any = await auth.login(form.value)
    console.log(error)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <p>anjay</p>
    <div>
      <form @submit.prevent="onLogin">
        <div>
          <input type="text" name="name" v-model="form.name" />
        </div>
        <div>
          <input type="password" name="password" v-model="form.password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>
