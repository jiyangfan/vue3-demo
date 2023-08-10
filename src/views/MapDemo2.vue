<template>
  <div id="home-map-container"></div>
  <div className="input-card" style="width: 120px">
    <button className="btn" @click="showLayer" style="margin-bottom: 5px">显示卫星图</button>
    <button className="btn" @click="hideLayer" style="margin-bottom: 5px">隐藏卫星图</button>
  </div>
</template>
<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity';
import { nanoid } from 'nanoid';
import polygonItem from "./PolygonItem";
import PolygonMap from "./PolygonMap";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {onMounted} from "vue";

let map = null;
let marker = null;
let AMap = null;

let camera = null;
let renderer = null;
let scene: THREE.Scene = null;
let meshes = [];
let customCoords = null;
// 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
let data = null;
let tileLayer = null;

// 崇明轮廓经纬度
const mask = [[121.118496,31.759078],[121.149226,31.787289],[121.171808,31.816628],[121.200328,31.835144],[121.225309,31.847039],[121.242068,31.853401],[121.252109,31.857733],[121.265578,31.864123],[121.281339,31.869038],[121.291162,31.870989],[121.301902,31.872716],[121.310365,31.8725],[121.315854,31.871483],[121.323057,31.868533],[121.36929,31.843281],[121.374486,31.839831],[121.375047,31.839458],[121.376375,31.838576],[121.385049,31.833531],[121.391113,31.826365],[121.395382,31.821294],[121.396489,31.820182],[121.397173,31.819593],[121.397679,31.818958],[121.398168,31.818344],[121.399149,31.817478],[121.399288,31.81711],[121.400423,31.815713],[121.405464,31.809838],[121.40591,31.809536],[121.410235,31.807159],[121.411494,31.806344],[121.413447,31.803245],[121.41459,31.800979],[121.414686,31.800792],[121.416307,31.797643],[121.41474,31.796882],[121.412379,31.796205],[121.410903,31.795582],[121.411353,31.794789],[121.419054,31.78249],[121.42091,31.779601],[121.422575,31.777784],[121.425783,31.774271],[121.431488,31.769261],[121.433283,31.768613],[121.439496,31.766363],[121.445388,31.764301],[121.449745,31.761664],[121.455573,31.759341],[121.464143,31.757141],[121.465427,31.757041],[121.476813,31.756146],[121.484508,31.754228],[121.487748,31.75342],[121.488827,31.754099],[121.489742,31.753391],[121.49856,31.75326],[121.513043,31.743696],[121.513916,31.743474],[121.514984,31.742871],[121.521489,31.741344],[121.524653,31.740735],[121.526687,31.740216],[121.528356,31.73835],[121.529374,31.738087],[121.539423,31.735498],[121.540124,31.733313],[121.545686,31.72955],[121.549505,31.726968],[121.551384,31.727384],[121.565022,31.716706],[121.57854,31.710528],[121.592263,31.706482],[121.593248,31.705377],[121.599665,31.703118],[121.600909,31.706996],[121.602752,31.706938],[121.611757,31.704288],[121.615647,31.702484],[121.627334,31.69777],[121.627718,31.697766],[121.628307,31.697886],[121.629202,31.697747],[121.633275,31.696162],[121.642654,31.697459],[121.648492,31.695559],[121.648724,31.705501],[121.654379,31.703712],[121.673583,31.699379],[121.817811,31.652027],[121.887611,31.63638],[121.975185,31.617039],[121.988245,31.529596],[121.993863,31.51189],[121.995716,31.4931],[121.991697,31.476758],[121.981808,31.464095],[121.967288,31.456661],[121.934299,31.442359],[121.918046,31.434692],[121.90114,31.430124],[121.89055,31.428787],[121.882098,31.42866],[121.87299,31.42934],[121.857813,31.430044],[121.845378,31.431891],[121.834217,31.433976],[121.819178,31.438211],[121.763436,31.458228],[121.729886,31.471978],[121.682858,31.491067],[121.670612,31.494217],[121.638648,31.499722],[121.625777,31.501769],[121.617682,31.503668],[121.60879,31.506904],[121.547679,31.531128],[121.471172,31.57443],[121.43422,31.590338],[121.414794,31.591078],[121.403519,31.590007],[121.395461,31.585441],[121.372212,31.553206],[121.345591,31.571686],[121.289106,31.616282],[121.179863,31.720773],[121.145332,31.753923],[121.142064,31.755309],[121.118496,31.759078]]
const listpoly = [];


