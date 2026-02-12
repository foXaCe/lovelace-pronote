import { html, css } from "../lit-helpers.js";
import BasePronoteCard from "./base-card";
import { localize } from "../localize.js";
import { getAttribute } from "../attribute-resolver.js";
import { getWeekNumber } from "../utils.js";

const getCardName = () => localize("cards.homework.name");
const getCardDescription = () => localize("cards.homework.description");

class PronoteHomeworkCard extends BasePronoteCard {

    cardType = 'homework';
    header_title = 'Devoirs de ';
    no_data_message = 'Pas de devoirs à faire';

    getFormattedDate(date) {
        return (new Date(date))
            .toLocaleDateString('fr-FR', {weekday: 'long', day: '2-digit', month: '2-digit'})
            .replace(/^(.)/, (match) => match.toUpperCase())
        ;
    }

    getFormattedTime(time) {
        return new Intl.DateTimeFormat("fr-FR", {hour:"numeric", minute:"numeric"}).format(new Date(time));
    }

    getDayHeader(homework, daysCount) {
        return html`<div class="pronote-homework-header">
            ${this.config.enable_slider ? html`<span
                class="pronote-homework-header-arrow-left ${daysCount === 0 ? 'disabled' : ''}"
                @click=${(e) => this.changeDay('previous', e)}
            >←</span>` : '' }
            <span class="pronote-homework-header-date">${this.getFormattedDate(homework.date)}</span>
            ${this.config.enable_slider ? html`<span
                class="pronote-homework-header-arrow-right"
                @click=${(e) => this.changeDay('next', e)}
            >→</span>` : '' }
        </div>`;
    }

    getHomeworkRow(homework, index) {
        let descriptionLines = (homework.description || '').trim().split("\n");
        let files = [];
        if (homework.files) {
            homework.files.forEach((file) => {
                if (file.name.trim() === '') {
                    return;
                }
                files.push(html`<span class="homework-file">➤ <a href="${file.url}">${file.name}</a></span>`);
            });
        }

        return html`
        <tr class="${homework.done ? 'homework-done':''}">
            <td class="homework-color"><span style="background-color:${homework.background_color}"></span></td>
            <td class="homework-detail">
                <label for="homework-${index}">
                    <span class="homework-subject">${homework.subject}</span>
                </label>
                <input type="checkbox" id="homework-${index}" />
                <span class="homework-description">${descriptionLines.map((line, i) => i === 0 ? line : html`<br>${line}`)}</span>
                ${files.length > 0 ? html`<span class="homework-files">${files}</span>` : ''}
            </td>
            <td class="homework-status">
                <span>${homework.done ? html`<ha-icon icon="mdi:check"></ha-icon>` : html`<ha-icon icon="mdi:account-clock"></ha-icon>`}</span>
            </td>
        </tr>
        `;
    }

    getDayRow(homework, dayTemplates, daysCount) {
        return html`
        <div class="${this.config.enable_slider ? 'slider-enabled' : ''} pronote-homework-day-wrapper ${daysCount === 0 ? 'active' : ''}">
            ${this.getDayHeader(homework, daysCount)}
            <table class="${this.config.reduce_done_homework ? 'reduce-done' : ''}">${dayTemplates}</table>
        </div>
        `;
    }

