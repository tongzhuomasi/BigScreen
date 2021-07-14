import React, { Component } from 'react';
import { Scene, PointLayer,Popup} from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import '../track.css';
import {TRACK_DATA,Mobile_Track} from '../../public/data.js';

class Hotpoints extends Component{
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
      center: [ 140.067171, 36.26186 ],
      zoom: 5,
      pitch: 30,
      mapStyle: 'amap://styles/c882f12907666fa9cef70720346ff585', 
      token: '00955e409626a15a9f182f3f1f2334ce',
    })
  });
  // 监听到地图加载完毕
  scene.on('loaded', () => {
    fetch(
      'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
    )
      .then(res => res.json())
      .then(data => {
        const pointLayer = new PointLayer({})
          .source(data)
          .shape('circle')
          .size('mag', [ 1, 25 ])
          .color('mag', mag => {
            return mag > 4.5 ? '#5B8FF9' : '#5CCEA1';
          })
          .active(true)
          .style({
            opacity: 0.3,
            strokeWidth: 1
          });
          let html = `<div>
          <div class="timebox">日本东京万达广场</div>
             <div class="locationbox">157万|25km</div>
         </div>`;

         let popup = new Popup({
          offsets: [0,40]
        }).setText('hello world');
          popup.setHTML(html);
          pointLayer.on("click",(e)=>{
          })
        scene.addLayer(pointLayer);
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
      <div id="details"> 
          <div className="context">
            <h4>区块链服务列表</h4>
            <p>区块链出块： 8392712</p>
            <p>数据加密方法： SHA-256混合加密</p>
            <p>历史调用总数： 42124141</p>
            <p>实时查询人数： {data.touch}人</p>
          </div>
          <img src="/business_box.png" alt="商务中心"/>
        </div>
      </div>
      <div className="right">
        <div id="details"> 
          <div className="context">
            <h4>区域人口查询详情</h4>
            <p>查询时间： {data.timestamp}</p>
            <p>地理位置： {`${data.coordinates[0]}N${data.coordinates[1]}E`}</p>
            <p>区域ID： 42124</p>
            <p>实时查询人数： {data.touch}人</p>
          </div>
          <img src="/business_box.png" alt="商务中心"/>
        </div>
      </div>
      <div id="textureMap" className="track-body"></div>
    </div>
   )
 }
}

export default Hotpoints;
