import {shallowRef} from "@vue/reactivity";
import AMapLoader from "@amap/amap-jsapi-loader";
import polygonItem from "@/views/PolygonItem";
import {nanoid} from "nanoid";

type PolygonMapParam = {
  container: string, // 设置地图容器id
  key: string, // 申请好的Web端开发者Key，首次调用 load 时必填
  version: string, // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: Array<string>, // 需要使用的的插件列表，如比例尺'AMap.Scale'等
}

class PolygonMap {
  map: any
  AMap: any
  polyEditor: any
  editTarget: any
  polygonList: any // 记录所有多边形
  private paramData: PolygonMapParam
  constructor(param: PolygonMapParam) {
    this.map = shallowRef(null);
    this.paramData = param
    this.initMap()
    this.polygonList = []
  }

  getApolygonList () {
    return this.polygonList
  }

  initMap() {
    AMapLoader.load({
      key: "6b12d6c98e3b1d5a5e1f6d961951cc69",             // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.PolygonEditor', 'AMap.PolygonEditor', 'AMap.MouseTool'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
      this.AMap = AMap
      this.map = new AMap.Map("container", {  //设置地图容器id
        viewMode: "2D",    //是否为3D地图模式
        zoom: 14.5,           //初始化地图级别
        center: [121.359573, 31.257302], //初始化地图中心点位置
        // center: [116.471354, 39.994257],
      });
      // let path1 = [[116.475334, 39.997534], [116.476627, 39.998315], [116.478603, 39.99879], [116.478529, 40.000296], [116.475082, 40.000151], [116.473421, 39.998717]]
      // let path2 = [[116.474595, 40.001321], [116.473526, 39.999865], [116.476284, 40.000917]]
      // let polygon1 = new AMap.Polygon({
      //   path: path1
      // })
      // let polygon2 = new AMap.Polygon({
      //   path: path2
      // })
      // this.map.add([polygon1, polygon2]);
      // this.map.remove([polygon1]);
      // this.etFitView();

      this.polyEditor = new AMap.PolygonEditor(this.map);
      this.polyEditor.on('add', (data: any) => {
        this.onPolygonAdd(data);
      })
      this.polyEditor.on('end', (data: any) => {
        this.onPolygonEnd(data);
      })

    }).catch(e => {
      console.log(e);
    })
  }

  /**
   * 新增多边形事件
   * @param data polygon对象
   */
  onPolygonAdd (data: any) {
    console.log(data);
    let polygon = new polygonItem({
      id: nanoid(),
      polygon: data.target,
      contextMenu: new this.AMap.ContextMenu()
    });
    this.polygonList.push(polygon)

    // const polygon = data.target;
    this.polyEditor.addAdsorbPolygons(polygon.polygon);

    //删除多边形
    polygon.contextMenu.addItem("删除", (d: any) => {
      this.polyEditor.close();
      this.map.remove([polygon.polygon]);
    }, 0);
    polygon.contextMenu.addItem("修改", (d: any) => {
      this.polyEditor.setTarget(polygon.polygon);
      this.polyEditor.open();
    }, 0);
    polygon.polygon.on('rightclick', (e: any) => {
      polygon.contextMenu.open(this.map, e.lnglat);
    });
  }

  /**
   * 结束编辑多边形事件
   * @param data polygon对象
   */
  onPolygonEnd (data: any) {
    console.log('end ===== ', data);
    let lnglat: any[] = [];
    if (this.editTarget === null) {
      console.log('editTarget 为 null');
    } else {
      console.log('有 editTarget');
    }
    data.target.getPath().forEach((d: any) => {
      lnglat.push({
        lng: d.lng,
        lat: d.lat
      })
    });
    console.log('end ===== ', lnglat);
  }

}

export default PolygonMap;