<template>
  <div class="eLines" :id="id"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "eLines",
  props: ["id", "time", "lData"],//, "BarlineData"
  data() {
    return {
      //date: new Date(),
      
    }
  },
  computed: {
    // thisYear: function() {
    //   return this.date.getFullYear() + '年' + (this.date.getMonth() + 1) + '月'
    // },
    // lastYear: function() {
    //   return this.date.getFullYear() - 1 + '年' + (this.date.getMonth() + 1) + '月'
    // }
  },
  watch: {
    id: function() {
      this.lineChart()
    },
    lData: function() {
      this.lineChart()
    }
  },
  mounted: function() {
    //this.barLineChart()
    let vm = this
    setTimeout(function() {
      vm.lineChart()
    },500)
  },
  methods: {
    lineChart() {
      let vm = this
      let myChart = this.$eCharts.init(document.getElementById(vm.id))
      myChart.setOption({
        title: {
          // text: 'Confidence Band',
          subtext: `截止：${vm.time}`,
          top: '-5',
          left: '10%'
        },
        color: vm.lData.color || '',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          data: vm.lData.length,
          bottom: '2%',
          left: 'center'
        },
        grid: {
          left:'15%',
          right: '15%'
        },
        // dataZoom: [
        //   {
        //     type: 'inside' 
        //   }
        // ],
        xAxis: [
            {
              type: 'category',
              axisPointer: {
                type: 'shadow'
              },
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#979797'
                }
              },
              axisLabel: {
                color: '#979797'
              },
              axisPointer: {
                type: 'shadow'
              },
              data: vm.lData.x
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: '#979797'
                  }
                },
                axisLabel: {
                  color: '#979797'
                },
                name: '销量（箱）',
                axisLabel: {
                  formatter: '{value}'
                }
            },
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#979797'
                }
              },
              axisLabel: {
                color: '#979797'
              },
              name: '同比/销量占比',
              splitLine: {
                show: false
              },
              axisLabel: {
                formatter: '{value} %'
              }
            }
        ],
        series: [
            {
              name: vm.lData.length[0],
              type:'bar',
              data: vm.lData.last
            },
            {
              name: vm.lData.length[1],
              type:'bar',
              data: vm.lData.this
            },
            {
              name: vm.lData.length[2],
              type: 'line',
              yAxisIndex: 1,
              data:  vm.lData.yOy
            },
            {
              name: vm.lData.length[3],
              type: 'line',
              yAxisIndex: 1,
              data:  vm.lData.yOys
            }
        ] 
      })
      myChart.on('click', function(params) {
        // console.log('leftBottom')
        vm.$emit('barClick', 'leftBottom')
      })
    }
  }
}
</script>

<style scoped>
.eLines{
  width: 100%;
  height: 90%;
}
</style>
