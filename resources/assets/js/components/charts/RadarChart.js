import { Radar } from "./Charts";

export default {
  extends: Radar,
  props: ["options", "data"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};
