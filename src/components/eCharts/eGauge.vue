<template>
  <div class="eGauge" :id="id"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "eGauge",
  props: ["id", 'time', "dataGauge"],//, "BarlineData"
  data() {
    return {
      date: new Date(),
      
    }
  },
  computed: {
    thisYear: function() {
      return this.date.getFullYear() + '年' + (this.date.getMonth() + 1) + '月'
    },
    lastYear: function() {
      return this.date.getFullYear() - 1 + '年' + (this.date.getMonth() + 1) + '月'
    }
  },
  watch: {
    id: function() {
      this.barLineChart()
    },
    dataGauge: function() {
      this.barLineChart()
    }
  },
  mounted: function() {
    //this.barLineChart()
    let vm = this
    setTimeout(function() {
      vm.barLineChart()
    },500)
  },
  methods: {
    barLineChart() {
      let vm = this
      let myChart = this.$eCharts.init(document.getElementById(vm.id))
      myChart.setOption({
        title: {
            // text: 'Confidence Band',
            subtext: `截止：${vm.time}`,
            top: '-5',
            left: '10%'
        },
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            center: ['50%', '55%'],
            radius: '80%',
            // axisLabel: {
            //     show: true,
            //     color: [
            //       [ 1, new vm.$eCharts.graphic.LinearGradient( 0, 0, 1, 0,
            //         [
            //           { offset: 0, color: '#C687FD' },
            //           { offset: 0.5, color: '#69E1EF' },
            //           { offset: 1, color: '#C687FD' }
            //         ])
            //       ]
            //     ]
            // },
            axisLine: {
                show: true,
                lineStyle: {
                  width: 10,
                  shadowBlur: 0,
                  color: [
                      [0.3, '#F2182B'],
                      [0.7, '#629EF6'],
                      [1, '#F2182B']
                  ]
                }
                // lineStyle: {
                //     width: 20,
                //     color: [
                //         [ 1, new vm.$eCharts.graphic.LinearGradient( 0, 0, 1, 0,
                //             [
                //               { offset: 0, color: '#C687FD' },
                //               { offset: 0.5, color: '#69E1EF' },
                //               { offset: 1, color: '#C687FD' }
                //             ])
                //         ]
                //     ]
                // }
            },
            splitLine: { //分割线样式 
              length: 15,
              lineStyle: {
                color: 'auto'
              },
            },
            itemStyle: {
              normal: {
                color: '#F1192A',
              }
            },
            pointer: {
              show: true,
              length: '60%',
              width: 5,
            },
            detail: {
              formatter:'{value}%',
              offsetCenter:  [0, '65%'],
              textStyle: {
                fontWeight: 600,
                color: '#4B8BF4',
                fontSize: 20
              }
            },
            title: {    //标题
              show: true,
              fontSize: 13,
              offsetCenter: [0, '25%']
            },
            data: [{value: vm.dataGauge, name: '完成率'}]
          }
        ]
    })
    }
  }
}
</script>

<style scoped>
.eGauge{
  width: 100%;
  height: 90%;
}
</style>
