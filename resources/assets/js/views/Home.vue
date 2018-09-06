<template>
    <div>
        <layout>
            <dashboard></dashboard>
        </layout>
    </div>
</template>

<script>
    import Layout from './../components/Layout'
    import Dashboard from './../components/home/Dashboard.vue'
    export default {
        components: {
            Dashboard,
            Layout
        }
    }

</script>
