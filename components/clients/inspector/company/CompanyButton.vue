<template>
  <div class="senex__master-button-group">
    <div
        class="senex__master-button senex__master-button--cancel senex__clients__reset-info"
        :class="{'senex__master-button--disabled': isDisabled}"
        @click.prevent="setIsDirty(false)">
      Reset
    </div>
    <div
        class="senex__master-button senex__master-button--save senex__clients__update-info"
        :class="{'senex__master-button--disabled': isDisabled}"
        @click.prevent="setSaveCompany()">
      Save
    </div>
  </div>
</template>

<script setup lang="ts">
import {useCompanyStore} from "~/store/company";

const {isDirty} = storeToRefs(useCompanyStore());
const {
  setSaveCompany,
  setIsDirty
} = useCompanyStore();

const isDisabled = ref<boolean>(true);

watch(isDirty, async () => {
  console.log(isDirty.value);
  isDisabled.value = !isDirty.value;
});
</script>

<style scoped lang="scss">
.senex__button {
  background-color: $senex-color-blue;
  color: white;
  border-radius: 0.25rem;
  padding: 7px 1rem;
  display: inline-block;
  cursor: pointer;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  font-weight: 600;
  margin-right: 1rem;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &:last-child {
    margin-right: 0;
  }

  &--full {
    width: 100%;
  }

  &--small {
    padding: 2px 0.5rem;
    font-size: 0.8rem;
    // text-transform: capitalize;
    letter-spacing: 0;
  }

  &--blue {
    border-color: $senex-color-blue;
    background-color: $senex-color-blue;
    color: white;
  }

  &--red {
    border-color: $senex-color-red;
    background-color: $senex-color-red;
    color: white;
  }

  &--grey {
    border-color: $senex-color-grey;
    background-color: $senex-color-grey;
    color: white;
  }

  &--green {
    border-color: $senex-color-green;
    background-color: $senex-color-green;
    color: white;
  }

  &--orange {
    border-color: $senex-color-orange;
    background-color: $senex-color-orange;
    color: white;
  }

  &--light-grey {
    background-color: rgba(0, 0, 0, 0.05);
    color: $senex-color-grey;
  }

  &--cancel {
    background-color: rgba(0, 0, 0, 0.05);
    color: $senex-color-grey;

    &:hover {
    }
  }

  &--danger {
    background-color: $senex-color-red;
    color: white;

    &:hover {
    }
  }


  &--go, &--save {
    border-color: $senex_color_green;
    background-color: $senex_color_green;
    color: white;

    &:hover {

    }
  }

}

// Toggle
.senex__button--toggle-inactive {
  background-color: transparent;
  border-width: 2px;
  border-style: solid;
}

.senex__button--toggle-active {

}

.senex__master-button-group {
  display: flex;
  flex-flow: row nowrap;
  padding: 0;
}

.senex__master-button {
  flex: 1 1 0;

  border: 0;

  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05rem;

  cursor: pointer;
  padding: 0.75rem;
  text-align: center;

  &--save {
    position: relative;
    border-radius: 0;
    background-color: $senex-color-blue;
    color: white;
    margin: 0;

    &:before {
      display: block;
      padding: 0.75rem;
      position: absolute;
      text-align: center;

      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      content: 'save';

    }

    &.senex__master-button--disabled {
      background-color: transparent;
      color: $senex-color-grey;
    }

    &.senex__master-button--dirty {
      background-color: $senex-color-green;
    }

    &.senex__master-button--active {
      background-color: $senex-color-green;

      &:before {
        content: 'saving';
      }
    }

    &.senex__master-button--completed {
      background-color: $senex-color-blue;

      &:before {
        content: 'saved!';
      }
    }

  }

  &--cancel {
    &.senex__master-button--disabled {
      background-color: transparent;
      color: $senex-color-grey;
    }
  }

  &--go {
    background-color: $senex-color-green;
    color: white;
  }

  &--stop {
    background-color: $senex-color-red;
    color: white;
  }

  &--delete {
    background-color: $senex-color-red;
    color: white;
  }

}
</style>
