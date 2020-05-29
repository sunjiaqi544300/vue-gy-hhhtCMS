export function TMap(key) {
  return new Promise((resolve, reject) => {
    window.init = () => {
      resolve(qq) // 注意这里
    }
    let array = document.head.children
    // console.log(array)
    let TMap = false
    for (let index = 0; index < array.length; index++) {
      if (array[index].getAttribute("id") == "TMap") {
        // document.head.removeChild(document.getElementById("TMap"))
        document.getElementsByTagName('head')[0].removeChild(document.getElementById("TMap"))
      }
    }
    // if (TMap == true) {
    var script = document.createElement('script')
    script.setAttribute('id', "TMap")
    script.type = 'text/javascript'
    script.src = 'https://map.qq.com/api/js?v=2.exp&callback=init&key=' + key
    script.onerror = reject
    document.head.appendChild(script)
    // }
  })

}

/*百度转腾讯*/
export function coordinateFn(lng, lat) {
  //方法1
  let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  // let x = lng - 0.0065; 
  let x = lng - 0.003;
  // let y = lat - 0.006;  
  let y = lat - (-0.0007);
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  let new_lng = z * Math.cos(theta);
  let new_lat = z * Math.sin(theta);
  return [new_lng, new_lat]
}

/*腾讯转百度 */
export function fancoordinateFn(lng, lat) {
 
//   var lng = lng - 0.003;
//   var lat = lat - (-0.0007);
//   let my_pi = Math.PI * 3000 / 180;
//   let z = Math.sqrt(lng ** 2 + lat ** 2) + 0.00002 * Math.sin(lat * my_pi);
//   let theta = Math.atan2(lng, +lat) + 0.00003 * Math.cos(lng * my_pi);
  // let new_lng = z * Math.cos(theta) + 0.0065;
  // let new_lat = z * Math.sin(theta) + 0.006;
  var lng = lng -0;
  var lat = lat - 0;
  let new_lng = lng
  let new_lat = lat
  return [new_lng, new_lat]
}
