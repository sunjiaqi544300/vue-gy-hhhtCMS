<template>
  <div class="eLine" :id="id"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "雷达图",
  props: ["id", "time", "lData"], //, "BarlineData"
  data() {
    return {};
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
      console.log(vm.lData)
      // console.log(array)
      myChart.setOption({
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#000",
              // backgroundColor: "#999",
              borderRadius: 3
            }
          },
          radius: 50,
          center: ['50%','52%'],
          indicator: [
            { name: "属性", max: 100 },
            { name: "能力", max: 100 },
            { name: "品牌", max: 100 },
            { name: "环境", max: 100 },
            { name: "成长", max: 100 },
            { name: "人员", max: 100 }
          ]
        },
        series: [
          {
            name: "客户价值",
            type: "radar",
            // itemStyle: {
            //   normal: {
            //     lineStyle: {
            //       color: "rgba(255,255,255,0.5)" // 图表中各个图区域的边框线颜色
            //     },
            //     areaStyle: {
            //       type: "default"
            //     }
            //   }
            // },
            data: [
              {
               value:vm.lData
              }
            ]
          }
        ]
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
