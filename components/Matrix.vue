<template>
    <div>
      <div class="checkbox-row" v-for="(row, rowIndex) in rows" :key="rowIndex">
        <div class="checkbox-item" v-for="(checkbox, colIndex) in row" :key="colIndex">
          <input type="checkbox" v-model="checkbox.checked"> Checkbox {{ rowIndex * row.length + colIndex + 1 }}
        </div>
      </div>
      <button @click="addRow">Zeile hinzufügen</button>
      <button @click="addCheckbox">Checkbox hinzufügen</button>
      <button @click="removeCheckbox">Checkbox entfernen</button>
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
        this.rows.push([{ checked: false }]); // Add another row with one checkbox
      },
      addCheckbox() {
        this.rows.forEach(row => {
          row.push({ checked: false }); // Add one checkbox to each row
        });
      },
      removeCheckbox() {
        this.rows.forEach(row => {
          if (row.length > 1) {
            row.pop(); // Remove the last checkbox from each row if more than one exists
          }
        });
      },
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