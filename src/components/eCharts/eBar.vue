<template>
  <div class="eBar" :id="id"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "eBar",
  props: ["id", "time", "barData"],
  data() {
    return {

    }
  },
  watch: {
    barData: function(us) {
      // console.log(us)
      if(us.xData !== []) {
        this.barChart()
      }
    }
  },
  mounted: function() {
    let vm = this
    setTimeout(function() {
      vm.barChart()
    },500)
  },
  methods: {
    barChart() {
      let vm = this
      // console.log(vm.barData)
      let myChart = this.$eCharts.init(document.getElementById(vm.id))
      myChart.setOption({
        title: {
            // text: 'Confidence Band',
            subtext: `截止：${vm.time}`,
            top: '-10',
            left: '10%'
        },
        color: ['#629EF6'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '0%',
            top: '25%',
            containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : vm.barData.xData || [],
            axisTick: {
                alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            name: '条'
          }
        ],
        series : [
          {
            name: '进货量',
            type: 'bar',
            data: vm.barData.yData || []
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.eBar{
  width: 100%;
  height: 100%;
}
</style>
