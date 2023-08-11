<template>
  <div class="map-chart">
    <div class="map-chart-step map-back"></div>
    <div class="map-chart-step map-tile"></div>
    <div class="map-chart-step map-gis"></div>
    <div class="map-chart-step map-data"></div>
    <div class="map-chart-step-info map-back">科技风格图层</div>
    <div class="map-chart-step-info map-tile">卫星图层</div>
    <div class="map-chart-step-info map-gis">GIS数据图班</div>
    <div class="map-chart-step-info map-data">生产实时数据实时监控</div>
  </div>
</template>

<style lang="scss">
.map-chart {
  width: 600px;
  height: 400px;
  margin-top: 200px;
  margin-left: 100px;
  position: relative;

  .map-chart-step {
    width: 200px;
    height: 200px;
    //transform: rotate3d(0, 0, 0, 180deg);
    transform: rotateX(1deg) rotateY(332deg) rotateX(48deg);
    position: absolute;
    z-index: 1;
    &.map-back {
      background-image: url(src/assets/map-chart1.jpg);
      background-size: contain;
      background-position: center;
      opacity: .8;
      box-shadow: 4px 5px 10px gray
    }

    &.map-tile {
      background-image: url(src/assets/map-chart2.jpg);
      background-size: contain;
      background-position: center;
      top: -40px;
      opacity: .8;
    }

    &.map-gis {
      background-image: url(src/assets/map-chart3.jpg);
      background-size: contain;
      background-position: center;
      top: -80px;
      opacity: .6;
    }

    &.map-data {
      background-image: url(src/assets/map-chart4.jpg);
      background-size: contain;
      background-position: center;
      top: -120px;
      opacity: .6;
    }
  }

  .map-chart-step-info{
    position: absolute;
    left: 325px;
    width: 180px;
    height: 40px;
    padding-left: 10px;
    z-index: 99;
    color: gray;
    &:before{
      content: '';
      position: absolute;
      width: 100px;
      height: 1px;
      left: -100px;
      background: gray;
      top: 10px;
    }

    &.map-back {
      top: 25px;
    }

    &.map-tile {
      top: -15px;
    }

    &.map-gis {
      top: -55px;
    }

    &.map-data {
      top: -95px;
    }
  }


}
</style>