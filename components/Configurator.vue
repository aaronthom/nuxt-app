<template>
  <div class="configurator">
    <div class="checkbox-row" v-for="(row, rowIndex) in rows" :key="rowIndex">
      <RowObject :positionIndex="rowIndex + 1" />
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
        <br v-show="rowIndex < 1"/>
        <UCheckbox
          name="{{ rowIndex * 100 + colIndex + 1 }}"
          v-model="checkbox.checked"
        />
        <!--{{ rowIndex * 100 + colIndex + 1 }}-->
      </div>
    </div>
    <div class="door-buttons">
      <UButton
        @click="addRow"
        size="sm"
        color="sky"
        variant="solid"
        :trailing="false"
        >Zylinder +</UButton
      >
      <UButton
        @click="removeRow"
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
    <div class="key-buttons"></div>
  </div>
</template>

<script>

const isOpen = ref(false)

export default {
  data() {
    return {
      rows: [[{ checked: false }]], // Start with one row and one checkbox
    };
  },
  methods: {
    addRow() {
      const numCheckboxes = this.rows[0].length; // Get the number of checkboxes in the first row
      const newRow = [];
      for (let i = 0; i < numCheckboxes; i++) {
        newRow.push({ checked: false }); // Create a new row with the same number of checkboxes as the first row
      }
      this.rows.push(newRow); // Add the new row
    },
    addCheckbox() {
      this.rows.forEach((row) => {
        row.push({ checked: false }); // Add one checkbox to each row
      });
    },
    /*removeRow(rowIndex) {
      if (this.rows.length > 1) {
        this.rows.splice(rowIndex, 1); // Remove the row at the specified index
      } else {
        alert('Sie können keine Zeilen mehr entfernen.');
      }
    }, */
    removeRow() {
      if (this.rows.length > 1) {
        this.rows.pop();
      } else {
        alert("Sie können keine Zeilen mehr entfernen.");
      }
    },
    deleteRow() {
      if (this.rows.length > 1) {
        this.rows.splice(5, 1);
      } else {
        alert("Sie können keine Zeilen mehr entfernen.");
      }
    },
    removeCheckbox() {
      this.rows.forEach((row) => {
        if (row.length > 1) {
          row.pop(); // Remove the last checkbox from each row if more than one exists
        }
      });
    },
    duplicateRow(rowIndex) {
      // Erstellen einer tiefen Kopie der Zeile, die dupliziert werden soll
      const newRow = JSON.parse(JSON.stringify(this.rows[rowIndex]));
      // Hinzufügen der duplizierten Zeile in das Array der Zeilen
      this.rows.splice(rowIndex + 1, 0, newRow);
    },

    /*duplicateRow(rowIndex) {
      const newRow = this.rows[rowIndex].slice();

      this.rows.splice(rowIndex + 1, 0, newRow);
    },*/

    test() {
      this.rows[1][1].checked = true;
      this.rows[2][1].checked = true;
      this.rows[2][2].checked = true;
      this.rows[3][1].checked = true;
      this.rows[3][3].checked = true;
      this.rows[2][3].checked = true;
      this.rows[1][3].checked = true;
      this.rows[3][5].checked = true;
      this.rows[2][5].checked = true;
      this.rows[1][5].checked = true;
    },
  },
};
</script>

<style scoped>
.checkbox-row {
  display: flex;
  /* Display rows horizontally */
  margin-bottom: 10px;
  /* Spacing between rows */
}

.checkbox-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
  /* Spacing between checkboxes */
}

h1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
}

.configurator {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.door-buttons {
  display: flex;
  gap: 10px;
}
</style>
