import { LitElement, html, css } from "../lit-helpers.js";
import { createLocalizeFunction, localize } from "../localize.js";
import { getAttribute } from "../attribute-resolver.js";

class BasePronoteCard extends LitElement {

    static get properties() {
        return {
            config: {},
            hass: {},
            header_title: { type: String },
            no_data_message: { type: String },
            _activeDayIndex: { type: Number },
        };
    }

    // Track total days for bounds checking in changeDay
    _totalDays = 0;
    // Track whether user has manually navigated (prevents auto-reset)
    _userNavigated = false;

    getLocale() {
        return this.hass?.locale?.language || this.hass?.language || 'fr';
    }

    localize(key, fallback) {
        const localizeFn = createLocalizeFunction(this.hass);
        return localizeFn(key, fallback);
    }

    getCardHeader() {
        const stateObj = this.hass.states[this.config.entity];
        if (!stateObj) {
            return html``;
        }
        let child_attributes = stateObj.attributes;
        let nickname = getAttribute(child_attributes, 'nickname');
        let full_name = getAttribute(child_attributes, 'full_name');
        let child_name = (typeof nickname === 'string' && nickname.length > 0) ? nickname : full_name;
        let title = this.localize(`cards.${this.cardType}.title`, this.header_title);
        return html`<div class="pronote-card-header">${title} ${child_name}</div>`;
    }

    noDataMessage() {
        let message = this.localize(`cards.${this.cardType}.no_data`, this.no_data_message);
        return html`<div class="pronote-card-no-data">${message}</div>`;
    }

    getCardClasses() {
        return '';
    }

    getDefaultConfig() {
        return {
            display_header: true,
        };
    }

    changeDay(direction, e) {
        e.preventDefault();
        if (direction === 'previous' && this._activeDayIndex > 0) {
            this._activeDayIndex--;
            this._userNavigated = true;
        } else if (direction === 'next' && this._activeDayIndex < this._totalDays - 1) {
            this._activeDayIndex++;
            this._userNavigated = true;
        }
    }

    setAutoActiveDay(index) {
        if (!this._userNavigated) {
            this._activeDayIndex = index;
        }
    }

    render() {
        if (!this.config || !this.hass) {
            return html``;
        }

        const stateObj = this.hass.states[this.config.entity];

        if (!stateObj) {
            return html``;
        }

        if (stateObj.state === 'unavailable' || stateObj.state === 'unknown') {
            return html`
                <ha-card id="${this.config.entity}-card">
                    ${this.config.display_header ? this.getCardHeader() : ''}
                    <div class="pronote-card-no-data">${this.localize('common.unavailable', 'Data unavailable')}</div>
                </ha-card>`;
        }

        return html`
            <ha-card id="${this.config.entity}-card" class="${this.getCardClasses()}">
                ${this.config.display_header ? this.getCardHeader() : ''}
                ${this.getCardContent()}
            </ha-card>`
        ;
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error(localize('common.entity_required', 'You need to define an entity'));
        }

        this.config = {
            ...this.getDefaultConfig(),
            ...config
        };
    }

    static get styles() {
        return css`
        .pronote-card-header {
            text-align:center;
        }
        div {
            padding: 12px;
            font-weight:bold;
            font-size:1em;
        }
        .pronote-card-no-data {
            display:block;
            padding:8px;
            text-align: center;
            font-style: italic;
        }
        `;
    }
}

export default BasePronoteCard;
