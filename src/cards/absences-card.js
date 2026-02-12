import { html, css } from "../lit-helpers.js";
import BasePeriodRelatedPronoteCard from './base-period-related-card';
import { localize } from "../localize.js";

const getCardName = () => localize("cards.absences.name");
const getCardDescription = () => localize("cards.absences.description");

class PronoteAbsencesCard extends BasePeriodRelatedPronoteCard {

    cardType = 'absences';
    items_attribute_key = 'absences';
    header_title = 'Absences of ';
    no_data_message = 'No absences';

    getAbsencesRow(absence) {
        let from = this.getFormattedDate(absence.from);
        let to = this.getFormattedDate(absence.to);
        let content = html`
        <tr>
            <td class="absence-status">
                <span>${absence.justified ? html`<ha-icon icon="mdi:check"></ha-icon>` : html`<ha-icon icon="mdi:clock-alert-outline"></ha-icon>`}</span>
            </td>
            <td><span style="background-color:${absence.justified ? '#107c41' : '#e73a1f'}"></span></td>
            <td><span class="absence-from">${from} ${this.localize('content.date_range_to', 'to')} ${to}</span><br><span class="absence-hours">${absence.hours} ${this.localize('content.hours_missed', 'hours of class missed')}</span>
        </td>
            <td>
                <span class="absence-reason">${absence.reason}</span>
            </td>
        </tr>
        `;
        return content;
    }

    getFormattedDate(date) {
        return (new Date(date)) ? new Date(date).toLocaleDateString(this.getLocale(), { weekday: 'long', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/^(.)/, (match) => match.toUpperCase()) : '';
    }

    getCardContent() {
        const absences = this.getFilteredItems();
        const itemTemplates = [
            this.getPeriodSwitcher()
        ];
        const absenceRows = [];

        for (let index = 0; index < absences.length; index++) {
            if (this.config.max_absences && this.config.max_absences <= index) {
                break;
            }
            absenceRows.push(this.getAbsencesRow(absences[index]));
        }

        if (absenceRows.length > 0) {
            itemTemplates.push(html`<table>${absenceRows}</table>`);
        } else {
            itemTemplates.push(this.noDataMessage());
        }

        return itemTemplates;
    }

    getDefaultConfig() {
        return {
            ...super.getDefaultConfig(),
            display_header: true,
            max_absences: null
        };
    }

    static get styles() {
        return css`
        ${super.styles}
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
            padding: 5px 10px 5px 10px;
            text-align: left;
        }
        tr td:first-child {
            width: 10%;
            text-align:right;
        }
        span.absence-reason {
            font-weight:bold;
            display:block;
        }
        tr td:nth-child(2) {
            width: 4px;
            padding: 5px 0;
        }
        tr td:nth-child(2) > span {
            display:inline-block;
            width: 4px;
            height: 3rem;
            border-radius:4px;
            background-color: grey;
            margin-top:4px;
        }
        span.absence-from {
            font-weight:bold;
            padding: 4px;
            border-radius: 4px;
        }
        span.absence-hours {
            font-size: 0.9em;
            padding: 4px;
        }
        table + div {
            border-top: 1px solid white;
        }
        `;
    }

    static getStubConfig() {
        return {
            display_header: true,
            max_absences: null,
        }
    }

    static getConfigElement() {
        return document.createElement("pronote-absences-card-editor");
    }
}

customElements.define("pronote-absences-card", PronoteAbsencesCard);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "pronote-absences-card",
    name: getCardName(),
    description: getCardDescription(),
    documentationURL: "https://github.com/delphiki/lovelace-pronote?tab=readme-ov-file#absences",
});
