<template>
  <div id="senex-property-inspector">
    <div class="senex__column senex__column--empty" v-if="!activeProperty?.id && !isNewProperty">
      <div class="senex__body">
        <div class="senex__sketch" style="position: absolute; right: 0;">
          <div class="senex__sketch__arrow  senex__sketch__arrow--purple-straight-up-up-right"></div>
          <p style="clear: both" class="senex__sketch__message">Need more help?</p>
        </div>
      </div>
    </div>

    <div id="property-information"
         class="senex__column senex__column--inspector senex__column--property"
         v-if="activeProperty?.id || isNewProperty"
    >
      <div class="senex__header">
        <div class="senex__header__top senex__strip">
          <div class="senex__strip__left">
            <div class="senex__icon is-leftmost-column senex__button__back" style="display: none">
              <i class="fa fa-arrow-left"></i> Back
            </div>
          </div>
          <div class="senex__strip__center">
            <div class="senex__text">Property</div>
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
              {{ activeProperty?.short_name }}
            </div>
          </div>
        </div>

        <div class="senex__header__bottom">
          <div class="senex__header__left">
            <ul class="senex__detail-menu">
              <Tab v-for="(tab, index) in tabs"
                   :class="{'senex__detail-menu__item--active': activeTab === tab.slug, 'ml-1.5': index !== 0}"
                   @click="updateActiveTab(tab.slug)"
              >
                {{ tab.label }}
              </Tab>
            </ul>
          </div>
        </div>
      </div>

      <InformationTab v-if="activeTab === activeTabInformation"/>
      <FeesTab v-if="activeTab === activeTabFees"/>
      <DocsTab v-if="activeTab === activeTabDocs"/>
      <UnitsTab v-if="activeTab === activeTabUnits"/>
      <NotesTab v-if="activeTab === activeTabNotes"/>
      <Files v-if="activeTab === activeTabFiles"/>

      <div class="senex__footer" v-if="activeTab === activeTabInformation">
        <div class="senex__strip__left">
          <PropertyButtons/>
        </div>
      </div>

      <div class="senex__footer senex__form" v-if="activeTab === activeTabUnits">
        <UnitFilter/>
      </div>

      <div class="senex__footer" v-if="activeTab === activeTabNotes && (activeNote || isNewNote)">
        <div class="senex__strip__left">
          <NoteButtons/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {usePropertyStore} from "~/store/property";
import InformationTab from "~/components/clients/inspector/property/Tabs/Information/InformationTab.vue";
import PropertyButtons from "~/components/clients/inspector/property/PropertyButtons.vue";
import UnitFilter from "~/components/clients/inspector/property/UnitFilter.vue";
import NoteButtons from "~/components/clients/inspector/property/NoteButtons.vue";
import FeesTab from "~/components/clients/inspector/property/Tabs/Fees/FeesTab.vue";
import DocsTab from "~/components/clients/inspector/property/Tabs/Docs/DocsTab.vue";
import UnitsTab from "~/components/clients/inspector/property/Tabs/Units/UnitsTab.vue";
import NotesTab from "~/components/clients/inspector/property/Tabs/Notes/NotesTab.vue";
import type {Tab as TabType} from "~/services/tab/types";
import Tab from "~/components/clients/Tab.vue";
import Files from "~/components/clients/inspector/property/Tabs/Files/Files.vue";
import {useNoteStore} from "~/store/note";
import CancelIcon from "~/components/icons/CancelIcon.vue";
import {useClientStore} from "~/store/client";

const {
  activeProperty,
  isNewProperty,
} = storeToRefs(usePropertyStore());

const {
  activeNote,
  isNewNote
} = storeToRefs(useNoteStore());

const {setActiveProperty} = usePropertyStore();

const activeTabInformation: string = "information";
const activeTabFees: string = "fees";
const activeTabDocs: string = "docs";
const activeTabUnits: string = "units";
const activeTabNotes: string = "notes";
const activeTabFiles: string = "files";

const activeTab = ref(activeTabInformation);

watch(activeProperty, async () => {
  activeTab.value = activeTabInformation;
});

const tabs = ref<TabType[]>([
  {
    label: "Information",
    slug: "information",
  },
  {
    label: "Fees",
    slug: "fees",
  },
  {
    label: "Docs",
    slug: "docs",
  },
  {
    label: "Units",
    slug: "units",
  },
  {
    label: "Notes",
    slug: "notes",
  },
  {
    label: "Files",
    slug: "files",
  },
]);

const updateActiveTab = (slug: string) => {
  if (!isNewProperty.value) {
    activeTab.value = slug;
  }
};

const {activeInspectorCompany} = storeToRefs(useClientStore());

const {setActiveInspector} = useClientStore();

const closeInspector = () => {
  setActiveProperty();

  setActiveInspector(activeInspectorCompany.value);
};
</script>
