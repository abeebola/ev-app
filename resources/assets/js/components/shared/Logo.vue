<template>
    <router-link tag="a" to="/">
        <!-- <img :src="img" alt=""> -->
        <h2 class="logo">
            EV App
        </h2>
    </router-link>
</template>

<script>
    export default {
        name: "Logo",
        computed: {
            img() {
                switch (this.size) {
                    case "sm":
                        return this.images.sm;

                    default:
                        return this.images.md;
                }
            }
        },
        data() {
            return {
                images: {
                    sm: "/static/img/softdoc-sm.png",
                    md: "/static/img/softdoc-md.png"
                }
            };
        },
        props: {
            size: String
        }
    };

</script>

<style>
    .theme--dark h2.logo {
        color: #fff;
    }

    a {
        display: inline-block;
        text-decoration: none;
    }

</style>
