<template>
  <div class="page">
    <div id="main" style="width: 650px;height:320px;"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ["radarData"],
    data() {
      return {

      }
    },
    components: {

    },
    watch: {
      radarData: function () {
        this.radarChart()
      }
    },
    //   mounted() {
    //       this.radarChart()
    //   },
    methods: {
      radarChart() {
        let vm = this
        var myChart = this.$eCharts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
          xAxis: {},
          yAxis: {},
          series: [{
            symbolSize: 5,
            data: vm.radarData,
            // data: [
            //     [10.0, 8.04],
            //     [8.0, 6.95],
            //     [13.0, 7.58],
            //     [9.0, 8.81],
            //     [11.0, 8.33],
            //     [14.0, 9.96],
            //     [6.0, 7.24],
            //     [4.0, 4.26],
            //     [12.0, 10.84],
            //     [7.0, 4.82],
            //     [5.0, 5.68]
            // ],
            type: 'scatter'
          }],
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {
                show: true,
                title: '导出', //鼠标移动上去显示的文字
                //    icon: 'image:../../../../assets/logo.png',
                excludeComponents: ['toolbox'],
                pixelRatio: 2
              }
            }
          }
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  }

</script>

<style scoped>
</style>
