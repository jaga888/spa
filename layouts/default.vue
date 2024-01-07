<template>
  <div class="senex__template senex__theme--senex">
    <div class="senex__template__header">
      <div class="senex__header senex__header--small senex__menu">
        <div class="senex__menu__left">
          <div class="senex__menu__item senex__menu__item--logo">
            <img class="" src="/images/logos/senex.svg" alt="senex"/>
          </div>

          <div class="two-columns-or-more senex__menu__item senex__menu__item--text senex__menu__item--submenu">
            Processing
            <div class="senex__menu__submenu">
              <a href="#" class="senex__menu__submenu-item">Notices of Non-Compliance </a>
              <a href="#" class="senex__menu__submenu-item">Unlawful Detainers </a>
              <a href="#" class="senex__menu__submenu-item">Court Dockets </a>
              <a href="#" class="senex__menu__submenu-item">Writs of Eviction </a>
              <a href="#" class="senex__menu__submenu-item">Notices of Satisfactions </a>
              <a href="#" class="senex__menu__submenu-item">SCRAs </a>
            </div>
          </div>

          <div class="two-columns-or-more senex__menu__item senex__menu__item--text senex__menu__item--submenu">
            Accounting
            <div class="senex__menu__submenu">
              <a href="#" class="senex__menu__submenu-item">Client Billing </a>
            </div>
          </div>

          <div class="two-columns-or-more senex__menu__item senex__menu__item--text senex__menu__item--submenu">
            Reporting
            <div class="senex__menu__submenu">
              <a href="#" class="senex__menu__submenu-item">Unprocessed Non-Compliance Report </a>
              <a href="#" class="senex__menu__submenu-item">Unprocessed SE Report </a>
              <a href="#" class="senex__menu__submenu-item">Unprocessed Possession Report </a>
              <a href="#" class="senex__menu__submenu-item">Pending Actual Outcome </a>
              <a href="#" class="senex__menu__submenu-item">Notice Status Report </a>
              <a href="#" class="senex__menu__submenu-item">UD Status Report </a>
              <a href="#" class="senex__menu__submenu-item">Possession Status Report </a>
              <a href="#" class="senex__menu__submenu-item">Judgment & Possession Report </a>
              <a href="#" class="senex__menu__submenu-item">Processing Totals Report </a>
              <a href="#" class="senex__menu__submenu-item">Processing Calendar </a>
            </div>
          </div>

          <div class="two-columns-or-more senex__menu__item senex__menu__item--text senex__menu__item--submenu">
            Management
            <div class="senex__menu__submenu">
              <a href="#" class="senex__menu__submenu-item">Clients & Properties </a>
              <a href="#" class="senex__menu__submenu-item">Courts & Dates </a>
              <a href="#" class="senex__menu__submenu-item">User Admin </a>
              <a href="#" class="senex__menu__submenu-item">Document Management </a>
              <a href="#" class="senex__menu__submenu-item">Document Texts Management </a>
            </div>
          </div>
        </div>

        <div class="senex__menu__right">
          <div class="two-columns-or-more senex__menu__item senex__menu__item--icon">
            <span>User</span>
            <div v-if="authenticated" class="senex__menu__submenu">
              <form method="post" action="#">
                <button @click="logout" class="senex__menu__submenu-item">Logout</button>
              </form>
            </div>
          </div>

          <div class="two-columns-or-more senex__menu__item senex__menu__item--icon">
            <i data-help="home" class="fa fa-life-ring"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="senex__template__body">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss">
@use "/assets/scss/senex.scss";
</style>

<script setup lang="ts">
import {storeToRefs} from 'pinia'; // import storeToRefs helper hook from pinia
import {useAuthStore} from '~/store/auth'; // import the auth store we just created

const router = useRouter();

const {logUserOut} = useAuthStore(); // use authenticateUser action from  auth store
const {authenticated} = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push('/login');
};
</script>
