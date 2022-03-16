<template>
  <v-row class="no-gutters">
    <v-col
      cols="12"
      md="8"
      offset-md="2"
      v-if="timestamp"
      class="text-center rounded-xl pa-4 pa-lg-0"
    >
      <v-row class="no-gutters gradient pa-4 rounded-xl">
        <v-col cols="12" lg="5" class="white rounded-xl">
          <v-row class="no-gutters weather-panel panel">
            <v-col cols="5">
              <h1>Отрадное</h1>
              <h2>
                <small>{{ dateToRus }} {{ date }}</small>
              </h2>
              <p class="h3">
                <i class="mi mi-fw mi-lg mi-rain-heavy"></i>
                {{ weatherCondition }}
              </p>
            </v-col>
            <v-col
              offset="2"
              cols="5"
              class="d-flex flex-column justify-center text-center"
            >
              <span class="text-h3">{{ weather.info[timestamp].temp }}°</span>

              <small class="text-h6"
                >Ощущается как {{ weather.info[timestamp].feels_like }}°</small
              >
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          offset-lg="2"
          lg="5"
          class="white rounded-xl mt-4 mt-lg-0"
        >
          <v-row class="exchange-panel panel no-gutters fill-height">
            <v-col
              class="d-flex justify-center align-center"
              cols="4"
              v-for="ex in exchange.info"
              :key="ex._id"
            >
              <v-icon large color="white"
                >mdi-currency-{{
                  ex.charCode == "Юань"
                    ? "cny"
                    : ex.charCode == "Евро"
                    ? "eur"
                    : "usd"
                }}</v-icon
              >
              <div>{{ Math.round(parseFloat(ex.value) * 100) / 100 }} руб.</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      cols="12"
      md="8"
      offset-md="2"
      v-if="!timestamp"
      class="pa-4 text-center gradient mb-4 rounded-xl"
      style="height: 100px"
    >
      <div class="white fill-height rounded-xl">Загрузка</div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      timestamp: "",
      date: "",
      month: "",
    };
  },

  computed: {
    ...mapState(["weather", "exchange"]),
    weatherCondition() {
      return {
        clear: "Ясно",
        "partly-cloudy": "Малооблачно",
        cloudy: "Облачно с прояснениями",
        overcast: "Пасмурно",
        drizzle: "Морось",
        "light-rain": "Небольшой дождь",
        rain: "Дождь",
        "moderate-rain": "Умеренно сильный дождь",
        "heavy-rain": "Сильный дождь",
        "continuous-heavy-rain": "Длительный сильный дождь",
        showers: "Ливень",
        "wet-snow": "Дождь со снегом",
        "light-snow": "Небольшой снег",
        snow: "Снег",
        "snow-showers": "Снег с градом",
        hail: "Ливень",
        thunderstorm: "Гроза",
        "thunderstorm-with-rain": "Дождь с грозой",
        "thunderstorm-with-hail": "Гроза с градом",
      }[this.weather.info[this.timestamp].condition];
    },
    dateToRus() {
      return {
        0: "Январь",
        1: "Февраль",
        2: "Март",
        3: "Апрель",
        4: "Май",
        5: "Июнь",
        6: "Июль",
        7: "Август",
        8: "Сентябрь",
        9: "Октябрь",
        10: "Ноябрь",
        11: "Декабрь",
      }[this.month];
    },
    weatherIcons() {
      if (this.timestamp > 7 || this.timestamp < 19) {
        return {
          clear: "wi-day-sunny",
          "partly-cloudy": "wi-day-cloudy",
          cloudy: "wi-cloudy",
          overcast: "wi-fog",
          drizzle: "wi-day-showers",
          "light-rain": "wi-showers",
          rain: "wi-day-rain",
          "moderate-rain": "wi-day-rain",
          "heavy-rain": "wi-day-rain",
          "continuous-heavy-rain": "wi-day-rain",
          showers: "wi-day-hail",
          "wet-snow": "wi-day-rain-mix",
          "light-snow": "wi-day-snow-wind",
          snow: "wi-snow",
          "snow-showers": "wi-snow",
          hail: "wi-rain-mix",
          thunderstorm: "wi-day-lightning",
          "thunderstorm-with-rain": "wi-day-storm-showers",
          "thunderstorm-with-hail": "wi-day-snow-thunderstorm",
        }[this.weather.info[this.timestamp].condition];
      } else {
        return {
          clear: "wi-night-clear",
          "partly-cloudy": "wi-night-alt-cloudy",
          cloudy: "wi-cloudy",
          overcast: "wi-fog",
          drizzle: "wi-day-showers",
          "light-rain": "wi-showers",
          rain: "wi-night-alt-rain",
          "moderate-rain": "wi-night-alt-rain",
          "heavy-rain": "wi-night-alt-rain",
          "continuous-heavy-rain": "wi-night-alt-rain",
          showers: "wi-night-hail",
          "wet-snow": "wi-night-alt-rain-mix",
          "light-snow": "wi-night-alt-snow",
          snow: "wi-night-alt-snow",
          "snow-showers": "wi-night-alt-snow",
          hail: "wi-night-alt-sleet",
          thunderstorm: "wi-night-lightning",
          "thunderstorm-with-rain": "wi-night-thunderstorm",
          "thunderstorm-with-hail": "wi-night-snow-thunderstorm",
        }[this.weather.info[this.timestamp].condition];
      }
    },
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  methods: {
    getNow: function () {
      const today = new Date();
      const date = today.getDate();
      const month = today.getMonth();
      const time = today.getHours();
      const hours = time;
      this.month = month;
      this.date = date;
      this.timestamp = hours;
    },
  },
};
</script>

<style lang='sass' scoped>
.panel
  background-size: cover
  border-radius: 20px
  box-shadow: 25px 25px 40px 0px rgba(0,0,0,0.33)
  color: #fff
  overflow: hidden
  position: relative

  small
    color: inherit
    font-size: 50%

  ul.forecast > li
    border-top: 1px solid #fff

  .temperature
    & > span
      font-size: 2em
.exchange-panel
  background-image: url("https://picsum.photos/id/1/400/200/?blur")
.weather-panel
  background-image: url("https://unsplash.it/600/400?image=1043&blur")
</style>