import React, { Component } from 'react';
// 在地图上antv支持高德地图和Mapbox两种，这里我们使用高德
import { LineLayer } from '@antv/l7';

import { Marker, AMapScene } from '@antv/l7-react';

import '../mark.css';
import {TRACK_DATA} from '../../public/data.js';
const MarkerPinImg = {
  green:
    'https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*JhBbT4LvHpQAAAAAAAAAAAAAARQnAQ',
  blue:
    'https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*n6cXTb8R7iUAAAAAAAAAAAAAARQnAQ',
};


class MarkPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
 
  componentDidMount(){
    const layer = new LineLayer()
    .source(data)
    .size(1.5)
    .shape('line')
    .color('#25d8b7')
    .animate({
      interval: 1, // 间隔
      duration: 1, // 持续时间，延时
      trailLength: 2 // 流线长度
    });
  scene.addLayer(layer);
  }
 render(){
  //  let {data} = this.state;
   return(
    <AMapScene
      className="mark-body"
      // scene option 配置项
      option={{
        logoVisible:false,
      }}
      // map option 配置项
      map={{
        style:"light",
        center: [113.2644, 23.1291],
      // 另有token:00955e409626a15a9f182f3f1f2334ce
        // token: '09a2cea8e5a78784db06031a2da00ec4',
        // 地图缩限范围，数值越大越微观
        zoom:15,
        // 地图倾斜角度
        pitch: 40,
        // 地图风格
      }}>
    <Marker lnglat={[113.2544, 23.1291]} />
    <Marker lnglat={[113.25, 23.1391]} />
    <Marker lnglat={[113.26, 23.1491]} />
    <div id="map"></div>
</AMapScene>
   )
 }
}

export default MarkPage;
