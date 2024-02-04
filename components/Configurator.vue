<!--konfigurator: 

-zwei main container -> zeilen container und spalten container
- zwei main objekte -> Zeile und Spalte
<template>
    <h1>Schließanlagen Konfigurator</h1>
    <div class="configurator">
         <RowObject class="key-configuration"></RowObject>
    </div>
</template>
-->
 
<template>
  <h1>Schließanlagen-Konfigurator</h1>
    <div class="configurator">
      <div v-for="(RowObject, index) in components" :key="index">
        <RowObject :positionIndex="index+1" :data="componentData" />{{ positionIndex }}
      </div>
      <button @click="addComponent">Weitere Tür hinzufügen</button>
    </div>
  </template>
  
  <script>
  import RowObject from '@/components/RowObject.vue'; 
  
  export default {
    components: {
      RowObject
    },
    data() {
      return {
        components: [this.componentData],
        componentData: {},
      };
    },
    methods: {
      addComponent() {
        this.components.push(this.componentData);
        positionIndex++;
      }
    }
  };
  </script>

<style scoped>
h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 700;
}

.configurator {
    margin-top:200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
}
</style>
 