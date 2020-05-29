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
          left: "center",
          itemHeight: 6,
        },
        grid: {
          left: "15%",
          right: "15%",
          bottom:"28%",
          top: 45,
          x: 50,
          // containLabel: true
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
          //  nameGap:10,
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
            axisTick:{
              inside:true
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
              axisTick:{
              inside:true,
              // show:false
              },
            axisLabel: {
              color: "#979797",
              formatter: "{value}",

            },
            name: "销量(条)",
            splitNumber:3,
             splitLine: {
              show: false
            },
          },
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            axisLabel: {
              color: "#979797",
              formatter: "{value} "
            },
             axisTick:{
              inside:true,
              // show:false
              },
            name: "进货频次",
            splitLine: {
              show: false
            },
          }
        ],
        series: [
          {
              name: "销量(条)",
              type:'bar',
              data: vm.lData.yOy,
              barWidth: 8.5,
              itemStyle: {
                  normal: {
                      color: new this.$eCharts.graphic.LinearGradient(
                          0, 0, 0.2, 1,
                          [
                              {offset: 1, color: '#72f8fa'},
                              {offset: 0, color: '#4498fd'}
                          ]
                      ),
                      barBorderRadius:[10, 10, 10, 10]
                  },
                   emphasis: {
                            barBorderRadius:[50, 10, 50, 10],
                        },
                           
              },
                // normal: {
                //             //柱形图圆角，初始化效果
                //             barBorderRadius:[50, 10, 50, 10],
                // }
            },
            {
              name: "进货频次",
              type: 'line',
              yAxisIndex: 1,
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
              data:  vm.lData.this
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
  width: 260px;
  height: 170px;
}
</style>
