<template>
    <v-layout row wrap>
        <dashboard-badge v-for="item in badgeData" :key="item.title" :badgeData="item"></dashboard-badge>
        <v-flex xs12>
            <v-divider></v-divider>
            <v-layout>
                <v-layout row wrap>
                    <br>
                    <v-flex sm3 v-show="true" pa-3>
                        <bar-chart :data="charts.barChart.data" :options="charts.barChart.options"></bar-chart>
                    </v-flex>
                    <v-flex sm3 pa-3>
                        <pie-chart :data="charts.barChart.data" :options="charts.barChart.options"></pie-chart>
                    </v-flex>
                    <v-flex sm3 pa-3>
                        <radar-chart :data="charts.barChart.data" :options="charts.barChart.options"></radar-chart>
                    </v-flex>
                </v-layout>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import Layout from './../Layout'
    import DashboardBadge from './DashboardBadge'
    import BarChart from "./../charts/BarChart";
    import PieChart from "./../charts/PieChart";
    import RadarChart from "./../charts/RadarChart";
    export default {
        components: {
            DashboardBadge,
            BarChart,
            PieChart,
            RadarChart,
            Layout
        },
        computed: {
            btnDisabled() {
                return this.showLoader;
            },
            badgeData() {
                return [
                    this.dashData.totalVending,
                    this.dashData.vendingAmount,
                    this.dashData.cars,
                ];
            },
            dashboardStats() {
                if (this.evData && this.evData.stats) {
                    return this.evData.stats
                }
                return
            },
            sortedAssocs() {
                return this.assocs.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return 0;
                });
            }
        },
        data() {
            return {
                err_msg: "",
                assocs: [],
                charts: {
                    barChart: {
                        data: {
                            labels: [
                                'Total',
                                "Today",
                                "Last 5",
                            ],
                            datasets: [{
                                label: "Total vending",
                                backgroundColor: "#4caf50",
                                data: [40, 30, 15]
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatios: true,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        // callback: function(value, index, values) {
                                        //   return `£ ${value}`;
                                        // }
                                    }
                                }]
                            },
                            tooltips: {
                                enabled: true
                                //   callbacks: {
                                //     label: function(tooltipItems, data) {
                                //       return tooltipItems.yLabel + "£";
                                //     }
                                //   }
                            }
                        }
                    }
                },
                dashData: {
                    totalVending: {
                        title: "Total vending (last 5)",
                        icon: "user",
                        content: "0",
                        color: "#fff",
                        bgColor: "#F44336",
                        footer: "Total"
                    },
                    vendingAmount: {
                        title: "Total vending (today)",
                        icon: "users",
                        content: "0",
                        color: "#fff",
                        bgColor: "#FF9800",
                        footer: "Total"
                    },
                    cars: {
                        title: "Total Amount (today)",
                        icon: "car",
                        content: "0",
                        color: "#fff",
                        bgColor: "#4CAF50",
                        footer: "Total"
                    }
                },
                errorMsg: "",
                showLoader: false
            };
        },
        methods: {
            async getDashboardData() {
                if (this.evData && this.evData.stats) {
                    return this.updatedashboardStats(
                        this.evData.stats
                    )
                }

                try {
                    const res = await this.$http.get(`/stats/all`)
                    await this.handleResponse(res, data => {
                        if (typeof res == "object") {
                            return this.updatedashboardStats(data.stats)
                        }
                    })
                } catch (error) {
                    this.handleError(error, "We couldn't get your dashboard data. Please try again later.")
                }
            },
            updatedashboardStats(stats) {
                this.dashData.totalVending.content = stats.users
                this.dashData.vendingAmount.content = stats.vendingAmount
                this.dashData.cars.content = `${stats.cars.live} / ${stats.cars.all}`
            }
        },
        mounted() {
            this.getDashboardData()
        }
    };

</script>

<style scoped>
    .bblue {
        background-color: #2196F3 !important;
    }

    .bblue .txt {
        color: #fff
    }

    .bblue>span,
    .bred>span {
        display: inherit;
    }

    .main-text {
        font-weight: 600;
    }

    #datetimepicker1 {
        cursor: pointer;
    }

    .form {
        max-width: 600px;
        margin: 0 auto;
    }

    .img-pl {
        cursor: pointer;
    }

    .img-c {
        background-color: #e0e0e0;
        position: relative;
        overflow: hidden;
        margin: 0 auto 20px;
    }

    .img-c>img {
        max-width: 100%;
        height: auto;
    }

    .img-c>span {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 30px 10px;
        text-align: center;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.59);
        opacity: 0;
        transition: opacity 0.3s ease-in;
    }

    .img-c:hover>span {
        opacity: 1;
    }

    .camera {
        background-color: #9e9e9e;
        width: 400px;
        max-width: 100%;
        height: auto;
        margin: 0 auto;
        display: block;
        position: relative;
    }

    .camera>span {
        width: 100%;
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.62);
        padding: 10px 0 2px;
    }

    #video {
        max-width: 100%;
    }

    #canvas {
        display: none;
    }

    @media screen and (min-width: 769px) {
        .us-n {
            float: left;
        }

        .img-pl,
        .img-c {
            float: right;
        }
    }

</style>
