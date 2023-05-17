<template>
  <div class="background-from-random-image-page" :style="{'background': backgroundStyle}">
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
</template>
<script setup>
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

  const handleMouseEnter = async (img, index) => {
    hoverIndex.value = index;
    const colors = await colorThief.getPalette(img, 3)
    const [c1,c2,c3] = colors.map(c => `rgb(${c[0]},${c[1]},${c[2]})`);
    backgroundStyle.value = `linear-gradient(to top, ${c1},${c2},${c3})`
    console.log(backgroundStyle.value);
  }
  const handleMounseLeave = () => {
    hoverIndex.value = undefined;
    // backgroundStyle.value = 'linear-gradient(to top, #fff,#fff,#fff)';
  }


</script>
<style scoped lang="scss">
.background-from-random-image-page{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-image 1s cubic-bezier(0.39, 0.575, 0.565, 1);
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

</style>