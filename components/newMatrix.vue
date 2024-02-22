<!-- Current problems:


JSON Parse etc functions dont work for the duplicate Row Method

problems occur with the multiple Select Box -> right now the only solution is to "refresh" the array (row.options)  with an empty array for every row

styling problem with the vertical text and the modal button

not able to initialize a new nuxt project

21/2/ 24 



-->

<template>
  <div class="configurator">
    <div class="checkbox-row" v-for="(row, rowIndex) in rows" :key="rowIndex">
      <div class="position">
        <h3 v-show="rowIndex < 1">Pos.</h3>
        <UBadge
          v-model="row.position"
          color="sky"
          size="lg"
          variant="solid"
          style="width: 30px"
        >
          {{ rowIndex + 1 }}
        </UBadge>
        <!-- Position -->
      </div>

      <div class="door-designation">
        <h3 v-show="rowIndex < 1">Türbezeichnung</h3>
        <UInput
          v-model="row.doorDesignation"
          color="sky"
          size="sm"
          variant="outline"
          placeholder="z.B. Haupteingang"
          style="width: 200px"
        />
      </div>

      <div class="quantity">
        <h3 v-show="rowIndex < 1">Anzahl</h3>
        <UInput
          v-model="row.quantity"
          class="quantity-input"
          color="sky"
          size="sm"
          type="number"
          variant="outline"
          style="width: 50px"
        />
      </div>

      <div class="cylinder-type">
        <h3 v-show="rowIndex < 1">Zylinder-Typ</h3>
        <USelectMenu
          v-model="row.type"
          color="sky"
          :options="cylinderType"
          placeholder="Zylinder wählen..."
          style="width: 300px"
        />
      </div>

      <div
        class="sizes"
        v-if="
          row.type == 'Doppelzylinder' ||
          row.type == 'Knaufzylinder (Knauf außen)' ||
          row.type == 'Halbzylinder'
        "
      >
        <div class="outside">
          <h3 v-show="rowIndex < 1">Außen</h3>
          <USelectMenu
            v-model="row.outside"
            color="sky"
            :options="sizes"
            placeholder="..."
            style="width: 80px"
          />
        </div>

        <div class="inside">
          <h3 v-show="rowIndex < 1">Innen</h3>
          <USelectMenu
            v-model="row.inside"
            color="sky"
            :options="sizes"
            placeholder="..."
            style="width: 80px"
          />
        </div>
      </div>

      <div class="sizes-empty" v-else>
        <div class="outside">
          <h3 v-show="rowIndex < 1">Außen</h3>
          <UBadge color="sky" variant="outline" size="lg" style="width: 80px"
            >&nbsp;N/A&nbsp;</UBadge
          >
        </div>
        <div class="inside">
          <h3 v-show="rowIndex < 1">Innen</h3>
          <UBadge color="sky" variant="outline" size="lg" style="width: 80px"
            >&nbsp;N/A&nbsp;</UBadge
          >
        </div>
      </div>

      <div class="options">
        <h3 v-show="rowIndex < 1">Optionen</h3>
        <USelectMenu
          v-model="row.options"
          :options="cylinderOptions"
          multiple
          @click="resetOptions(rowIndex)"
          color="sky"
          placeholder="Optionen auswählen"
          style="width: 200px"
        />
        <!--   multiple __________________   ___________________________________________ -->
      </div>
      <div class="duplicate">
        <br v-show="rowIndex < 1" />
        <UButton
          icon="i-heroicons-document-duplicate"
          size="sm"
          color="sky"
          variant="solid"
          :trailing="false"
          @click="duplicateRow(rowIndex)"
        />
      </div>
      <div class="delete">
        <br v-show="rowIndex < 1" />
        <UButton
          icon="i-heroicons-trash"
          size="sm"
          color="sky"
          variant="solid"
          :trailing="false"
          @click="deleteRow(rowIndex)"
        />
      </div>

      <div
        class="checkbox-item"
        v-for="(checkbox, colIndex) in row"
        :key="colIndex"
      >
        <h3
          v-show="rowIndex < 1"
          style="
            writing-mode: vertical-rl;
            position: absolute;
            margin-top: -14em;
            margin-left: ;
          "
        >
          Schlüssel {{ rowIndex * 100 + colIndex + 1 }}
        </h3>
        <UButton
          icon="i-heroicons-pencil"
          v-show="rowIndex < 1"
          size="sm"
          color="sky"
          variant="solid"
          :trailing="false"
          style="
            writing-mode: vertical-rl;
            position: absolute;
            margin-top: -4em;
            margin-left: ;
          "
        />
        <p v-show="rowIndex < 1">&nbsp;</p>
        <UCheckbox
          name="{{ rowIndex * 100 + colIndex + 1 }}"
          v-model="checkbox.checked"
        />
      </div>
    </div>

    <div class="buttons">
      <UButton
        @click="addRow"
        size="sm"
        color="sky"
        variant="solid"
        :trailing="false"
        >Zylinder +</UButton
      >
      <UButton
        @click="removeRow(rowIndex)"
        size="sm"
        color="sky"
        variant="solid"
        :trailing="false"
        >Zylinder -</UButton
      >
      <UButton
        @click="addCheckbox"
        size="sm"
        color="sky"
        variant="solid"
        :trailing="false"
        >Schlüssel +</UButton
      >
      <UButton
        @click="removeCheckbox"
        size="sm"
        color="sky"
        variant="solid"
        :trailing="false"
        >Schlüssel -</UButton
      >
      <UButton
        @click="test"
        size="sm"
        color="sky"
        variant="solid"
        :trailing="false"
        >Test</UButton
      >
    </div>
  </div>
