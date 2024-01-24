<template>
  <div class="senex__column senex__column--mobile">
    <div class="senex__body">
      <div class="senex__card">
        <div class="senex__card__header senex__header senex__header--large">
        </div>

        <div class="senex__card__body">
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

const { status } = useAuth()

const router = useRouter()
console.log('status l', status.value)
</script>
