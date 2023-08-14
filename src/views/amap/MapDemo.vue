<template>
  <div id="container"></div>
  <div className="input-card" style="width: 120px">
    <button className="btn" @click="createPolygon" style="margin-bottom: 5px">新建</button>
    <button className="btn" @click="polygonOpen" style="margin-bottom: 5px">开始编辑</button>
    <button className="btn" @click="polygonClose">结束编辑</button>
    <button className="btn" @click="getAllPolygon">查看所有多边形</button>
  </div>
</template>
<script lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity';
import { nanoid } from 'nanoid';
import polygonItem from "../PolygonItem";
import PolygonMap from "../PolygonMap";

export default {
  name: 'MapDemo',
  data () {
    return {
    }
  },
  mounted(){
    //DOM初始化完成进行地图初始化
    this.initMap();
  },
  methods: {
    setup(){
      const polygonMap = shallowRef(null);
      return{
        polygonMap,
      }
    },
    initMap(){
      this.polygonMap = new PolygonMap()
    },
    /**
     * 开始新多边形绘画
     */
    createPolygon () {

      // this.polyEditor.close();
      this.polygonMap.polyEditor.setTarget();
      this.polygonMap.polyEditor.open();
    },
    /**
     * 开始编辑多边形
     */
    polygonOpen () {
      this.polygonMap.polyEditor.open();
    },
    /**
     * 停止编辑多边形
     */
    polygonClose () {
      this.polygonMap.polyEditor.close();
    },

    getAllPolygon () {
      console.log(this.polygonMap.getApolygonList());
    }

  }
}
</script>


<style scoped>
  #container{
    padding:0px;
    margin: 0px;
    width: 100%;
    height: 800px;
  }
</style>