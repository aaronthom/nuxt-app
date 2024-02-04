<script setup>

const selectedCheck = ref(true)

</script>


<template>
    <div class="column-object">
        <h3> {{ keyDesignation }} 1</h3>
        <Modal></Modal>
        <UCheckbox v-model="selectedCheck" name="notifications" label="1" color="sky" />
    </div>
</template>


<style scoped>

.column-object {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.width-200 {
    width: 200px;
}
</style>