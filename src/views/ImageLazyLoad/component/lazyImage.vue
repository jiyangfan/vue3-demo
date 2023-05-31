<template>
  <div class="lazy-image">
    <img src="../../../assets/default.png"/>
  </div>
</template>
<script setup lang="typescript">

const props = defineProps({
  url: String
})

/**
 * WebApi -- Intersection Observer API
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
 * @type {IntersectionObserver}
 */
const ob = new IntersectionObserver((entries, observer) => {
  for (const en of entries) {
    if (en.isIntersecting) {
      const img = en.target;
      img.src = img.dataset.src;
    }
  }
}, {
  // 指定根元素，用于检查目标的可见性，必须是目标元素的父级元素，如果未指定或者为null，则默认为浏览器视窗
  // root: null,
  // 根 (root) 元素的外边距。类似于 CSS 中的 margin 属性，比如 "10px 20px 30px 40px" (top、right、bottom、left)。如果有指定 root 参数，则 rootMargin 也可以使用百分比来取值。该属性值是用作 root 元素和 target 发生交集时候的计算交集的区域范围，使用该属性可以控制 root 元素每一边的收缩或者扩张。默认值为四个边距全是 0。
  // rootMargin: 10,
  // 可以是单一的 number 也可以是 number 数组，target 元素和 root 元素相交程度达到该值的时候 IntersectionObserver 注册的回调函数将会被执行。如果你只是想要探测当 target 元素的在 root 元素中的可见性超过 50% 的时候，你可以指定该属性值为 0.5。如果你想要 target 元素在 root 元素的可见程度每多 25% 就执行一次回调，那么你可以指定一个数组 [0, 0.25, 0.5, 0.75, 1]。默认值是 0 (意味着只要有一个 target 像素出现在 root 元素中，回调函数将会被执行)。该值为 1.0 含义是当 target 完全出现在 root 元素中时候 回调才会被执行。
  threshold: 0
});

const initImage = () => {
  const imgs = document.querySelectorAll('lazy-image img')
}


</script>
<style scoped>
  .lazy-image{

  }
</style>