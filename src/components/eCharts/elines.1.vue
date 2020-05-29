<template>
  <div class="eLine" :id="id"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "eLine",
  props: ["id", "lData"],//, "BarlineData"
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
      // 改变eCharts的缩放，根据屏幕的宽高进行调整
             window.addEventListener("resize", myChart.resize);
      myChart.setOption({
        title: {
            // text: 'Confidence Band',
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
                  color: '#272727'
                }
              },
              axisLabel: {
                color: '#272727'
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
                    color: '#272727'
                  }
                },
                axisLabel: {
                  color: '#272727'
                },
                name: '策略(条)',
                axisLabel: {
                  formatter: '{value}'
                }
            },
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#272727'
                }
              },
              axisLabel: {
                color: '#272727'
              },
              name: '订足率(%)',
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
              data: vm.lData.this
            },
            {
              name: vm.lData.length[1],
              type:'bar',
              data: vm.lData.last
            },
            {
              name: vm.lData.length[2],
              type: 'line',
              yAxisIndex: 1,
              data:  vm.lData.yOy
            }
        ] 
      })
      myChart.on('click', function(params) {
        // console.log('rightBottom')
        vm.$emit('barClick', 'rightBottom')
      })
    }
  }
}
</script>

<style scoped>
.eLine{
  width: 47%;
  height: 100%;
  /* display: inline-block; */
}
</style>
