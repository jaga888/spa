<template>
  <fieldset class="senex__form__fieldset">
    <legend class="senex__form__legend">Status</legend>

    <div class="senex__form__block">
      <div class="senex__form__text" id="company-active-result">
            <span v-if="active">
              This Client is <strong>Active</strong>. To remove it from use, while retaining all historical data, you
              may deactivate it.
            </span>
        <span v-else>This Property is <strong>Inactive</strong>.</span>
      </div>

      <div class="senex__form__item-group">
        <div class="senex__form__item">
          <Button id="company-active-button"
                  type="button"
                  class="senex__button"
                  :class="{
                    'senex__button--danger senex__clients__deactivate-company': active,
                    'senex__button--save senex__clients__activate-company': !active
                  }">
            {{ active ? 'Deactivate' : 'Activate' }}
          </Button>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
  },
})
</script>
