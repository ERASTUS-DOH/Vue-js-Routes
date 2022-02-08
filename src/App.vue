<template>
  <div class='container'>
    <div class='block' :class='{animate: animatedBlock}'></div>
    <button @click='animateBlock'>Animate</button>
  </div>
  <div class='container'>
    <transition>
      <p v-if='paraIsVisible'>This is only sometimes visible......</p>
    </transition>
    <button @click='toggleParagraph'>Toggle Paragraph</button>
  </div>
  <div class="container">
    <transition name="fade-button" mode="out-in">
      <button v-if="!userVisibility" @click="showUsers">Show User</button>
      <button v-else @click="hideUsers">Hide User</button>
    </transition>
  </div>


  <base-modal @close='hideDialog' :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click='hideDialog'>Close it!</button>
  </base-modal>
  <div class='container'>
    <button @click='showDialog'>Show Dialog</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogIsVisible: false,
      animatedBlock: false,
      paraIsVisible: false,
      userVisibility: false,
    };
  },
  methods: {
    showUsers(){
      this.userVisibility = true;
    },
    hideUsers(){
      this.userVisibility = false;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    animateBlock() {
      this.animatedBlock = true;
    },
    toggleParagraph() {
      this.paraIsVisible = !this.paraIsVisible;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}

.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /*transition: transform 0.3s ease-out;*/
}

.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}
.v-leave-active {
  transition: all 0.5s ease-out;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.v-enter-active {
  transition: all 0.5s ease-in;
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.animate {
  animation: slide-fade 0.8s ease-in-out forwards;
}

.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-button-enter-from{
  opacity: 0;
}

.fade-button-enter-active{
  transition: opacity 0.8s ease-out;
}

.fade-button-enter-to{
  opacity: 1;
}


@keyframes slide-fade {
  0% {
    transform: translateX(0) scale(1);
  }

  20% {
    transform: translateX(50px) scale(1.2);
  }

  40% {
    transform: translateX(100px) scale(1.4);
  }

  60% {
    transform: translateX(50px) scale(1.2);
  }

  80% {
    transform: translateX(-100px) scale(1.8);
  }

  100% {
    transform: translateX(0px) scale(1);
  }

}
</style>