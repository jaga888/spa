<template>
  <div class="senex__column senex__column--loading senex__column--light-grey" style="display: none"></div>

  <div class="senex__column senex__column--empty">
    <div class="senex__body">
      <div class="senex__sketch" style="position: absolute; right: 0;">
        <div class="senex__sketch__arrow  senex__sketch__arrow--purple-straight-up-up-right"></div>
        <p style="clear: both" class="senex__sketch__message">Need more help?</p>
      </div>
    </div>
  </div>

  <div class="senex__column senex__column--inspector senex__column--company"
       id="company-information" style="display: none">
    <div class="senex__header">
      <div class="senex__header__top senex__strip">
        <div class="senex__strip__left">
          <div class="senex__icon is-leftmost-column senex__button__back">
            <i class="fa fa-arrow-left"></i> Back
          </div>
        </div>
      </div>

      <div class="senex__header__middle"></div>

      <div class="senex__header__bottom">
        <div class="senex__header__left">
          <ul class="senex__detail-menu">
            <li class="senex__detail-menu__item senex__detail-menu__item--tab senex__detail-menu__item--active">
              Information
            </li>
            <li class="senex__detail-menu__item senex__detail-menu__item--tab">
              Fees
            </li>
            <li class="senex__detail-menu__item senex__detail-menu__item--tab">
              Files
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="senex__footer">
      <div class="senex__strip__left">
        <div class="senex__master-button-group">
          <div
              class="senex__master-button senex__master-button--cancel senex__master-button--disabled senex__clients__reset-info">
            Reset
          </div>
          <div
              class="senex__master-button senex__master-button--save senex__master-button--disabled senex__clients__update-info"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
