<script lang="ts">
    import { Chart } from "chart.js";
    import { onMount } from "svelte";

    export let data: any[];

    let chartElement: HTMLCanvasElement;
    let chart: Chart;

    onMount(() => {
        chart = new Chart(chartElement, {
            data: {
                labels: Array.from(Array(data.length).keys()),
                datasets: [
                    {
                        label: 'Latency',
                        data: data,
                        borderColor: '#ff9100',
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        pointBackgroundColor: '#ff9100',
                        backgroundColor: 'rgba(255, 144, 0, .1)',
                        borderWidth: 1,
                        pointBorderWidth: 0,
                        fill: true
                    }
                ]
            },
            type: 'line',
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    easing: 'linear', 
                    duration: 60,
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#6c757d' // can also use hex color codes
                        }
                    },
                    x: {
                        display: false
                    }
                }
            }
        })
    })

    $: if( chart ) {
        chart.data.datasets[0].data = data;
        chart.data.labels = data;

        chart.update()
    }
</script>
<canvas bind:this={chartElement} height="60px"></canvas>