const initMap = () => {
  return new Promise((resolve, reject) => {
    marker = null;
    map && map.clearMap && map.clearMap();
    AMap = null;
    map = null;
    AMapLoader.load({
      key: '6b12d6c98e3b1d5a5e1f6d961951cc69',             // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        // 'AMap.GLCustomLayer', // 自定义图层
        // 'AMap.GltfLoader', // three.js 3d
        // 'AMap.TileLayer', // 卫星图
        // 'AMap.Polygon', // 多边形
        // 'AMap.VectorLayer', //
      ],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((d) => {
      AMap = d;
      //利用行政区查询获取边界构建mask路径
      //也可以直接通过经纬度构建mask路径



      map = new AMap.Map("home-map-container", {  //设置地图容器id
        viewMode: "3D",    //是否为3D地图模式
        zoom: 10.5,           //初始化地图级别
        zooms: [10.5, 30],
        center: [121.577119, 31.637838], //初始化地图中心点位置
        pitch: 50,
        // center: [116.471354, 39.994257],
        // mapStyle: 'amap://styles/grey',
        mapStyle: 'amap://styles/grey',
        mask: [mask],
        showBuildingBlock: false,
        showLabel: false,

      });

      // 根据缩放等级设置卫星图显示
      // map.on("zoomend", () => {
      //   console.log(map.getZoom());
      //   if (map.getZoom() < 14) {
      //     hideLayer();
      //   } else {
      //     showLayer();
      //   }
      // });

      // 添加卫星图
      tileLayer = new AMap.TileLayer.Satellite();
      map.addLayer(tileLayer);
      tileLayer.hide();

      const areas = [
        {
          name: '东平国家森林公园',
          health: 90,
          path: [[121.470978,31.680638], [121.473939,31.692507], [121.491063,31.689403], [121.487672,31.674576], [121.47424,31.677972]]
        },
        {
          name: '紫海鹭缘香草庄园',
          health: 86,
          path: [[121.494539,31.675708], [121.493938,31.672604], [121.497929,31.671617], [121.498315,31.674685]]
        },
        {
          name: '垂钓中心',
          health: 67,
          path: [[121.492021,31.692261], [121.493185,31.69206], [121.493502,31.691536], [121.493084,31.691421], [121.491877,31.69165]]
        },

      ]

      // 添加文字
      var text = new AMap.Text({
        text: '纯文本标记',
        anchor: 'center', // 设置文本标记锚点
        draggable: true,
        cursor: 'pointer',
        angle: 0,
        visible: false,
        offset: [0, -25],
        style: {
          'padding': '5px 10px',
          'margin-bottom': '1rem',
          'border-radius': '.25rem',
          'background-color': 'rgba(0,0,0,0.5)',
          // 'width': '12rem',
          'border-width': 0,
          'box-shadow': '0 2px 6px 0 rgba(255, 255, 255, .3)',
          'text-align': 'center',
          'font-size': '16px',
          'color': '#fff',
        },
      });
      text.setMap(map);

      //添加高度面
      const vectorLayer = new AMap.VectorLayer();
      map.add(vectorLayer);
      vectorLayer.show();
      areas.forEach(area => {
        let polyphy = new AMap.Polygon({
          path: area.path,
          extrusionHeight: 100 * area.health / 100,
          // height: 2000,
          roofColor: [0, 136, 255, 0.5],
          wallColor: [0, 136, 255, 0.5],
          zIndex: 120,

          // fillColor: '0088ffcc',
          // strokeOpacity: 1,
          // strokeColor: '#2b8cbe',
          // strokeWeight: 1,

          extData: area,

        })
        polyphy.on('mouseover', (event) => {
          text.show();
          var extData = polyphy.getOptions().extData;
          // var health = pickItem.properties.health;
          // var v = pickItem.properties.health * 100;
          text.setText(extData.name + ` 健康度：${extData.health} %`);
          text.setPosition(event.lnglat);

          for (const curpoly of listpoly) {
            if (curpoly === polyphy) {
              polyphy.setOptions({
                roofColor: [164, 241, 199, 0.5],
                wallColor: [164, 241, 199, 0.5],
              })
            } else {
              curpoly.setOptions({
                roofColor: [0, 136, 255, 0.5],
                wallColor: [0, 136, 255, 0.5],
              })

            }
          }

        })
        // polyphy.on('mouseout', (event) => {
        //   console.log('mouseout', event);
        //   polyphy.setOptions({
        //     roofColor: [0, 136, 255, 0.5],
        //     wallColor: [0, 136, 255, 0.5],
        //   })
        // })
        // map.add(polyphy);
        vectorLayer.add(polyphy);
        listpoly.push(polyphy);
      })




      //添加描边
      // new AMap.Polyline({
      //   path: mask,
      //   strokeColor: '#99ffff',
      //   strokeWeight: 10,
      //   map: map
      // })



      // initGllayer();
      resolve(true);

    }).catch(e => {
      reject(e);
      console.log(e);
    })
  })
}

// 加载树模型
const initGllayer = () => {
  customCoords = map.customCoords;
  data = customCoords.lngLatsToCoords([
    [116.56, 39.79],
    [121.420826,31.773698],
    [116.56, 39.79],
  ]);
  console.log('========== data', data);
  // 创建 GL 图层
  const gllayer = new AMap.GLCustomLayer({
    // 图层的层级
    zIndex: 20,
    // 初始化的操作，创建图层过程中执行一次。
    init: (gl) => {
      // 这里我们的地图模式是 3D，所以创建一个透视相机，相机的参数初始化可以随意设置，因为在 render 函数中，每一帧都需要同步相机参数，因此这里变得不那么重要。
      // 如果你需要 2D 地图（viewMode: '2D'），那么你需要创建一个正交相机
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1 << 30);

      renderer = new THREE.WebGLRenderer({
        context: gl,  // 地图的 gl 上下文
        // alpha: true,
        // antialias: true,
        // canvas: gl.canvas,
      });

      // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
      renderer.autoClear = false;
      scene = new THREE.Scene();

      // 环境光照和平行光
      var aLight = new THREE.AmbientLight(0xffffff, 0.3);
      var dLight = new THREE.DirectionalLight(0xffffff, 1);
      dLight.position.set(1000, -100, 900);
      scene.add(dLight);
      scene.add(aLight);


      // 加载树模型
      const loader = new GLTFLoader();
      loader.load('/src/assets/2.gltf', (gltf: THREE.GLTf) => {

        gltf.scene.position.set(data[1][0], data[1][1]);
        gltf.scene.scale.set(2, 2, 2);
        gltf.scene.rotation.x = 0.5 * Math.PI;
        gltf.scene.position.z = 0.8;

        scene.add(gltf.scene)

        // gltf.scene.position.set(data[0[0], data[0][1]);
        // scene.add(gltf.scene)
        //
        // gltf.scene.position.set(data[2][0], data[2][1]);
        // scene.add(gltf.scene)
        // models.end = gltf.scene;
      });


      // 正方形
      // var texture = new THREE.TextureLoader().load('https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg');
      // texture.minFilter = THREE.LinearFilter;
      // //  这里可以使用 three 的各种材质
      // var mat = new THREE.MeshPhongMaterial({
      //   color: 0xfff0f0,
      //   depthTest: true,
      //   transparent: true,
      //   map: texture,
      // });
      // var geo = new THREE.BoxGeometry(1000, 1000, 1000);
      // for (let i = 0; i < data.length; i++) {
      //   const d = data[i];
      //   var mesh = new THREE.Mesh(geo, mat);
      //   mesh.position.set(d[0], d[1], 500);
      //   meshes.push({
      //     mesh,
      //     count: i,
      //   });
      //   scene.add(mesh);
      // }
    },
    render: () => {
      // 这里必须执行！！重新设置 three 的 gl 上下文状态。
      renderer.resetState();
      // 重新设置图层的渲染中心点，将模型等物体的渲染中心点重置
      // 否则和 LOCA 可视化等多个图层能力使用的时候会出现物体位置偏移的问题
      customCoords.setCenter([121.420826,31.773698]);
      var { near, far, fov, up, lookAt, position } = customCoords.getCameraParams();

      // 2D 地图下使用的正交相机
      // var { near, far, top, bottom, left, right, position, rotation } = customCoords.getCameraParams();

      // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
      camera.near = near;
      camera.far = far;
      camera.fov = fov;
      camera.position.set(...position);
      camera.up.set(...up);
      camera.lookAt(...lookAt);
      camera.updateProjectionMatrix();

      // 2D 地图使用的正交相机参数赋值
      // camera.top = top;
      // camera.bottom = bottom;
      // camera.left = left;
      // camera.right = right;
      // camera.position.set(...position);
      // camera.updateProjectionMatrix();

      renderer.render(scene, camera);

      // 这里必须执行！！重新设置 three 的 gl 上下文状态。
      renderer.resetState();
    },
  });
  map.add(gllayer);
}

const showLayer = () => {
  tileLayer.show();
}
const hideLayer = () => {
  tileLayer.hide();
}

const opts = {
  subdistrict: 0,
  extensions: 'all',
  level: 'district'
};


onMounted(() => {
  initMap()
})
</script>


<style scoped>
  #home-map-container{
    padding:0px;
    margin: 0px;
    width: 100%;
    height: 800px;
  }
</style>