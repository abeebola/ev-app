import { Bar } from "./Charts";
export default {
  extends: Bar,
  props: ["options", "data"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};
