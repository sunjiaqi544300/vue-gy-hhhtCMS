<template>
  <div class="eLine" :id="id"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "饼状图",
  props: ["id", "time", "lData"], //, "BarlineData"
  data() {
    return {
        
    };
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
    vm.lineChart();
  },
  methods: {
    lineChart() {
      let vm = this;
      let myChart = this.$eCharts.init(document.getElementById(vm.id));

      let array =  vm.lData
      let newdata = []
      for (let index = 0; index < array.length; index++) {
           newdata.push(
                Object.assign({},array[index],{
                        itemStyle: {
                            normal: {//颜色渐变
                                color: new this.$eCharts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color:array[index].startcolor},
                                        {offset: 1, color:array[index].endcolor}
                                    ]
                                )
                            }
                        }
                })
            )
      }
      myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: "{b}:({d}%)"
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "80%"],
            center : ['50%', '47%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: newdata
          }
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
#rightBottomBig div {
  width: 100% !important;
}
.eLine {
  width: 260px;
  height: 160px;
  padding-top: 10px;
}
</style>
