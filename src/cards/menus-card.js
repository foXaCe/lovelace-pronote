import { html, css } from "../lit-helpers.js";
import BasePronoteCard from "./base-card";
import { localize } from "../localize.js";
import { getAttribute } from "../attribute-resolver.js";
import { getWeekNumber, isSameDay } from "../utils.js";
import { VERSION } from "../version.js";

const getCardName = () => localize("cards.menus.name", "Pronote Menus Card");
const getCardDescription = () => localize("cards.menus.description", "Display the menus from Pronote");

class PronoteMenusCard extends BasePronoteCard {

    cardType = 'menus';
    header_title = 'Canteen menus of ';
    no_data_message = 'No menus to display';

    hasMenuContent(menu) {
        return (menu.first_meal?.length > 0 || menu.main_meal?.length > 0 || menu.side_meal?.length > 0 || menu.cheese?.length > 0 || menu.dessert?.length > 0);
    }

    getMenuRow(menu) {
        if (!this.hasMenuContent(menu)) {
            return html`<tr><td colspan="2" class="pronote-menu-empty">${this.localize('content.no_menu_details', 'No menu details available')}</td></tr>`;
        }
        return html`
            ${menu.first_meal?.length > 0 ? this.getMealRow(menu.first_meal, '🥗 ' + this.localize('content.starter', 'Starter')) : ''}
            ${menu.main_meal?.length > 0 ? this.getMealRow(menu.main_meal, '🍽️ ' + this.localize('content.main_course', 'Main course')) : ''}
            ${menu.side_meal?.length > 0 ? this.getMealRow(menu.side_meal, '🥦 ' + this.localize('content.side_dish', 'Side dish')) : ''}
            ${menu.cheese?.length > 0 ? this.getMealRow(menu.cheese, '🧀 ' + this.localize('content.cheese', 'Cheese')) : ''}
            ${menu.dessert?.length > 0 ? this.getMealRow(menu.dessert, '🍰 ' + this.localize('content.dessert', 'Dessert')) : ''}
        `;
    }

    getMealChoices(meal) {
        let list = html``;
        for (let i = 0; i < meal.length; i++) {
            let choice = meal[i];
            list = html`${list} ${choice.name} <br />`

            let labels = choice.labels;
            if (this.config.display_labels && labels.length > 0) {
                for (let l = 0; l < labels.length; l++) {
                    let label = labels[l];
                    list = html`${list} <span class="pronote-meal-label">${label.name}</span>`;
                }
                list = html`${list} <br />`;
            }

            if (i >= meal.length - 1) {
                break;
            }

            list = html`${list} -<br />`
        }

        return list;
    }

    getMealRow(meal, title) {
        return html`
            <tr>
                <td>
                    ${title}
                </td>
                <td class="pronote-meal-choices">
                    ${this.getMealChoices(meal)}
                </td>
            </tr>
        `;
    }

    getFormattedDate(menu) {
        return (new Date(menu.date))
            .toLocaleDateString(this.getLocale(), {weekday: 'long', day: '2-digit', month: '2-digit'})
            .replace(/^(.)/, (match) => match.toUpperCase())
        ;
    }

    getDayHeader(menu, daysCount) {
        const isFirst = daysCount === 0;
        const isLast = daysCount === this._totalDays - 1;
        return html`<div class="pronote-menus-header">
            <span
                class="pronote-menus-header-arrow-left ${isFirst ? 'disabled' : ''}"
                @click=${(e) => this.changeDay('previous', e)}
            >←</span>
            <span class="pronote-menus-header-date">${this.getFormattedDate(menu)}</span>
            <span
                class="pronote-menus-header-arrow-right ${isLast ? 'disabled' : ''}"
                @click=${(e) => this.changeDay('next', e)}
            >→</span>
        </div>`;
    }

