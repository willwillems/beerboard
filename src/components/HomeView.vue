<template>
  <div id="app">
    <main>
      <header class="header">
        <div class="header__title-container">
          <img class="header__title-container__logo" src="/static/logo-square.svg"/>
          <h1 class="header__title-container__text">{{title}}</h1>
        </div>
        <i class="header__subtitle">{{subtitle}}</i>
      </header>
      <section class="demo-section">
        <b class="demo-section__text">Check out our demo <a href="https://bierbord.nl/demo">here!</a></b>
      </section>
      <section>
        <plans-tile :tiles="tiles"></plans-tile>
      </section>
      <text-section v-for="text in infoTexts" :textData="text" :key="text.title">
      </text-section>
    </main>
  </div>
</template>

<script>
import PlansTile from './HomeView/AppPlansTile'
import TextSection from './HomeView/AppTextSection'

export default {
  name: 'app',
  components: {
    PlansTile,
    TextSection
  },
  data () {
    return {
      title: 'Beerboard',
      subtitle: 'A simple reliable sollution to your beer managment',
      infoTexts: [{
        title: 'What even is this?',
        text: 'Beerboard is an application developed to track beer consumption in a group of people. This would typically be done for financial reasons and is best used with a conveniently placed wall-mounted tablet or touchscreen computer. Beerboard supports both (touch)computers and larger tablets with a specially designed interface for mobile usage. The app is designed offline first with a focus on data integrity so a spotty wifi-connection will not mess up your data or cause you to lose entries. If you have any other questions feel free to contact us!'
      }],
      tiles: {
        left: {
          title: "Free",
          content: `
                    <p>Completely <i>free</i>, use with <i>unlimited</i> data usage and no other limits!</p>
                    <ul>
                      <li>Real time data synchronisation</li>
                      <li>Detailed usage statistics</li>
                      <li>Mobile web app</li>
                    </ul>`,
          buttonTitle: "Try it!"
        },
        right: {
          title: "€1/month",
          content: `
                    <p>Besides everything included in the free tier:</p>
                    <ul>
                      <li>Automated emails every month</li>
                      <li>Personal support</li>
                      <li>3 month backup of your data</li>
                    </ul>`,
          buttonTitle: "Buy it!"
        }
      }
    }
  }
}
</script>
<!--TODO: add Roboto web font-->
<style>
body {
  margin: 0;
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  display: flex;
  align-content: center;
  align-items: center;
  flex-flow: column;
  text-align: center;
  padding: 20px;
}

main > * {
  margin: 20px 0px;
}

.header__title-container {
  display: flex;
}

.header__title-container__logo {
  margin: 5px;
}

.header__title-container__text {
  font-size: 68px;
  margin: 0px;
}

.header__subtitle {
  opacity: 0.71;
}

.demo-section {
  margin: 0px;
}

.demo-section__text a{
  /* remove the default underline */
  text-decoration: none;
  /* so the after pseudo can be positioned */
  position: relative;
  /* no blue/purple link color */
  color: inherit;
}

.demo-section__text a::after{
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(-124deg, #EE1D1D 0%, #E38222 100%);
}
</style>
