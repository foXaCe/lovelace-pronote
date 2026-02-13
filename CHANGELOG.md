# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.1.1] - 2026-02-13

### Fixed

- Homework card showing wrong day header when hiding done homework
- Homework card slider using DOM manipulation instead of reactive state
- Homework card slider right arrow missing disabled state on last day

## [1.1.0] - 2026-02-13

### Added

- Version tracking with styled console log on bundle load
- Version field in all card registrations for HACS compatibility
- Dynamic locale detection from Home Assistant with English fallbacks
- Emoji icons on menu meal category headers

### Changed

- Migrate all CI workflows and tooling from yarn to npm
- Slider navigation now uses reactive state instead of direct DOM manipulation
- Complete code review fixes (P0-P3) across all cards
- Skip eslint on pre-commit.ci, run locally via system node

### Fixed

- Slider not persisting after LitElement re-renders
- Menus card always applying slider CSS even when slider disabled
- Averages card showing "undefined" for missing out_of field
- Evaluations card crash on missing acquisition abbreviation
- Delays card using wrong field name (reasons vs reason)
- Menus card showing blank when meal data is empty
- Entity resolution for French entity IDs (buildRelatedEntityId)
- Editor entity picker patterns for French entity names
- Period filter and active periods sensor with FR/EN fallback

### Security

- Resolve Dependabot vulnerabilities (braces, js-yaml, lodash)
