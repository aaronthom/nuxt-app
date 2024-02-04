<template>
    <div>

        <div v-for="(row, rowIndex) in rows" :key="rowIndex" class="checkbox-row">


            <div v-for="(checkbox, index) in checkboxes" :key="index" class="checkbox-item">
                <input type="checkbox" v-model="checkbox.checked"> Checkbox {{ index + 1 }}
                <UCheckbox color="indigo" label="Label" :model-value="false" />

            </div>
            <button @click="addCheckbox">+</button>
            <button @click="delCheckbox">-</button>



            <br>
        </div>
    </div>
</template>
  
<style scoped>
.checkbox-group {
    display: flex;
    flex-wrap: wrap;
}

.checkbox-item {
    margin-right: 10px;
    /* Abstand zwischen den Checkboxen */
}
</style>

<script>
export default {
    data() {
        return {
            checkboxes: [{ checked: false }] // Anfangs eine Checkbox

        };
    },
    methods: {
        addCheckbox() {
            this.checkboxes.push({ checked: false }); // Füge eine weitere Checkbox hinzu
        },
        delCheckbox() {
            this.checkboxes.pop({ checked: false });
        }
    }



};
</script>
  