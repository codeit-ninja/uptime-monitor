<script lang="ts">
    import { Chart } from "chart.js";
    import { onMount } from "svelte";

    type ChartProps = {
        data: any[];
        label: string;
        height: string;
        color: string;
    }

    let {
        data,
        label,
        height  = 'auto',
        color   = '#ff9100'
    } = $props<ChartProps>();

    let chartElement: HTMLCanvasElement = $state();
    let chart: Chart;

    onMount(() => {
        chart = new Chart(chartElement, {
            data: {
                labels: Array.from(Array(data.length).keys()),
                datasets: [
                    {
                        label: label,
                        data: data,
                        borderColor: color,
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        pointBackgroundColor: color,
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

    $effect(() => {
        chart.data.datasets[0].data = data;
        chart.data.labels = data;

        chart.update()
    })
</script>
<canvas bind:this={chartElement} height={height}></canvas>