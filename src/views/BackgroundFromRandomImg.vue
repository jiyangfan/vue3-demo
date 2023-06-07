<template>
  <div class="background-from-random-image-page" :style="{'background': backgroundStyle}">
    <div
      :class="['background-image-bar', hoverIndex === i ? 'show' : '']"
      v-for="(item,i) in colors"
      :style="{'background': item}"
    ></div>
    <div class="img-list-container">
      <div class="img-list" >
        <img
          :src="item"
          :class="hoverIndex !== undefined ? hoverIndex === i ? 'active' : 'op' : ''"
          v-for="(item, i) in images"
          @mouseenter="handleMouseEnter($event.target, i)"
          @mouseleave="handleMounseLeave"
          crossorigin="anonymous"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import ColorThief from 'colorthief';
  import {ref} from "vue";

  const colorThief = new ColorThief();
  const hoverIndex = ref(undefined);
  const backgroundStyle = ref('');
  const images = [
    "https://picsum.photos/300/300?r=1",
    "https://picsum.photos/300/300?r=2",
    "https://picsum.photos/300/300?r=3",
    "https://picsum.photos/300/300?r=4"
  ]
  const colors = ref([undefined, undefined, undefined, undefined]);

  const handleMouseEnter = async (img, index) => {
    hoverIndex.value = index;
    if (colors.value[index] === undefined) {
      const cs = await colorThief.getPalette(img, 3)
      const [c1,c2,c3] = cs.map(c => `rgb(${c[0]},${c[1]},${c[2]})`);
      colors.value[index] = `linear-gradient(${c1},${c2},${c3})`;
      console.log(colors.value[index]);
    }
  }
  const handleMounseLeave = () => {
    // hoverIndex.value = undefined;
    // backgroundStyle.value = 'linear-gradient(#fff,#fff,#fff)';
  }


</script>
<style scoped lang="scss">
.background-from-random-image-page{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .background-image-bar{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    opacity: 0;
    transition: all .3s cubic-bezier(0.39, 0.575, 0.565, 1);
    &.show{
      opacity: 1;
    }
  }
  .img-list-container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(100px);
  }
  .img-list{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 50px;
    row-gap: 50px;
    img{
      width: 300px;
      height: 300px;
      transform: scale(.9);
      border: 0;
      transition: all .3s cubic-bezier(0.39, 0.575, 0.565, 1);
      &.op{
        opacity: .3;
      }
      &.active{
        opacity: 1;
        transform: scale(1);
        border: 5px solid #fff;
        box-shadow: 0px 0px 20px -5px #000;
      }
    }
  }
}
.gradient-box {
  width: 300px;
  height: 300px;
  background-image: linear-gradient(90deg, red, blue);
  animation: gradient-transition 5s infinite;
}
@keyframes gradient-transition {
  0% {
    background-image: linear-gradient(90deg, red, blue);
  }
  50% {
    background-image: linear-gradient(90deg, blue, red);
  }
  100% {
    background-image: linear-gradient(90deg, red, blue);
  }
}
</style>