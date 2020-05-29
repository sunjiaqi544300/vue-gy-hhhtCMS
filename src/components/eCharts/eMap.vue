<template>
  <div class="eMap" :id="id">

  </div>
</template>

<script type="text/ecmascript-6">
import 'echarts/map/js/province/beijing.js'
export default {
  name: "eMap",
  props: ['id', 'title', 'mapData'],
  data() {
    return {

    }
  },
  watch: {
    id: function() {
      this.mapChart()
    },
    mapData: function() {
      this.mapChart()
    }

  },
  mounted: function() {
    //this.barLineChart()
    let vm = this
    setTimeout(function() {
      vm.mapChart()
    },500)
  },
  methods: {
    mapChart() {
      let vm = this
      let myChart = this.$eCharts.init(document.getElementById(vm.id))
      myChart.setOption({
        title: {
          text: '云南中烟' + vm.title + '进度分析',
          left: '5%',
          top: '3%'
        },
        tooltip : {
          show: false,
        },
        series : [
          {
            type: 'map',
            mapType: '北京',
            roam: true,
            itemStyle: {
              // normal: {
              //   areaColor: "#629EF6",
              //   borderColor: '#000'
              // },
              emphasis: {
                areaColor: "#629EF6",
                borderColor: '#000'
              }
            },
            emphasis: {
              label: {
                show: true
                // show: (function() {
                //   if(vm.mapData.length > 1) {
                //     return false
                //   }else {
                //     return true
                //   }
                // })()
              }
            },
            data: vm.mapData   
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.eMap{
  width: 100%;
  height: 100%;
}
</style>
