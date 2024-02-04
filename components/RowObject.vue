<script setup>

var positionIndex = 1


//data arrays for select menus
const cylinderType = ['Doppelzylinder', 'Knaufzylinder (Knauf außen)', 'Halbzylinder', 'Vorhangschloss 50mm', 'Vorhangschloss 80mm', 'Briefkastenschloss']

const sizes = [30, 35, 40, 45, 50, 55, 60]

const empty = []

const options = ['Not- & Gefahrenfunktion', 'Drehknauf', 'FZG', 'ABH Kl. 1', 'ABH Kl. 2', 'PSH', 'Modular']



// selected values
const selectedCylinderType = ref(cylinderType[0])

const selectedOutside = ref(sizes[0])

const selectedInside = ref(sizes[0])

const selectedOption = ref([])

function addRow() {
}

</script>


<template>
    <div class="row-object">
        <div class="position">
            <UBadge color="sky" size="lg" variant="solid"> {{ positionIndex }} </UBadge>
        </div>
        <div class="door-designation">
            <UInput color="sky" size="sm" variant="outline" placeholder="z.B. Haupteingang" />
        </div>
        <div class="quantity">
            <UInput class="quantity-input" color="sky" size="sm" type="number" variant="outline" />
        </div>
        <div class="cylinder-type width-200">
            <USelectMenu color="sky" v-model="selectedCylinderType" :options="cylinderType" />
        </div>
        <div class="sizes"
            v-if="selectedCylinderType == 'Doppelzylinder' || selectedCylinderType == 'Knaufzylinder (Knauf außen)' || selectedCylinderType == 'Halbzylinder'">
            <div class="outside">
                <USelectMenu color="sky" v-model="selectedOutside" :options="sizes" />
            </div>
            <div class="inside">
                <USelectMenu color="sky" v-model="selectedInside" :options="sizes" />
            </div>
        </div>
        <div class="sizes-empty"
            v-else>
            <div class="outside">
                <UBadge color="sky"  variant="outline" size="lg">N/A</UBadge>
            </div>
            <div class="inside">
                <UBadge color="sky"  variant="outline" size="lg">N/A</UBadge>
            </div>
        </div>
        <div class="options width-200">
            <USelectMenu color="sky" multiple v-model="selectedOption" :options="options"
                placeholder="Optionen auswählen" />
        </div>
        <div class="duplicate">
            <UButton icon="i-heroicons-document-duplicate" size="sm" color="sky" variant="solid" :trailing="false" />
        </div>

    </div>
</template>


<style scoped>
.row-object, .sizes, .sizes-empty {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.quantity-input {
    width: 50px;
}

.width-200 {
    width: 200px;
}
</style>