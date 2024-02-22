<script>

export default {

    data() {
        return {

            rows: [[{ checked: false }]],
            selectedOption: ref([]),
            options: ['Not- & Gefahrenfunktion', 'Drehknauf', 'FZG', 'ABH Kl. 1', 'ABH Kl. 2', 'PSH', 'Modular'],

            selectedCylinderType: ref([]),
            cylinderType: ['Doppelzylinder', 'Knaufzylinder (Knauf außen)', 'Halbzylinder', 'Vorhangschloss 50mm', 'Vorhangschloss 80mm', 'Briefkastenschloss'],

            selectedOutside: ref([]),
            selectedInside: ref([]),
            sizes: [30, 35, 40, 45, 50, 55, 60],

            selectedCheck: ref(true),
        }
    },
    props: {
        positionIndex: Number,
    },
    methods: {
        deleteRow(rowIndex) {
                this.rows.splice(rowIndex);
        },
    },

};
</script>


<template>
    <div class="cylinder-configuration">
        <div class="position">
            <h4 v-show="positionIndex == 1"> Pos.</h4>
            <UBadge color="sky" size="lg" variant="solid" style="width: 30px;"> {{ positionIndex }} </UBadge>
        </div>
        <div class="door-designation">
            <h4 v-show="positionIndex == 1"> Türbeschreibung</h4>
            <UInput color="sky" size="sm" variant="outline" placeholder="z.B. Haupteingang" style="width: 200px;" />
        </div>
        <div class="quantity">
            <h4 v-show="positionIndex == 1"> Anzahl</h4>
            <UInput class="quantity-input" color="sky" size="sm" type="number" variant="outline" style="width: 50px;" />
        </div>
        <div class="cylinder-type">
            <h4 v-show="positionIndex == 1"> Zylinder-Typ</h4>
            <USelectMenu color="sky" v-model="selectedCylinderType" :options="cylinderType" placeholder="Zylinder wählen..."
                style="width: 300px;" />
        </div>
        <div class="sizes"
            v-if="selectedCylinderType == 'Doppelzylinder' || selectedCylinderType == 'Knaufzylinder (Knauf außen)' || selectedCylinderType == 'Halbzylinder'">
            <div class="outside">
                <h4 v-show="positionIndex == 1"> Außen</h4>
                <USelectMenu color="sky" v-model="selectedOutside" :options="sizes" placeholder="..."
                    style="width: 80px;" />
            </div>
            <div class="inside">
                <h4 v-show="positionIndex == 1"> Innen</h4>
                <USelectMenu color="sky" v-model="selectedInside" :options="sizes" placeholder="..." style="width: 80px;" />
            </div>
        </div>
        <div class="sizes-empty" v-else>
            <div class="outside">
                <h4 v-show="positionIndex == 1"> Außen</h4>
                <UBadge color="sky" variant="outline" size="lg" style="width: 80px;">&nbsp;N/A&nbsp;</UBadge>
            </div>
            <div class="inside">
                <h4 v-show="positionIndex == 1"> Innen</h4>
                <UBadge color="sky" variant="outline" size="lg" style="width: 80px;">&nbsp;N/A&nbsp;</UBadge>
            </div>
        </div>
        <div class="options">
            <h4 v-show="positionIndex == 1">Optionen</h4>
            <USelectMenu color="sky" multiple v-model="selectedOption" :options="options" placeholder="Optionen auswählen"
                style="width: 200px;" />
        </div>
        <div class="duplicate">
            <br v-show="positionIndex == 1">
            <UButton icon="i-heroicons-document-duplicate" size="sm" color="sky" variant="solid" :trailing="false" />
        </div>
        <div class="delete">
            <br v-show="positionIndex == 1">
            <UButton icon="i-heroicons-trash" size="sm" color="sky" variant="solid" :trailing="false" @click="deleteRow" />
        </div>
    </div>
</template>


<style scoped>
.cylinder-configuration,
.sizes,
.sizes-empty {
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

.margin-top-20px {
    margin-top: 20px;
}</style>