<script setup lang="ts">


const isOpen = ref(false)

const keyDesignation = ref('');

const inputText = ''

</script>

<template>
  <div>
    <UButton class="modal-button" color="sky" @click="isOpen = true" icon="i-heroicons-pencil-square" />

    <UModal v-model="isOpen" color="sky">
      <div class="p-4">
        <UInput v-model="keyDesignation" color="sky" size="sm" variant="outline" placeholder="z.B. Generalschlüssel" /> <br>
        <UButton color="sky" @click="">Speichern</UButton>
      </div>
    </UModal>
  </div>
</template>


<style scoped>

.modal-button {
   
}

</style>