</template>

<script>
const initialize = () => {
  this.rows[this.rows.length - 1].options = [];
};
import { ref } from "vue";

export default {
  data() {
    return {
      rows: [
        [
          {
            position: 1,
            doorDesignation: "",
            quantity: "",
            type: "",
            outside: "",
            inside: "",
            options: ref([]), //doenst work with ref neither
            checked: false,
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
      sizes: [30, 35, 40, 45, 50, 55, 60],
      selectedOptions: ref([]),
      cylinderOptions: [
        "Not- & Gefahrenfunktion",
        "Drehknauf",
        "FZG",
        "ABH Kl. 1",
        "ABH Kl. 2",
        "PSH",
        "Modular",
      ],
    };
  },
  methods: {
    resetOptions(rowIndex) {
      this.rows[rowIndex].options = [];
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

    removeRow() {
      const lastRowIndex = this.rows.length - 1; // Index der letzten Zeile
      if (lastRowIndex > 0) {
        // Stellen Sie sicher, dass mindestens eine Zeile vorhanden ist
        this.rows.splice(lastRowIndex, 1); // Entfernen Sie die letzte Zeile
      } else {
        alert("Hier ist Schluss!");
      }
    },

    removeCheckbox() {
      this.rows.forEach((row) => {
        if (row.length > 1) {
          row.pop(); // Remove the last checkbox from each row if more than one exists
        }
      });
    },

    duplicateRowLightCopy(rowIndex) {
      //this function is used to duplicate a row with a light copy -> we need a deep copy of the row
      const newRow = Object.assign({}, this.rows[rowIndex]);
      this.rows.splice(rowIndex + 1, 0, newRow);
    },

    duplicateRowJSON(rowIndex) {
      const currentRow = this.rows[rowIndex]; // Aktuelle Zeile
      const newRow = JSON.parse(JSON.stringify(currentRow)); // Tiefe Kopie der aktuellen Zeile
      this.rows.splice(rowIndex + 1, 0, newRow); // Füge die neue Zeile nach der aktuellen Zeile ein
    },

    duplicateRow(rowIndex) {
      const currentRow = this.rows[rowIndex]; // Aktuelle Zeile
      const newRow = this.deepCopy(currentRow); // Tiefe Kopie der aktuellen Zeile
      this.rows.splice(rowIndex + 1, 0, newRow); // Füge die neue Zeile nach der aktuellen Zeile ein
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

    deleteRow(rowIndex) {
      if (rowIndex > 0) {
        this.rows.splice(rowIndex, 1); // Entferne die Zeile an der gegebenen Indexposition
      } // Entferne die Zeile an der gegebenen Indexposition
      else {
        alert("Hier ist Schluss!");
      }
    },

    test() {
      this.rows[1].doorDesignation = "Dies ist ein Test";
      this.rows[1].quantity = "5";
      this.rows[1].type = "Doppelzylinder";
      this.rows[1].inside = "35";
      this.rows[1].outside = "35";
      this.rows[1].options = [
        "Not- & Gefahrenfunktion",
        "Drehknauf",
        "FZG",
        "ABH Kl. 1"];
      this.rows[1][1].checked = true;
      this.rows[1][2].checked = true;
      this.rows[3][2].checked = true;
      this.rows[1][4].checked = true;
    },
  },
};
</script>


<style scoped>
.configurator {
 
  margin: 310px 0 0 0;
}
.checkbox-row {
  display: flex; /* Display rows horizontally */
  margin-bottom: 10px; /* Spacing between rows */
  gap: 10px;
}

.checkbox-item {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Display rows vertically */
  align-items: center;
  margin-right: 10px; /* Spacing between checkboxes */
}

.buttons,
.sizes-empty,
.sizes {
  display: flex; /* Display buttons horizontally */
  justify-content: flex-start; /* Align buttons to the right */
  gap: 10px; /* Spacing between buttons */
}
</style>