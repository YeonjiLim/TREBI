<template>
  <div class="GraphContain">
    <div class="view-chart">
      <apexchart class="chart" type="line" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import FirebaseService from "../../services/FirebaseService";
import { async } from "q";
export default {
  components: {
    apexchart: VueApexCharts
  },
  created() {
    let xDays = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = today.toISOString().split("T");
      xDays.unshift(date[0]);
      today.setDate(today.getDate() - 1);
    }
    this.chartOptions.xaxis.categories = xDays;
  },

  mounted() {
    if (this.$device.mobile) {
      this.ismobile = true;
      this.getGithubData().then(data => {
        data.forEach((commitData, index) => {
          this.series[index].name = commitData.githubId;
          this.series[index].data = commitData.commitCount;
        });
      });
    } else {
      let today = new Date().toString();
      today = today.split(" ");
      const curMonth = today[1];
      const curDate = today[2];
      const curYear = today[3];

      this.getGithubData().then(data => {
        let updatedAt = Date(data[0].updatedAt.seconds * 1000);
        updatedAt = updatedAt.split(" ");
        const updatedDate = updatedAt[2];
        const updatedYear = updatedAt[3];
        const updatedMonth = updatedAt[1];
        // console.log(curYear, curMonth, curDate);
        // console.log(updatedYear, updatedMonth, updatedDate);
        if (
          curYear === updatedYear &&
          curMonth === updatedMonth &&
          curDate === updatedDate
        ) {
          // console.log(true);
          data.forEach((commitData, index) => {
            // console.log(commitData.githubId, commitData.commitCount);
            this.series[index].name = commitData.githubId;
            this.series[index].data = commitData.commitCount;
          });
        } else {
          // console.log(false);
          this.$store.commit("clearGitGraphData");
          this.githubId.forEach(async (id, index) => {
            await this.getGithub(id, index);
            // console.log(this.$store.state.gitGraphData[index]);
            this.series[index].name = this.$store.state.gitGraphData[
              index
            ].githubId;
            this.series[index].data = this.$store.state.gitGraphData[
              index
            ].commitCount;

            FirebaseService.updateGithubData(
              this.$store.state.gitGraphData[index].githubId,
              this.$store.state.gitGraphData[index].commitCount
            );
          });
        }
      });
      // console.log(this.commitData);
      // console.log(this.commitData.values);

      // const gitGraphData = this.$store.state.gitGraphData[0];
      // console.log("gitGraphData", gitGraphData);
      // console.log(gitGraphData[0], gitGraphData[1]);
      // this.getGithub("13akstjq", 0);
    }
  },
  props: ["githubId"],
  data() {
    return {
      ismobile: false,
      commitData: [],
      series: [
        {
          name: this.githubId[0],
          data: []
        },
        {
          name: this.githubId[1],
          data: []
        },
        {
          name: this.githubId[2],
          data: []
        },
        {
          name: this.githubId[3],
          data: []
        },
        {
          name: this.githubId[4],
          data: []
        }
      ],
      chartOptions: {
        chart: {
          shadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: "smooth"
        },
        title: {
          text: "　",
          align: "left"
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        markers: {
          size: 6
        },
        xaxis: {
          categories: [],
          title: {
            text: "Date"
          }
        },
        yaxis: {
          title: {
            text: "Commit"
          },
          min: 0,
          max: 10
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      }
    };
  },
  methods: {
    getGithubData: async () => {
      return await FirebaseService.getGithubData();
    },
    getGithub: async function(githubId, index) {
      // console.log(githubId, index);
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = `https://github.com/${githubId}`; // site that doesn’t send Access-Control-*
      let result = await fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .catch(() =>
          console.log("Can’t access " + url + " response. Blocked by browser?")
        );
      const commitCount = [];
      for (let i = 0; i < 10; i++) {
        const dateIndex = result.lastIndexOf("data-count");
        const count = result
          .substring(dateIndex + 11, dateIndex + 15)
          .replace(/"/gi, "")
          .replace(/ /gi, "");
        result = result.substring(0, dateIndex);
        commitCount.unshift(count);
      }
      // console.log(githubId, commitCount);
      await this.$store.commit("setGitGraphData", {
        index,
        githubId,
        commitCount
      });
      // console.log(githubId, commitCount);
      // const id = this.$store.state.gitGraphData[index].githubId;
      // const count = this.$store.state.gitGraphData[index].commitCount;
      // console.log(id, count);
      // this.series[index].data = this.$store.state.gitGraphData[index];
    }
  }
};
</script>

<style>
.GraphContain {
  margin-top: 8vh;
}
.view-chart {
  margin: auto;
  width: 80vw;
}

.mobile__message {
  text-align: center;
  font-size: 25px;
  margin: 10px 20px;
}
@media (max-width: 768px) {
  .view-chart {
    width: 100vw;
    margin: 0;
  }
}
</style>
