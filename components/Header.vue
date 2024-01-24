<template>
  <div class="senex__header senex__header--small senex__menu">
    <div class="senex__menu__left">
      <div class="senex__menu__item senex__menu__item--logo">
        <img class="" src="/images/logos/senex.svg" alt="senex"/>
      </div>

      <div class="two-columns-or-more senex__menu__item senex__menu__item--text senex__menu__item--submenu">
        Processing
        <div class="senex__menu__submenu">
          <NuxtLink to="#" class="senex__menu__submenu-item">Notices of Non-Compliance </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Unlawful Detainers </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Court Dockets </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Writs of Eviction </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Notices of Satisfactions </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">SCRAs </NuxtLink>
        </div>
      </div>

      <div class="two-columns-or-more senex__menu__item senex__menu__item--text senex__menu__item--submenu">
        Accounting
        <div class="senex__menu__submenu">
          <NuxtLink to="#" class="senex__menu__submenu-item">Client Billing </NuxtLink>
        </div>
      </div>

      <div class="two-columns-or-more senex__menu__item senex__menu__item--text senex__menu__item--submenu">
        Reporting
        <div class="senex__menu__submenu">
          <NuxtLink to="#" class="senex__menu__submenu-item">Unprocessed Non-Compliance Report </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Unprocessed SE Report </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Unprocessed Possession Report </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Pending Actual Outcome </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Notice Status Report </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">UD Status Report </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Possession Status Report </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Judgment & Possession Report </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Processing Totals Report </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Processing Calendar </NuxtLink>
        </div>
      </div>

      <div class="two-columns-or-more senex__menu__item senex__menu__item--text senex__menu__item--submenu">
        Management
        <div class="senex__menu__submenu">
          <NuxtLink class="senex__menu__submenu-item" to="/clients">Clients & Properties </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Courts & Dates </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">User Admin </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Document Management </NuxtLink>
          <NuxtLink to="#" class="senex__menu__submenu-item">Document Texts Management </NuxtLink>
        </div>
      </div>
    </div>

    <div class="senex__menu__right">
      <div class="two-columns-or-more senex__menu__item senex__menu__item--icon">
        <span>{{ data?.first_name }} {{ data?.last_name }}</span>
        <div v-if="status === 'authenticated'" class="senex__menu__submenu">
          <form method="post" action="#">
            <button type="button" @click="logout" class="senex__menu__submenu-item">Logout</button>
          </form>
        </div>
      </div>

      <div class="two-columns-or-more senex__menu__item senex__menu__item--icon">
        <i data-help="home" class="fa fa-life-ring"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, signOut, status } = useAuth()// import the auth store we just created
const router = useRouter()

const logout = () => {
  signOut({ callbackUrl: '/login'})
};
</script>
