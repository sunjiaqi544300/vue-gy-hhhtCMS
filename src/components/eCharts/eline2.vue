<template>
  <div class="eLine" :id="id"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "eLine",
  props: ["id", "time", "lData"], //, "BarlineData"
  data() {
    return {
      //date: new Date(),
    };
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
      this.lineChart();
    },
    lData: function() {
      this.lineChart();
    }
  },
  mounted: function() {
    //this.barLineChart()
    let vm = this;
    setTimeout(function() {}, 500);
    vm.lineChart();
  },
  methods: {
    lineChart() {
      let vm = this;
      let myChart = this.$eCharts.init(document.getElementById(vm.id));
      myChart.setOption({
        title: {
          // text: 'Confidence Band',
          // subtext: `截止：${vm.time}`,
          top: "-5",
          left: "0%"
        },
        color: vm.lData.color || "",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: vm.lData.length,
          bottom: "bottom",
          left: "center"
        },
        grid: {
          left: "15%",
          right: "15%",
          top: 45,
          x: 50,
        },
        // dataZoom: [
        //   {
        //     type: 'inside'
        //   }
        // ],
        xAxis: [
          {
            type: "category",
            axisPointer: {
              type: "shadow"
            },
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#979797"
              }
            },
            axisLabel: {
              color: "#979797"
            },
            axisPointer: {
              type: "shadow"
            },
            data: vm.lData.x
          }
        ],
        yAxis: [
            {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#979797"
              }
            },
            axisLabel: {
              color: "#979797"
            },
            name: "市场份额%",
            splitLine: {
              show: false
            },
              axisTick:{
              inside:true
              },
            axisLabel: {
              formatter: "{value} "
            }
          },
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#979797"
              }
            },
            axisLabel: {
              color: "#979797"
            },
            name: "",
            axisLabel: {
              formatter: "{value}"
            }
          },
         
        ],
        series: [
          
          {
            name: "市场份额%",
            type: "line",
            yAxisIndex: 0,
              smooth: true,
               itemStyle: {
                  normal: {
                      color: new this.$eCharts.graphic.LinearGradient(
                          0, 0, 0.2, 1,
                          [
                              {offset: 1, color: '#feb97f'},
                              {offset: 0, color: '#fd4e78'}
                          ]
                      ),
                      shadowColor: 'rgba(0, 0, 0, 0.4)',
                  },

              },
            data: vm.lData.yOy
          },
          {
            name: "",
            type: "bar",
            data: vm.lData.last
          },

        ]
      });
      //  var fhchart = echarts.getInstanceById($("vm.id").attr("_echarts_instance_"));//获取echarts对象
      //   if (fhchart) {
      //       setTimeout("echarts.getInstanceById($('vm.id').attr('_echarts_instance_')).resize()", 100);//如果存在则设置自适应，更新时间为100ms.
      //   }
      myChart.on("click", function(params) {
        // console.log('rightBottom')
        vm.$emit("barClick", "rightBottom");
      });
    }
  }
};
</script>

<style scoped>
#rightBottomBig div{
  width: 100%!important;
}
.eLine {
  /* margin-left: 10px; */
  /* padding-left: 20px; */
  width: 260px;
  height: 180px;
}
</style>
