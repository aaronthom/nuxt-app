<!-- Current problems:

  the modal which contains the input for the key name only exists once -> so if i change value in the modal, all columns change their name

  i need to create a new modal for every key (column ) that gets created -> with an individual value so i can change every columns name 

  -> that also means that the showModal button of every column needs to show the right modal which contains the input for the key name of this exact column.

-->

<template>
  <div class="flex-container">
    <div class="configurator">
      <div class="checkbox-row" v-for="(row, rowIndex) in rows" :key="rowIndex">
        <div class="position">
          <h3 v-show="rowIndex < 1">Pos.</h3>
          <UBadge v-model="row.position" color="sky" size="lg" variant="solid" style="
              width: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
            ">
            {{ rowIndex + 1 }}
          </UBadge>
        </div>
        <div class="door-designation">
          <h3 v-show="rowIndex < 1">Türbezeichnung</h3>
          <UInput v-model="row.doorDesignation" color="grey" size="sm" variant="outline" placeholder="z.B. Haupteingang"
            style="width: 200px" />
        </div>
        <div class="quantity">
          <h3 v-show="rowIndex < 1">Anzahl</h3>
          <UInput v-model="row.quantity" class="quantity-input" color="grey" size="sm" type="number" variant="outline"
            style="width: 70px" />
        </div>
        <div class="cylinder-type">
          <h3 v-show="rowIndex < 1">Zylinder-Typ</h3>
          <USelectMenu v-model="row.type" color="grey" :options="cylinderType" placeholder="Zylinder wählen..."
            style="width: 200px" />
        </div>
        <div class="sizes" v-if="row.type == 'Doppelzylinder' ||
        row.type == 'Knaufzylinder (Knauf außen)'
        ">
          <div class="outside">
            <h3 v-show="rowIndex < 1">Außen</h3>
            <USelectMenu v-model="row.outside" color="grey" :options="sizes" placeholder="..." style="width: 70px" />
          </div>
          <div class="inside">
            <h3 v-show="rowIndex < 1">Innen</h3>
            <USelectMenu v-model="row.inside" color="grey" :options="sizes" placeholder="..." style="width: 70px" />
          </div>
        </div>
        <div class="sizes-halfcylinder" v-else-if="row.type == 'Halbzylinder'">
          <div class="outside">
            <h3 v-show="rowIndex < 1">Außen</h3>
            <UBadge color="grey" variant="outline" size="lg" style="width: 70px">&nbsp;10&nbsp;</UBadge>
          </div>
          <div class="inside">
            <h3 v-show="rowIndex < 1">Innen</h3>
            <USelectMenu v-model="row.inside" color="grey" :options="sizes" placeholder="..." style="width: 70px" />
          </div>
        </div>
        <div class="sizes-empty" v-else>
          <div class="outside">
            <h3 v-show="rowIndex < 1">Außen</h3>
            <UBadge color="grey" variant="outline" size="lg" style="width: 70px">&nbsp;N/A&nbsp;</UBadge>
          </div>
          <div class="inside">
            <h3 v-show="rowIndex < 1">Innen</h3>
            <UBadge color="grey" variant="outline" size="lg" style="width: 70px">&nbsp;N/A&nbsp;</UBadge>
          </div>
        </div>
        <div class="options">
          <h3 v-show="rowIndex < 1">N&G-Funktion</h3>
          <USelectMenu v-model="row.options" :options="cylinderOptions" color="grey" placeholder="Optionen auswählen"
            @click="resetOptions(rowIndex)" style="width: 200px" />
        </div>
        <div class="duplicate">
          <br v-show="rowIndex < 1" />
          <UButton icon="i-heroicons-document-duplicate" size="sm" color="sky" variant="outline" :trailing="false"
            @click="duplicateRow(rowIndex)" />
        </div>
        <div class="delete">
          <br v-show="rowIndex < 1" />
          <UButton icon="i-heroicons-trash" size="sm" color="red" variant="solid" :trailing="false"
            @click="deleteRow(rowIndex)" />
        </div>
        <div class="checkbox-item" v-for="(checkbox, colIndex) in row" :key="colIndex">
          <input type="text" readonly class="key-name" v-model="checkbox.keyname" v-show="rowIndex < 1" style="
              writing-mode: vertical-rl;
              position: absolute;
              margin-top: -16.8em;
              height: 140px;
              cursor: default;
            ">
              
        </input>

          <UButton icon="i-heroicons-pencil" v-show="rowIndex < 1" @click="openModal(colIndex)" size="sm" color="sky"
            variant="solid" :trailing="false" style="
              writing-mode: vertical-rl;
              position: absolute;
              margin-top: -4.4em;
            " />
          <ColumnModal :columnId="colIndex" v-model="modalStates[colIndex]"
            @update-column-name="updateColumnName(colIndex, $event)" />
          <p v-show="rowIndex < 1">&nbsp;</p>
          <UCheckbox name="{{ rowIndex * 100 + colIndex + 1 }}" v-model="checkbox.checked" color="blue" />
          <p v-if="this.rows.length - 1 < 1">&nbsp;</p>
          <UButton @click="deleteCheckbox(colIndex)" v-show="rowIndex == this.rows.length - 1" icon="i-heroicons-trash"
            size="sm" color="red" variant="solid" :trailing="false" style="
              writing-mode: vertical-rl;
              position: absolute;
              margin-top: 5.5em;
            " />
          <UButton @click="duplicateCol(colIndex)" v-show="rowIndex == this.rows.length - 1"
            icon="i-heroicons-document-duplicate" size="sm" color="sky" variant="outline" :trailing="false" style="
              writing-mode: vertical-rl;
              position: absolute;
              margin-top: 11.4em;
            " />

        </div>
      </div>
      <div class="buttons">
        <UButton class="add-door-button" icon="i-heroicons-plus-16-solid" @click="addRow" size="sm" color="amber"
          variant="solid" :trailing="false">Tür hinzufügen</UButton>
        <UButton class="test-button" @click="test" size="sm" color="amber" variant="solid" :trailing="false">Test
        </UButton>
      </div>
    </div>
    <UButton class="add-key-button" icon="i-heroicons-plus-16-solid" @click="addCheckbox" size="sm" color="amber"
      variant="solid" :trailing="false">Schlüssel hinzufügen</UButton>
  </div>