    getCardContent() {
        const stateObj = this.hass.states[this.config.entity];
        const homework = getAttribute(stateObj.attributes, 'homework') || [];

        const currentWeekNumber = getWeekNumber(new Date());
        const itemTemplates = [];
        let dayTemplates = [];
        let daysCount = 0;

        if (homework && homework.length > 0) {
            let previousDay = this.getFormattedDate(homework[0].date);
            for (let index = 0; index < homework.length; index++) {
                let hw = homework[index];
                let currentFormattedDate = this.getFormattedDate(hw.date);

                if (hw.done === true && this.config.display_done_homework === false) {
                    continue;
                }

                if (previousDay !== currentFormattedDate) {
                    if (dayTemplates.length > 0) {
                        itemTemplates.push(this.getDayRow(homework[index-1], dayTemplates, daysCount));
                        dayTemplates = [];
                    }

                    previousDay = currentFormattedDate;
                    daysCount++;
                }

                if (this.config.current_week_only && getWeekNumber(new Date(hw.date)) !== currentWeekNumber) {
                    break;
                }

                dayTemplates.push(this.getHomeworkRow(hw, index));
            }

            if (dayTemplates.length > 0 && (
                !this.config.current_week_only
                || (this.config.current_week_only && currentWeekNumber === getWeekNumber(new Date(homework[homework.length-1].date)))
            )) {
                itemTemplates.push(this.getDayRow(homework[homework.length-1], dayTemplates, daysCount));
            }
        }

        if (itemTemplates.length === 0) {
            itemTemplates.push(this.noDataMessage());
        }

        return itemTemplates;
    }

    getCardClasses() {
        return this.config.enable_slider ? 'pronote-homework-card-slider' : '';
    }

    getDefaultConfig() {
        return {
            ...super.getDefaultConfig(),
            current_week_only: true,
            reduce_done_homework: true,
            display_done_homework: true,
            enable_slider: false,
        };
    }

    static get styles() {
        return css`
        ${super.styles}
        .pronote-homework-card-slider .pronote-homework-day-wrapper {
            display: none;
        }
        .pronote-homework-card-slider .pronote-homework-day-wrapper.active {
            display: block;
        }
        .pronote-homework-card-slider .pronote-homework-header-date {
            display: inline-block;
            text-align: center;
            width: 120px;
        }
        .pronote-homework-header-arrow-left,
        .pronote-homework-header-arrow-right {
            cursor: pointer;
        }
        .pronote-homework-header-arrow-left.disabled,
        .pronote-homework-header-arrow-right.disabled {
            opacity: 0.3;
            pointer-events: none;
        }
        div:not(.slider-enabled) > .pronote-homework-header {
            border-bottom: 2px solid grey;
        }
        .slider-enabled > .pronote-homework-header {
            padding-top: 0;
            text-align: center;
        }
        table{
            font-size: 0.9em;
            font-family: Roboto;
            width: 100%;
            outline: 0px solid #393c3d;
            border-collapse: collapse;
        }
        td {
            vertical-align: top;
            padding: 5px 10px 5px 10px;
            padding-top: 8px;
            text-align: left;
        }
        td.homework-color {
            width: 4px;
            padding-top: 11px;
        }
        td.homework-color > span {
            display:inline-block;
            width: 4px;
            height: 1rem;
            border-radius:4px;
            background-color: grey;
        }
        td.homework-detail {
            padding:0;
            padding-top: 8px;
            padding-bottom: 8px;
        }
        span.homework-subject {
            display:block;
            font-weight:bold;
        }
        span.homework-description {
            font-size: 0.9em;
        }
        span.homework-files {
            display: block;
        }
        span.homework-files .homework-file {
            display: inline-block;
        }
        td.homework-status {
            width: 5%;
        }
        .reduce-done .homework-done label:hover {
            cursor: pointer;
        }
        .reduce-done .homework-done .homework-description {
            display: none;
        }
        .reduce-done .homework-done input:checked + .homework-description {
            display: block;
        }
        .homework-detail input {
            display: none;
        }
        `;
    }

    static getStubConfig() {
        return {
            display_header: true,
            current_week_only: true,
            reduce_done_homework: true,
            display_done_homework: true,
            enable_slider: false,
        }
    }

    static getConfigElement() {
        return document.createElement("pronote-homework-card-editor");
    }
}

customElements.define("pronote-homework-card", PronoteHomeworkCard);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "pronote-homework-card",
    name: getCardName(),
    description: getCardDescription(),
    documentationURL: "https://github.com/delphiki/lovelace-pronote?tab=readme-ov-file#homework",
});
