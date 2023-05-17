import AMapLoader from '@amap/amap-jsapi-loader';

type PolygonItemParam = {
  id: string,
  polygon: any, // AMap.Polygon 对象
  contextMenu: any
}

type PathItem = {lng: string, lat: string}
type PathArray = Array<PathItem>

class PolygonItem {
  id: string
  polygon: any
  contextMenu: any

  constructor(params: PolygonItemParam) {
    this.id = params.id;
    this.polygon = params.polygon;
    //创建右键菜单
    this.contextMenu = params.contextMenu;
  }

  getPointsCenter () {
    let paths: PathArray = [];
    this.polygon.getPath().forEach((d: any) => {
      paths.push({
        lng: d.lng,
        lat: d.lat
      })
    });
    this.callPointsCenter(paths)
  }
  /**
   * 参数数组points的每一项为每一个点的：经度lng,纬度lat
   * 如 points = [{"lng":121.365706,"lat":31.269208},{"lng":121.356845,"lat":31.25655},...];
   * 返回中心点的数组[纬度,精度]
   *
   * */
  private callPointsCenter (points: PathArray) {
    let point_num = points.length; //坐标点个数
    let X = 0, Y = 0, Z = 0;
    for (let i = 0; i < points.length; i++) {
      if (!points[i]) {
        continue;
      }
      let point = points[i]
      var lat, lng, x, y, z;
      lat = parseFloat(point.lat) * Math.PI / 180;
      lng = parseFloat(point.lng) * Math.PI / 180;
      x = Math.cos(lat) * Math.cos(lng);
      y = Math.cos(lat) * Math.sin(lng);
      z = Math.sin(lat);
      X += x;
      Y += y;
      Z += z;
    }
    X = X / point_num;
    Y = Y / point_num;
    Z = Z / point_num;

    var tmp_lng = Math.atan2(Y, X);
    var tmp_lat = Math.atan2(Z, Math.sqrt(X * X + Y * Y));

    return [tmp_lat * 180 / Math.PI, tmp_lng * 180 / Math.PI];
  }

}

export default PolygonItem;