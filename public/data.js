export const TRACK_DATA = {
    type: "FeatureCollection",
    features: [
        { type: "Feature", properties: {
            name: "tom"
         }, 
            geometry: { 
            type: "MultiLineString",
            coordinates: [ [ [ 113.2544, 23.1291 ], 
                                [ 113.25, 23.1391 ], 
                                [ 113.26, 23.1491 ] 
                            ] ] } 
        },
        ]
    }


export const Mobile_Track = [
    {id:"1",location:"第一人民医院",timestamp:"2021-07-21 08:00",duration:"2小时10分钟",coordinates:[113.2544, 23.1291],touch:200,color:"#ff6700"},
    {id:"2",location:"湛江大厦",timestamp:"2021-07-21 10:10",duration:"1小时5分钟",coordinates:[113.25, 23.1391],touch:70,color:"#873bf4"},
    {id:"3",location:"广州火车站",timestamp:"2021-07-21 11:15",duration:"5小时17分钟",coordinates:[113.26, 23.1491 ],touch:700,color:"#0170fe"}
]