</template>

<script>
import { ref } from "vue";
import ColumnModal from './ColumnModal.vue';


export default {
  components: {
    ColumnModal,
  },
  data() {
    return {

      modalStates: {},

      rows: [
        [
          {
            position: 1,
            doorDesignation: "",
            doorquantity: "",
            type: "",
            outside: "",
            inside: "",
            options: "",
            checked: false,
            keyname: "",
            keyquantity: "",
          },
        ],
      ],
      cylinderType: [
        "Doppelzylinder",
        "Knaufzylinder (Knauf außen)",
        "Halbzylinder",
        "Vorhangschloss 50mm",
        "Vorhangschloss 80mm",
        "Briefkastenschloss",
      ],
      sizes: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
      selectedOptions: ref([]),
      cylinderOptions: ["Not- & Gefahrenfunktion"],
    };
  },
  methods: {
    resetOptions(rowIndex) {
      this.rows[rowIndex].options = [];
    },

    openModal(colIndex) {
      this.modalStates[colIndex] = true;
    },

    updateColumnName(colIndex, newName) {
      // Hier können Sie den neuen Namen der Spalte speichern
      this.rows[0][colIndex].keyname = newName;
    },

    addRow() {
      const numCheckboxes = this.rows[0].length; // Get the number of checkboxes in the first row
      const newRow = [];
      for (let i = 0; i < numCheckboxes; i++) {
        newRow.push({ checked: false }); // Create a new row with the same number of checkboxes as the first row
      }
      this.rows.push(newRow); // Add the new row
      //this.rows[this.rows.length - 1].options = []; // setting the empty array for each option /// very bad solution but no other idea at the moment
    },

    addCheckbox() {
      this.rows.forEach((row) => {
        row.push({ checked: false }); // Add one checkbox to each row
      });
    },


    deleteCheckbox(colIndex) {
      this.rows.forEach((row) => {
        if (row.length > 1) {
          row.splice(colIndex, 1); // Remove the last checkbox from each row if more than one exists
        }
      });
    },

    deleteRow(rowIndex) {
      if (rowIndex > 0) {
        this.rows.splice(rowIndex, 1); // Entferne die Zeile an der gegebenen Indexposition
      } // Entferne die Zeile an der gegebenen Indexposition
      else {
        alert("Hier ist Schluss!");
      }
    },

    duplicateRow(rowIndex) {
      const currentRow = this.rows[rowIndex]; // Aktuelle Zeile
      const newRow = this.deepCopy(currentRow); // Tiefe Kopie der aktuellen Zeile
      this.rows.splice(rowIndex + 1, 0, newRow); // Füge die neue Zeile nach der aktuellen Zeile ein
    },

    duplicateCol(colIndex) {
      // Iteriere über alle Zeilen
      this.rows.forEach((row, rowIndex) => {
        // Überprüfe, ob die Spalte existiert
        if (row[colIndex]) {
          // Erstelle eine tiefe Kopie der Spalte
          const newCol = this.deepCopy(row[colIndex]);
          // Füge die duplizierte Spalte in die entsprechende Position ein
          row.splice(colIndex + 1, 0, newCol);
        }
      });
    },

    // Funktion zum Erstellen einer tiefen Kopie eines Objekts
    deepCopy(obj) {
      if (typeof obj !== "object" || obj === null) {
        return obj; // Rückgabe des Objekts selbst, wenn es kein Objekt ist oder null ist
      }

      const copy = Array.isArray(obj) ? [] : {}; // Erstellen eines leeren Arrays für Arrays oder eines leeren Objekts für Objekte

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          copy[key] = this.deepCopy(obj[key]); // Rekursives Kopieren von Eigenschaften des Objekts
        }
      }

      return copy; // Rückgabe der tiefen Kopie des Objekts
    },

    test() {
      this.rows[0][1].keyname = "Schlüssel 1";
      this.rows[0].doorDesignation = "TürTest";
      this.rows[2].doorDesignation = "TürTest 22";
      this.rows[1].quantity = "5";
      this.rows[0][1].keyquantity = "6"
      this.rows[1].type = "Doppelzylinder";
      this.rows[1].inside = "35";
      this.rows[1].outside = "35";
      this.rows[1].options = ["Not- & Gefahrenfunktion"];
      this.rows[1][1].checked = true;
      this.rows[1][2].checked = true;
      this.rows[3][2].checked = true;
      this.rows[1][4].checked = true;
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  margin: 250px 0px 0px 30px;
}

.checkbox-row {
  display: flex;
  /* Display rows horizontally */
  margin-bottom: 10px;
  /* Spacing between rows */
  gap: 10px;
}

.checkbox-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Display rows vertically */
  align-items: center;
  margin-right: 10px;
  /* Spacing between checkboxes */
  padding-bottom: -10px;
}

.buttons,
.sizes-empty,
.sizes-halfcylinder,
.sizes {
  display: flex;
  /* Display buttons horizontally */
  justify-content: flex-start;
  /* Align buttons to the right */
  gap: 10px;
  /* Spacing between buttons */
}

.add-door-button {
  display: flex;
  justify-content: center;
  font-weight: 600;
  height: 36px;
  width: 200px;
}

.test-button {
  height: auto;
}

.add-key-button {
  margin: 23px 0 0 2px;
  writing-mode: vertical-rl;
  display: flex;
  justify-content: center;
  /* Align buttons to the right */
  font-weight: 600;
  height: 200px;
}

.key-name {
  width: 30px;
  overflow: hidden;
}
</style>
