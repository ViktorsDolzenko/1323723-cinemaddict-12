import Smart from './smart.js';
import {StatisticFilter} from '../const.js';
import {getUserStatus} from '../utils/user-profile.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

const renderChart = (statisticCtx, genres, counts) => {

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: counts,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const getDurationForStatistic = (minuteDuration) => {
  const minute = (minuteDuration % 60);
  const hour = (minuteDuration / 60).toFixed();
  return `${hour}<span class="statistic__item-description">h</span> ${minute}<span class="statistic__item-description">m</span>`;
};

const createStatisticTemplate = ({filter, watchedCount, totalDuration, topGenre}, userStatus) => {

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${userStatus}</span>
  </p>
  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${filter === StatisticFilter.ALL_TIME ? `checked` : ``}>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${filter === StatisticFilter.TODAY ? `checked` : ``}>
    <label for="statistic-today" class="statistic__filters-label">Today</label>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${filter === StatisticFilter.WEEK ? `checked` : ``}>
    <label for="statistic-week" class="statistic__filters-label">Week</label>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${filter === StatisticFilter.MONTH ? `checked` : ``}>
    <label for="statistic-month" class="statistic__filters-label">Month</label>
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${filter === StatisticFilter.YEAR ? `checked` : ``}>
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>
  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${watchedCount ? watchedCount : `0`}<span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${getDurationForStatistic(totalDuration)}</p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre ? topGenre : ``}</p>
    </li>
  </ul>
  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
  </section>`;
};

export default class Stats extends Smart {
  constructor(statisticData, moviesModel) {
    super();
    this._statisticData = statisticData;
    this._moviesModel = moviesModel;
    this._handleStatisticInput = this._handleStatisticInput.bind(this);
    this._setChart();
  }

  getTemplate() {
    return createStatisticTemplate(this._statisticData, getUserStatus(this._statisticData.watchedCount));
  }

  setStatisticInputHandler(callback) {
    this._callback.statisticInput = callback;
    this.getElement()
      .querySelectorAll(`.statistic__filters-input`)
      .forEach((element) => element.addEventListener(`input`, this._handleStatisticInput));
  }

  _handleStatisticInput(evt) {
    evt.preventDefault();
    this._callback.statisticInput(evt.target.value);
  }

  _setChart() {
    if (this._statisticData.countGenre !== null) {
      const genres = Object.keys(this._statisticData.countGenre);
      const counts = Object.values(this._statisticData.countGenre);
      const countLine = genres.length;
      const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
      statisticCtx.height = BAR_HEIGHT * countLine;
      renderChart(statisticCtx, genres, counts);
    }
  }
}
