// plugins/global-methods.js

export default ({ app }, inject) => {
    // Define your global method
    const myGlobalMethod = () => {
      console.log('This is a global method!');
    };
  
    // Inject the method into the Vue instance
    inject('myGlobalMethod', myGlobalMethod);
  };
  