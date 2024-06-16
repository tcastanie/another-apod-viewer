<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const { smaller } = useBreakpoints(breakpointsTailwind)
const smallerThanMd = smaller('md')

defineEmits(['close'])
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <UiH1>About</UiH1>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-ph-x"
          class="-my-1"
          @click="$emit('close')"
        />
      </div>
    </template>
    <UiP class="flex items-center">
      Simple APOD viewer app made with
      <UTooltip text="Nuxt" :popper="{ placement: 'top' }">
        <UIcon name="i-vscode-icons-file-type-nuxt" dynamic class="mx-2" />
      </UTooltip>
      and
      <UTooltip class="mx-2" :popper="{ placement: 'top' }">
        <template #text>
          😎
        </template>
        💪
      </UTooltip>
      by
      <UButton
        to="https://tcastanie.dev"
        target="_blank"
        variant="link"
        size="xl"
        icon="i-ph-planet-duotone"
        trailing
        :padded="false"
        class="ml-2"
      >
        tcastanie.dev
      </UButton>
    </UiP>
    <UiP class="mt-2">
      Original website :
      <UButton
        size="xl"
        variant="link"
        :padded="false"
        to="https://apod.nasa.gov"
        target="_blank"
      >
        http://apod.nasa.gov
      </UButton>
    </UiP>
    <UiH2 class="mt-8">
      Acknowledgement
    </UiH2>
    <UiP class="mt-4">
      The Astronomy Picture of the Day (APOD) is based upon work supported by NASA under award No. 80NSSC17M0076. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Aeronautics and Space Administration.
    </UiP>
    <UiH2 class="mt-8">
      About image permissions
    </UiH2>
    <UiP class="mt-4">
      All the images on the APOD page are credited to the owner or institution where they originated. Some of the images are copyrighted and to use these pictures publicly or commercially one must write to the owners for permission. For the copyrighted images, the copyright owner is identified in the APOD credit line (please see the caption under the image), along with a hyperlink to the owner's location. NASA images are in the public domain,
      <UButton
        size="xl"
        variant="link"
        :padded="false"
        to="https://www.nasa.gov/nasa-brand-center/images-and-media/"
        target="_blank"
      >
        official guidelines for their use can be found here
      </UButton>.
      For images credited to other owners/institutions, please contact them directly for copyright and permissions questions.
    </UiP>
    <UiP class="mt-4">
      Neither NASA nor APOD can grant permission to use copyrighted images. For use of these images, please write to the copyright owners.
    </UiP>
    <template v-if="smallerThanMd" #footer>
      <div class="flex items-center justify-end">
        <UButton
          color="gray"
          variant="ghost"
          trailing
          icon="i-ph-x"
          class="-my-1"
          @click="$emit('close')"
        >
          Close
        </UButton>
      </div>
    </template>
  </UCard>
</template>
