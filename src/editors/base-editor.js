import { LitElement, html, css } from "../lit-helpers.js";
import { createLocalizeFunction } from "../localize.js";
import { buildRelatedEntityId, getAttribute } from "../attribute-resolver.js";

class BasePronoteCardEditor extends LitElement {
    static get properties() {
        return {
            hass: {},
            _config: {},
        };
    }

    setConfig(config) {
        this._config = config;
        this.loadEntityPicker();
    }

    _valueChanged(ev) {
        const _config = Object.assign({}, this._config);

        if (typeof ev.target.checked !== 'undefined') {
            _config[ev.target.configValue] = ev.target.checked;
        } else {
            _config[ev.target.configValue] = ev.target.value == '' ? null : ev.target.value;
        }

        this._config = _config;

        const event = new CustomEvent("config-changed", {
            detail: { config: _config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    buildSelectField(label, config_key, options, value, default_value) {
        const selectOptions = [];
        for (const option of options) {
            selectOptions.push(html`<ha-list-item .value="${option.value}">${option.label}</ha-list-item>`);
        }

        return html`
            <ha-select
                label="${label}"
                .value=${value || default_value}
                .configValue=${config_key}
                @change=${this._valueChanged}
                @closed=${(ev) => ev.stopPropagation()}
            >
                ${selectOptions}
            </ha-select>
        `
    }

    buildDefaultPeriodSelectField(label, config_key, value, default_value = 'current', allow_all_periods = true) {
        if (!this._config.entity) {
            return html``;
        }
        const sensorEntityId = buildRelatedEntityId(this._config.entity, 'active_periods');
        let sensor = this.hass.states[sensorEntityId];

        // Fallback : essayer la convention alternative (FR/EN)
        if (!sensor) {
            let altEntityId;
            if (sensorEntityId.endsWith('_active_periods')) {
                altEntityId = sensorEntityId.slice(0, -'_active_periods'.length) + '_periodes_actives';
            } else if (sensorEntityId.endsWith('_periodes_actives')) {
                altEntityId = sensorEntityId.slice(0, -'_periodes_actives'.length) + '_active_periods';
            }
            if (altEntityId) {
                sensor = this.hass.states[altEntityId];
            }
        }

        if (!sensor) {
            return html``;
        }
        let active_periods = getAttribute(sensor.attributes, 'periods') || [];

        const localize = createLocalizeFunction(this.hass);
        let options = [];
        if (allow_all_periods) {
            options.push({value:'all', label: localize('editor.labels.all', 'All')});
        }
        options.push({value:'current', label: localize('editor.labels.current', 'Current')});
        for (let period of active_periods) {
            options.push({value: period.id, label: period.name});
        }

        return this.buildSelectField(label, config_key, options, value, default_value);
    }

    buildSwitchField(label, config_key, value, default_value) {
        if (typeof value !== 'boolean') {
            value = default_value;
        }

        return html`
            <ha-formfield class="switch-wrapper" .label="${label}">
                <ha-switch
                    name="${config_key}"
                    .checked=${value}
                    .configValue="${config_key}"
                    @change=${this._valueChanged}
                ></ha-switch>
            </ha-formfield>
        `;
    }

    buildNumberField(label, config_key, value, default_value, step) {
        return html`
            <ha-textfield type="number" step="${step || 1}"
                 label="${label}"
                .value=${value || default_value}
                .configValue=${config_key}
                @change=${this._valueChanged}
            >
        `;
    }

    buildTextField(label, config_key, value, default_value) {
        return html`
            <ha-textfield
                 label="${label}"
                .value=${value || default_value}
                .configValue=${config_key}
                @change=${this._valueChanged}
                @keyup=${this._valueChanged}
            >
        `;
    }

    buildEntityPickerField(label, config_key, value, filter) {
        const entityFilter = new RegExp("pronote_[a-z_]+_"+filter);

        return html`
            <ha-entity-picker
                label="${label}"
                .hass=${this.hass}
                .value=${value || ''}
                .configValue=${config_key}
                .includeDomains="sensor"
                .entityFilter="${(entity) => entityFilter.test(entity.entity_id)}"
                @value-changed=${this._valueChanged}
                allow-custom-entity
            ></ha-entity-picker>
        `
    }

    async loadEntityPicker() {
        if (window.customElements.get("ha-entity-picker")) {
            return;
        }

        const ch = await window.loadCardHelpers();
        const c = await ch.createCardElement({ type: "entities", entities: [] });
        await c.constructor.getConfigElement();
    }

    static get styles() {
        return css`
            ha-formfield {
                display: block;
                padding-top: 20px;
                clear: right;
            }
            ha-formfield > ha-switch {
                float: right;
            }
            ha-select, ha-textfield {
                clear: right;
                width: 100%;
                padding-top: 15px;
            }
        `;
    }
}

export default BasePronoteCardEditor;
