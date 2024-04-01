<template>
  <div id="senex-user-inspector">
    <div class="senex__column senex__column--empty" v-if="!activeUser?.id">
      <div class="senex__body">
        <div class="senex__sketch" style="position: absolute; right: 0;">
          <div class="senex__sketch__arrow  senex__sketch__arrow--purple-straight-up-up-right"></div>
          <p style="clear: both" class="senex__sketch__message">Need more help?</p>
        </div>
      </div>
    </div>

    <div id="user-information" class="senex__column senex__column--inspector senex__column--user" v-if="activeUser?.id">
      <div class="senex__header">
        <div class="senex__header__top senex__strip">
          <div class="senex__strip__left">
            <div class="senex__icon is-leftmost-column senex__button__back" style="display: none">
              <i class="fa fa-arrow-left"></i> Back
            </div>
          </div>
          <div class="senex__strip__center">
            <div class="senex__text">User</div>
          </div>
          <div class="senex__strip__right">
            <div class="senex__icon senex__icon--close senex-clients-close-property">
              <CancelIcon @click.prevent="closeInspector"/>
            </div>
          </div>
        </div>

        <div class="senex__header__middle">
          <div class="senex__header__left">
            <div class="senex__header__title">
              {{ userFullName }}
            </div>
          </div>
        </div>

        <div class="senex__header__bottom">
          <div class="senex__header__left">
            <ul class="senex__detail-menu">
              <Tab v-for="(tab, index) in tabs"
                   :class="{'senex__detail-menu__item--active': activeTab === tab.slug, 'ml-1.5': index !== 0}"
                   @click="activeTab = tab.slug"
              >
                {{ tab.label }}
              </Tab>
            </ul>
          </div>
        </div>
      </div>

      <InformationTab v-if="activeTab === activeTabInformation"/>
      <PermissionsTab v-if="activeTab === activeTabPermissions" />

      <div class="senex__footer" v-if="activeTab === activeTabInformation">
        <div class="senex__strip__left">
          <UserButtons/>
        </div>
      </div>

      <div class="senex__footer" v-if="activeTab === activeTabPermissions">
        <div class="senex__strip__left">
          <PermissionButtons/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/user";
import InformationTab from "~/components/clients/inspector/user/tabs/information/InformationTab.vue";
import PermissionsTab from "~/components/clients/inspector/user/tabs/permissions/PermissionsTab.vue";
import UserButtons from "~/components/clients/inspector/user/UserButtons.vue";
import PermissionButtons from "~/components/clients/inspector/user/PermissionButtons.vue";
import type {Tab as TabType} from "~/services/tab/types";
import Tab from "~/components/clients/Tab.vue";
import {useClientStore} from "~/store/client";
import CancelIcon from "~/components/icons/CancelIcon.vue";

const {activeUser} = storeToRefs(useUserStore());
const {setActiveUser} = useUserStore();

const activeTabInformation: string = "information";
const activeTabPermissions: string = "permissions";

const activeTab = ref(activeTabInformation);

watch(activeUser, async () => {
  activeTab.value = activeTabInformation;
});

const userFullName = computed(() => {
  return activeUser.value ? activeUser.value.first_name + " " + activeUser.value.last_name : "";
});

const tabs = ref<TabType[]>([
  {
    label: "Information",
    slug: "information",
  },
  {
    label: "Permissions",
    slug: "permissions",
  },
]);

const {activeInspectorCompany} = storeToRefs(useClientStore());

const {setActiveInspector} = useClientStore();

const closeInspector = () => {
  setActiveUser();

  setActiveInspector(activeInspectorCompany.value);
};
</script>
