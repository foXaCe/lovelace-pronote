import { html, css } from "../lit-helpers.js";
import BasePronoteCard from "./base-card";
import { getAttribute, buildRelatedEntityId } from "../attribute-resolver.js";

class BasePeriodRelatedPronoteCard extends BasePronoteCard {

    period_filter = null;
    allow_all_periods = true;
    items_attribute_key = null;

    getPeriodSwitcher() {
        if (this.period_filter === null) {
            this.setPeriodFilterFromConfig();
        }

        if (this.config.hide_period_switch) {
            return html``;
        }

        let available_periods = [...this.getActivePeriods()];
        if (this.allow_all_periods) {
            available_periods.push({
                id: 'all',
                name: this.localize('content.all_periods', 'Tout')
            });
        }
        let tabs = [];
        for (let period of available_periods) {
            tabs.push(
                html`<input
                        type="radio"
                        name="pronote-period-switcher"
                        id="pronote-period-switcher-${period.id}"
                        value="${period.id}"
                        .checked="${this.period_filter === period.id}"
                        @change="${(e) => this.handlePeriodChange(e)}"
                    />
                    <label class="pronote-period-switcher-tab" for="pronote-period-switcher-${period.id}">${period.name}</label>`
            );
        }

        return html`<div class="pronote-period-switcher">${tabs}</div>`;
    }

    handlePeriodChange(event) {
        this.period_filter = event.target.value;
        this.requestUpdate();
    }

    setPeriodFilterFromConfig() {
        if (this.config.default_period && this.period_filter === null) {
            if (this.config.default_period === 'current') {
                let active_periods = this.getActivePeriods();
                for (let period of active_periods) {
                    if (period.is_current_period) {
                        this.period_filter = period.id;
                        break;
                    }
                }
            }
            else {
                this.period_filter = this.config.default_period;
            }
        }
        this.requestUpdate();
    }

    getActivePeriodsSensor() {
        const entityId = buildRelatedEntityId(this.config.entity, 'active_periods');
        return this.hass.states[entityId] || null;
    }

    getActivePeriods() {
        const sensor = this.getActivePeriodsSensor();
        if (!sensor) return [];
        return getAttribute(sensor.attributes, 'periods') || [];
    }

    getAllEntityNames() {
        let active_periods = this.getActivePeriods();
        let entities = [
            this.config.entity
        ];
        for (let period of active_periods) {
            if (!period.is_current_period) {
                entities.push(`${this.config.entity}_${period.id}`);
            }
        }
        return entities;
    }

    getFilteredItems() {
        if (this.period_filter === 'all' && !this.allow_all_periods) {
            const periods = this.getActivePeriods();
            if (periods.length > 0) {
                this.period_filter = periods[periods.length - 1].id;
            }
        }

        let entity_names = this.getAllEntityNames();
        let items = [];
        for (let entity_name of entity_names) {
            let entity_state = this.hass.states[entity_name];
            if (!entity_state) continue;
            const periodKey = getAttribute(entity_state.attributes, 'period_key');
            if (this.period_filter === 'all' || this.period_filter === periodKey) {
                const entityItems = getAttribute(entity_state.attributes, this.items_attribute_key);
                if (Array.isArray(entityItems)) {
                    items.push(...entityItems);
                }
            }
        }
        return items;
    }

    getCurrentPeriodKey() {
        let active_periods = this.getActivePeriods();
        for (let period of active_periods) {
            if (period.is_current_period) {
                return period.id;
            }
        }
        return null;
    }

    isCurrentPeriodSelected() {
        return this.period_filter === this.getCurrentPeriodKey();
    }

    getDefaultConfig() {
        return {
            default_period: 'current',
            hide_period_switch: false,
        }
    }

    static get styles() {
        return css`
        ${super.styles}
        .pronote-period-switcher {
            display: flex;
            justify-content: center;
            gap: 10px;
            padding:5px;
        }
        .pronote-period-switcher input {
            display: none;
        }
        .pronote-period-switcher-tab {
            padding: 10px;
        }
        .pronote-period-switcher-tab:hover {
            cursor: pointer;
        }
        .pronote-period-switcher input:checked + .pronote-period-switcher-tab {
            background-color: rgba(0,0,0,0.1);
        }
        `;
    }
}

export default BasePeriodRelatedPronoteCard;
