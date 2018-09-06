import { Doughnut } from "./Charts";

export default {
  extends: Doughnut,
  props: ["options", "data"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};
