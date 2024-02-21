<template>
  <div>
    <h1>Pos. Bezeichnung Anzahl</h1>
    <div class="checkbox-row" v-for="(row, rowIndex) in rows" :key="rowIndex">
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
      <UInput
        v-model="row.bezeichnung"
        color="sky"
        size="sm"
        variant="outline"
        placeholder="z.B. Haupteingang"
        style="width: 200px"
      />
      <!-- Bezeichnung -->
      <UInput
        v-model="row.anzahl"
        class="quantity-input"
        color="sky"
        size="sm"
        type="number"
        variant="outline"
        style="width: 50px"
      />
      <!-- Anzahl -->
      <USelectMenu
        v-model="row.typ"
        color="sky"
        :options="cylinderType"
        placeholder="Zylinder wählen..."
        style="width: 300px"
      />
      <!-- Typ -->
      <USelectMenu
        v-model="row.aussen"
        color="sky"
        :options="sizes"
        placeholder="..."
        style="width: 80px"
      />
      <!-- aussen -->
      <USelectMenu
        v-model="row.innen"
        color="sky"
        :options="sizes"
        placeholder="..."
        style="width: 80px"
      />
      <!-- innen -->
      <USelectMenu
        v-model="row.optionen"
        color="sky"
        :options="cylinderOptions"
        placeholder="Optionen auswählen"
        style="width: 200px"
      /><!-- Options -->

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
        <br v-show="rowIndex < 1" />
        <UCheckbox
          name="{{ rowIndex * 100 + colIndex + 1 }}"
          v-model="checkbox.checked"
        />
      </div>
    </div>

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
</template>

<script>
export default {
  data() {
    return {
      rows: [
        [
          {
            position: 1,
            bezeichnung: "",
            anzahl: "",
            typ: "",
            aussen: "",
            innen: "",
            optionen: "",
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
    removeRow() {
      const lastRowIndex = this.rows.length - 1; // Index der letzten Zeile
      if (lastRowIndex >= 0) {
        // Stellen Sie sicher, dass mindestens eine Zeile vorhanden ist
        this.rows.splice(lastRowIndex, 1); // Entfernen Sie die letzte Zeile
      } else {
        alert("Es gibt keine Zeilen zum Entfernen.");
      }
    },
    removeCheckbox() {
      this.rows.forEach((row) => {
        if (row.length > 1) {
          row.pop(); // Remove the last checkbox from each row if more than one exists
        }
      });
    },

    test() {
      this.rows[1].bezeichnung = "Dies ist ein Test";
      this.rows[1].anzahl = "5";
      this.rows[1].typ = "Doppelzylinder";
      this.rows[1].innen = "35";
      this.rows[1].aussen = "35";
      this.rows[1][1].checked = true;
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
