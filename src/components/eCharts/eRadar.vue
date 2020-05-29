<template>
  <div class="eRadar" :id="id"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "eRadar",
  props: ["id", "radarData"],
  data() {
    return {

    }
  },
  watch: {
    radarData: function() {
      this.radarChart()
    }
  },
  mounted: function() {
    let vm = this
    setTimeout(function() {
      vm.radarChart()
    },500)
  },
  methods: {
    radarChart() {
      let vm = this
      let myChart = this.$eCharts.init(document.getElementById(vm.id))
      myChart.setOption({
        color: ['#FC9B32'],
        tooltip: {
          confine: true
        },
        legend: {
          show:false,
          data: ['实际值']
        },
        radar: {
          name: {
            textStyle: {
              color: '#000',
              padding: [0, -5, 0, 0]
            }
          },
          indicator: [
            { name: '属性', max: 100},
            { name: '11', max: 100},
            { name: '环境', max: 100},
            { name: '环境', max: 100},
            { name: '成长', max: 100},
            { name: '人员', max: 100}
          ]
        },
        series: [{
          name: '实际值',
          type: 'radar',
          data : [
            {
              value : vm.radarData,
              name : '实际值'
            }
          ]
        }]
      })
    }
  }
}
</script>

<style scoped>
.eRadar{
  width: 100%;
  height: 100%;
}
</style>
