import React, { Component } from 'react';
import { Scene, LineLayer,Marker,MarkerLayer,Popup,Zoom,Scale} from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import '../track.css';
import {TRACK_DATA,Mobile_Track} from '../../public/data.js';

class Texture extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data: Mobile_Track[0]
    };
  }
 componentDidMount(){
  const scene = new Scene({
    id: 'textureMap',
    logoVisible:false,
    map: new GaodeMap({
      center: [113.25, 23.1391],
      zoom: 15,
      pitch: 30,
      // 导入高度地图样式
      mapStyle: 'amap://styles/c882f12907666fa9cef70720346ff585', // 样式URL
      token: '00955e409626a15a9f182f3f1f2334ce',
      
      // 可选参数为dark，light，默认值为light,style选填其他值会呈现3D地图
      // style: "dark",
    })
  });
  // 监听到地图加载完毕
  scene.on('loaded', () => {
    // 贴上静态SVG标示图
    // scene.addImage(
    //   '02',
    //   'https://gw.alipayobjects.com/zos/bmw-prod/ce83fc30-701f-415b-9750-4b146f4b3dd6.svg'
    // );
    fetch(
      'https://gw.alipayobjects.com/os/basement_prod/40ef2173-df66-4154-a8c0-785e93a5f18e.json'
    )
      .then(res => res.json())
      .then(data => {
        const LineDraw = new LineLayer()
          .source(TRACK_DATA)
          .size(4)
          .shape('line')
          .texture('02')
          .color('#25d8b7')
          .animate({
            interval: 1, // 间隔
            duration: 1, // 持续时间，延时
            trailLength: 2 // 流线长度
          })
          .style({
            lineTexture: true, // 开启线的贴图功能
            iconStep: 100 // 设置贴图纹理的间距
          });

        const markerLayer = new MarkerLayer();
        Mobile_Track.forEach(item=>{    
            let html = `<div>
               <div class="timebox" style="background-color:${item.color}">${item.timestamp}</div>
                  <div class="locationbox">${item.location}</div>
              </div>`;

            let popup = new Popup({
                offsets: [0,40]
              }).setText('hello world');
            popup.setHTML(html);
            const marker = new Marker().setLnglat(item.coordinates)
            marker.setPopup(popup);
            marker.on("click",(e)=>{
              this.setState({
                data:item
              })
            })
            markerLayer.addMarker(marker);
          
        })
        scene.addLayer(LineDraw);
        scene.addMarkerLayer(markerLayer);

        const zoomControl = new Zoom({
          position: 'bottomright',
        });
        const scaleControl = new Scale({
          position: 'bottomleft',
        });
        
        scene.addControl(scaleControl);
        scene.addControl(zoomControl);
      });
  });
 };

 render(){
   let {data} = this.state;
   return(
    <div>
      <div className="header">
        <img src="/header.png" alt="广东移动流动性"/>
      </div>
      <div className="left">
        <img src="/query_secret.png" alt="被查询号码密文"/>
        <img src="/confirmed.png" alt="已确认计算轨迹"/>
        <img src="/computing.png" alt="数据隐私计算中"/>
        <img src="/waiting.png" alt="等待服务方响应"/>
      </div>
      <div className="right">
        <div id="details"> 
          <div className="context">
            <h4>{data.location}</h4>
            <p>地点： {data.location}</p>
            <p>坐标： {`${data.coordinates[0]}N${data.coordinates[1]}E`}</p>
            <p>起始时间： {data.timestamp}</p>
            <p>停留时间： {data.duration}</p>
            <p>密切接触人数： {data.touch}人</p>
          </div>
          <img src="/business_box.png" alt="商务中心"/>
        </div>
        <img src="/database.png" alt="数据库"/>
        <img src="/population.png" alt="人口总数"/>
      </div>
      <div id="textureMap" className="track-body"></div>
    </div>
   )
 }
}

export default Texture;
