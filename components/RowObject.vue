<script>


export default {

    data() {

    },
    props: {
        positionIndex: String
    }

};

//data arrays for select menus
const cylinderType = ['Doppelzylinder', 'Knaufzylinder (Knauf außen)', 'Halbzylinder', 'Vorhangschloss 50mm', 'Vorhangschloss 80mm', 'Briefkastenschloss']

const sizes = [30, 35, 40, 45, 50, 55, 60]

const position = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const empty = []

const options = ['Not- & Gefahrenfunktion', 'Drehknauf', 'FZG', 'ABH Kl. 1', 'ABH Kl. 2', 'PSH', 'Modular']



// selected values
const selectedCylinderType = ref(cylinderType[0])

const selectedOutside = ref(sizes[0])

const selectedInside = ref(sizes[0])

const selectedOption = ref([])

const selectedCheck = ref(true)


</script>


<template>
    <div class="cylinder-configuration">
        <div class="position">
            <h4 v-show="positionIndex == 1"> Pos.</h4>
            <UBadge color="sky" size="lg" variant="solid"> {{ positionIndex }} </UBadge>
        </div>
        <div class="door-designation">
            <h4 v-show="positionIndex == 1"> Türbeschreibung</h4>
            <UInput color="sky" size="sm" variant="outline" placeholder="z.B. Haupteingang" />
        </div>
        <div class="quantity">
            <h4 v-show="positionIndex == 1"> Anzahl</h4>
            <UInput class="quantity-input" color="sky" size="sm" type="number" variant="outline" />
        </div>
        <div class="cylinder-type width-200">
            <h4 v-show="positionIndex == 1"> Zylinder-Typ</h4>
            <USelectMenu color="sky" v-model="selectedCylinderType" :options="cylinderType" />
        </div>
        <div class="sizes"
            v-if="selectedCylinderType == 'Doppelzylinder' || selectedCylinderType == 'Knaufzylinder (Knauf außen)' || selectedCylinderType == 'Halbzylinder'">
            <div class="outside">
                <h4 v-show="positionIndex == 1"> Außen</h4>
                <USelectMenu color="sky" v-model="selectedOutside" :options="sizes" />
            </div>
            <div class="inside">
                <h4 v-show="positionIndex == 1"> Innen</h4>
                <USelectMenu color="sky" v-model="selectedInside" :options="sizes" />
            </div>
        </div>
        <div class="sizes-empty" v-else>
            <div class="outside">
                <h4 v-show="positionIndex == 1"> Außen</h4>
                <UBadge color="sky" variant="outline" size="lg">N/A</UBadge>
            </div>
            <div class="inside">
                <h4 v-show="positionIndex == 1"> Innen</h4>
                <UBadge color="sky" variant="outline" size="lg">N/A</UBadge>
            </div>
        </div>
        <div class="options width-200">
            <h4 v-show="positionIndex == 1">Optionen</h4>
            <USelectMenu color="sky" multiple v-model="selectedOption" :options="options"
                placeholder="Optionen auswählen" />
        </div>
        <div class="duplicate">
            <br v-show="positionIndex == 1">
            <UButton icon="i-heroicons-document-duplicate" size="sm" color="sky" variant="solid" :trailing="false" />
        </div>
        <div class="key-configuration">
            <h3 class="key-designation">Schlüssel 1 &nbsp;</h3>
            <Modal></Modal>
            <UCheckbox class="checkbox" v-model="selectedCheck" name="notifications" color="sky" />
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

.cylinder-configuration {
    margin-top: 80px;
}


.key-configuration {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.key-designation {
    writing-mode: vertical-rl;
}

.quantity-input {
    width: 50px;
}

.width-200 {
    width: 200px;
}

.margin-top-20px {
    margin-top: 20px;
}
</style>