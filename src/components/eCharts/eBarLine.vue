<template>
  <div class="eBarLine" :id="id"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "eBarLine",
  props: ["id", 'time', "bLData"],//, "BarlineData"
  data() {
    return {
      
    }
  },
  watch: {
    id: function() {
      this.barLineChart()
    },
    bLData: function() {
      this.barLineChart()
    }
  },
  mounted: function() {
    // console.log('0123')
    let vm = this
    setTimeout(function() {
      vm.barLineChart()
    },500)
  },
  methods: {
    barLineChart() {
      // console.log('0123')
      let vm = this
      let myChart = this.$eCharts.init(document.getElementById(vm.id))
      myChart.setOption({
        title: {
            // text: 'Confidence Band',
            subtext: `截止：${vm.time}`,
            top: '-5',
            left: '10%'
        },
        color: vm.bLData.color || [],
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
          data: vm.bLData.length,
          bottom: 'bottom',
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
              data: vm.bLData.x
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
               name: '同比',
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
              name: vm.bLData.length[0] || '',
              type:'bar',
              // itemStyle: {
              //   normal: {
              //     barBorderRadius: [50, 50, 0, 0],
              //     color: new vm.$eCharts.graphic.LinearGradient(
              //       0, 0, 0, 1, [
              //         {offset: 0,color: '#6BE0EF'},
              //         {offset: 1,color: '#C986FD'}
              //       ])
              //   }
              // },
              data: vm.bLData.last
            },
            {
              name: vm.bLData.length[1] || '',
              type:'bar',
              // itemStyle: {
              //   normal: {
              //     barBorderRadius: [50, 50, 0, 0],
              //     color: new vm.$eCharts.graphic.LinearGradient(
              //       0, 0, 0, 1, [
              //         {offset: 0,color: '#FF7E99'},
              //         {offset: 1,color: '#FEA866'}
              //       ])
              //   }
              // },
              data: vm.bLData.this
            },
            {
              name: vm.bLData.length[2] || '',
              type: 'line',
              yAxisIndex: 1,
              data: vm.bLData.yOy
            }
        ] 
      })
      myChart.on('click', function(params) {
        // console.log('rightTop')
        vm.$emit('barClick', 'rightTop')
      })
      
    }
  }
}
</script>

<style scoped>
.eBarLine{
  width: 100%;
  height: 90%;
}
</style>
