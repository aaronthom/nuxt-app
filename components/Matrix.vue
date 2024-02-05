<template>
  <div>
    <div class="checkbox-row" v-for="(row, rowIndex) in rows" :key="rowIndex">
      <RowObject :positionIndex="rowIndex + 1"/>
      <div class="checkbox-item" v-for="(checkbox, colIndex) in row" :key="colIndex">
        <input type="checkbox" name="{{ rowIndex * 100 + colIndex + 1 }}" v-model="checkbox.checked">
        Checkbox {{ rowIndex * 100 + colIndex + 1 }}
      </div>
    </div>
    
    <UButton @click="addRow" size="sm" color="sky" variant="solid" :trailing="false">Zylinder +</UButton>
    <UButton @click="removeRow(rowIndex)" size="sm" color="sky" variant="solid" :trailing="false">Zylinder -</UButton>
    <UButton @click="addCheckbox" size="sm" color="sky" variant="solid" :trailing="false">Schlüssel +</UButton>
    <UButton @click="removeCheckbox" size="sm" color="sky" variant="solid" :trailing="false">Schlüssel -</UButton>
    <UButton @click="test" size="sm" color="sky" variant="solid" :trailing="false">Test</UButton>
    
  </div>
</template>

<script>

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
      this.rows.forEach(row => {
        row.push({ checked: false }); // Add one checkbox to each row
      });
    },
    removeRow(rowIndex) {
      if (this.rows.length > 1) {
        this.rows.splice(rowIndex, 1); // Remove the row at the specified index
      } else {
        alert('Sie können keine Zeilen mehr entfernen.');
      }
    },
    removeCheckbox() {
      this.rows.forEach(row => {
        if (row.length > 1) {
          row.pop(); // Remove the last checkbox from each row if more than one exists
        }
      });
    },
    
    test() {
              this.rows[1][1].checked = true; 
    }
  },
};
</script>

<style scoped>
.checkbox-row {
  display: flex; /* Display rows horizontally */
  margin-bottom: 10px; /* Spacing between rows */
}

.checkbox-item {
  margin-right: 10px; /* Spacing between checkboxes */
}
</style>