<template>
    <div class="dashboard">
        <div class="balance"></div>       
        <div class="wallets"></div>       
        <div class="interes"></div>       
        <div class="receice"></div>       
        <div class="chart"></div>       
        <div class="markets"></div>       
        <div class="transactions"></div>       
        <div class="news"></div>       
    </div>
</template>

<script>

export default {
name: 'AppDashboard'
}
</script>

<style>
.dashboard {
    position: fixed;
    height: calc(100vh - 108px);
    width: calc(100vw - 90px);
    padding: 40px 40px 38px 30px;
    bottom: 0;
    right: 0;
    display: grid;
    grid-template-rows: .7fr 1.2fr 1.25fr .85fr;
    grid-template-columns: 1.36fr 1.36fr .4fr 1.2fr 1.58fr;
    grid-template-areas: "a b b b g"
                         "a c d d g"
                         "e e e f g"
                         "e e e f h";
    gap:18px;
    }
.balance {
grid-area: a;
background-color: aliceblue;
}
.wallets {
grid-area: b;
background-color: darkblue;


}
.interes {
grid-area: c;
background-color: violet;

}
.receice {
grid-area: d;
background-color: rebeccapurple;

}
.chart {
grid-area: e;
background-color: saddlebrown;

}
.markets {
grid-area: f;
background-color: silver;

}
.transactions {
grid-area: g;
background-color: burlywood;

}
.news {
grid-area: h;
background-color: black;

}
</style>