    getCardContent() {
        const stateObj = this.hass.states[this.config.entity];
        const menus = getAttribute(stateObj.attributes, 'menus') || [];

        const currentWeekNumber = getWeekNumber(new Date());

        const itemTemplates = [];
        let daysCount = 0;

        let now = new Date();
        let autoActiveDay = 0;

        // Count total days and compute auto-active day
        let totalMenus = 0;
        for (let index = 0; index < menus.length; index++) {
            let menu = menus[index];
            if (this.config.current_week_only && getWeekNumber(new Date(menu.date)) > currentWeekNumber) {
                break;
            }
            let lunchPassedAt = new Date(menu.date);
            lunchPassedAt.setHours(14, 0, 0, 0);
            if (this.config.switch_to_next_day && isSameDay(lunchPassedAt, now) && lunchPassedAt < now) {
                autoActiveDay = totalMenus + 1;
            }
            totalMenus++;
            if (this.config.max_days && this.config.max_days <= totalMenus) {
                break;
            }
        }

        this._totalDays = totalMenus;
        this.setAutoActiveDay(autoActiveDay);

        if (this._activeDayIndex === undefined || this._activeDayIndex >= this._totalDays) {
            this._activeDayIndex = 0;
        }

        for (let index = 0; index < menus.length; index++) {
            let menu = menus[index];

            if (this.config.current_week_only) {
                if (getWeekNumber(new Date(menu.date)) > currentWeekNumber) {
                    break;
                }
            }

            itemTemplates.push(html`
                <div class="${this.config.enable_slider ? 'slider-enabled' : ''} pronote-menus-day-wrapper ${daysCount === this._activeDayIndex ? 'active' : ''}">
                    ${this.getDayHeader(menu, daysCount)}
                    ${this.config.display_menu_name ? html`<div class="pronote-menus-name">${menu.name}</div>` : ''}
                    <table>${this.getMenuRow(menu)}</table>
                </div>
            `);

            daysCount++;
            if (this.config.max_days && this.config.max_days <= daysCount) {
                break;
            }
        }

        if (itemTemplates.length === 0) {
            itemTemplates.push(this.noDataMessage());
        }

        return itemTemplates;
    }

    getCardClasses() {
        return this.config.enable_slider ? 'pronote-menus-card-slider' : '';
    }

    getDefaultConfig() {
        return {
            ...super.getDefaultConfig(),
            display_menu_name: true,
            display_labels: true,
            max_days: null,
            current_week_only: false,
            switch_to_next_day: false,
            enable_slider: false,
        };
    }

    static get styles() {
        return css`
        ${super.styles}
        .pronote-menus-card-slider .pronote-menus-day-wrapper {
            display: none;
        }
        .pronote-menus-card-slider .pronote-menus-day-wrapper.active {
            display: block;
        }
        .pronote-menus-header {
            text-align: center;
        }
        .pronote-menus-card-slider .pronote-menus-header-date {
            display: inline-block;
            text-align: center;
            width: 120px;
        }
        .pronote-menus-header-arrow-left,
        .pronote-menus-header-arrow-right {
            cursor: pointer;
        }
        .pronote-menus-header-arrow-left.disabled,
        .pronote-menus-header-arrow-right.disabled {
            opacity: 0.3;
            pointer-events: none;
        }
        .pronote-menus-name {
            font-weight: lighter;
            font-style: italic;
            max-width: 90%;
            margin:auto;
            padding: 5px;
            text-align:center;
        }
        table{
            clear:both;
            font-size: 0.9em;
            font-family: Roboto;
            width: 100%;
            outline: 0px solid #393c3d;
            border-collapse: collapse;
        }
        tr:nth-child(odd) {
            background-color: rgba(0,0,0,0.1);
        }
        td {
            vertical-align: middle;
            padding: 10px;
            text-align: center;
        }
        tr td:first-child {
            width: 40%;
        }
        .pronote-meal-label {
            font-weight: lighter;
            font-size: 0.9em;
        }
        .pronote-meal-label + .pronote-meal-label:before {
            content: ' / '
        }
        `;
    }

    static getStubConfig() {
        return {
            display_header: true,
            display_menu_name: true,
            display_labels: true,
            max_days: null,
            current_week_only: false,
            switch_to_next_day: false,
        }
    }

    static getConfigElement() {
        return document.createElement("pronote-menus-card-editor");
    }
}

customElements.define("pronote-menus-card", PronoteMenusCard);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "pronote-menus-card",
    name: getCardName(),
    description: getCardDescription(),
    documentationURL: "https://github.com/delphiki/lovelace-pronote?tab=readme-ov-file#menus",
    version: VERSION,
});
