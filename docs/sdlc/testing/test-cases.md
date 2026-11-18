# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
49 tests · Passed 34 · Failed 15 · Skipped 0 · Not run 0

Acceptance criteria covered: 9/30 · passing: 1/30
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-007: Load the worldwide airport directory from a bundled open dataset

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_ac_keeps_country_null_for_an_unmapped_iso_country | Unit | Passed | `backend/tests/unit/test_importer_parse_row.py` |
| — | test_ac_maps_missing_iata_and_municipality_to_none | Unit | Passed | `backend/tests/unit/test_importer_parse_row.py` |
| — | test_ac_maps_valid_row_fields_through | Unit | Passed | `backend/tests/unit/test_importer_parse_row.py` |
| — | test_ac_skips_rows_with_no_coordinates | Unit | Passed | `backend/tests/unit/test_importer_parse_row.py` |
| — | test_ac_skips_rows_with_no_ident_or_name | Unit | Passed | `backend/tests/unit/test_importer_parse_row.py` |
| — | test_ac_skips_rows_with_non_numeric_coordinates | Unit | Passed | `backend/tests/unit/test_importer_parse_row.py` |
| — | test_ac_displayed_attributes_cover_all_airport_fields | Unit | Passed | `backend/tests/unit/test_search_index_config.py` |
| — | test_ac_document_mapping_includes_all_fields | Unit | Passed | `backend/tests/unit/test_search_index_config.py` |
| — | test_ac_searchable_attributes_are_ordered_name_municipality_country_codes | Unit | Passed | `backend/tests/unit/test_search_index_config.py` |
| — | test_ac_typo_tolerance_is_enabled | Unit | Passed | `backend/tests/unit/test_search_index_config.py` |
| AC-020 | test_ac020_reimport_refreshes_directory_and_index_without_duplicates | Integration | Failed | `backend/tests/acceptance/test_dataset_reimport.py` |
| NFR-007 | test_nfr007_index_can_be_rebuilt_from_the_database_from_scratch | Integration | Failed | `backend/tests/acceptance/test_dataset_reimport.py` |
| AC-018 | test_ac018_bundled_dataset_covers_worldwide_airports_with_full_fields | Integration | Failed | `backend/tests/acceptance/test_directory_dataset.py` |
| AC-019 | test_ac019_no_write_route_exists_for_airport_data | Integration | Failed | `backend/tests/acceptance/test_directory_dataset.py` |
| AC-021 | test_ac021_search_match_returns_all_six_field_groups | Integration | Failed | `backend/tests/acceptance/test_public_airport_api.py` |
| AC-022 | test_ac022_search_with_no_matching_query_returns_200_empty | Integration | Failed | `backend/tests/acceptance/test_public_airport_api.py` |
| AC-023 | test_ac023_search_succeeds_with_no_credentials | Integration | Failed | `backend/tests/acceptance/test_public_airport_api.py` |
| AC-024 | test_ac024_lookup_by_icao_and_by_iata_both_return_full_details | Integration | Passed | `backend/tests/acceptance/test_public_airport_api.py` |
| AC-025 | test_ac025_lookup_with_unknown_code_returns_404 | Integration | Passed | `backend/tests/acceptance/test_public_airport_api.py` |
| — | test_ac_fresh_import_loads_icao_iata_name_city_country_coordinates | Integration | Passed | `backend/tests/integration/test_airport_import.py` |
| — | test_ac_migration_creates_airports_table_with_expected_columns | Integration | Passed | `backend/tests/integration/test_airport_import.py` |
| — | test_ac_reimport_replaces_rows_without_duplicate_idents | Integration | Passed | `backend/tests/integration/test_airport_import.py` |
| AC-021 | test_ac021_search_returns_matching_airports_with_expected_fields | Integration | Failed | `backend/tests/integration/test_airports_endpoints.py` |
| AC-022 | test_ac022_search_with_no_match_and_with_empty_q_returns_empty_results | Integration | Failed | `backend/tests/integration/test_airports_endpoints.py` |
| AC-023 | test_ac023_search_and_lookup_need_no_credentials_and_openapi_has_no_security | Integration | Failed | `backend/tests/integration/test_airports_endpoints.py` |
| AC-024 | test_ac024_lookup_succeeds_case_insensitively_by_icao_iata_or_ident | Integration | Failed | `backend/tests/integration/test_airports_endpoints.py` |
| AC-025 | test_ac025_lookup_returns_404_with_detail_for_unknown_code | Integration | Failed | `backend/tests/integration/test_airports_endpoints.py` |
| NFR-002 | test_nfr002_limit_outside_range_returns_422 | Integration | Passed | `backend/tests/integration/test_airports_endpoints.py` |
| NFR-002 | test_nfr002_search_respects_limit_and_offset | Integration | Failed | `backend/tests/integration/test_airports_endpoints.py` |
| NFR-008 | test_nfr008_no_write_routes_exist_for_airport_data | Integration | Passed | `backend/tests/integration/test_airports_endpoints.py` |
| AC-018 | test_ac018_typo_query_and_code_query_return_the_expected_airport | Integration | Failed | `backend/tests/integration/test_search_index.py` |
| — | test_rebuild_on_populated_index_replaces_documents_without_stale_rows | Integration | Failed | `backend/tests/integration/test_search_index.py` |

### US-011: Use the app free of charge

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | test_airport_and_route_endpoints_never_require_payment_or_signup[GET-/airports/EGLL] | Integration | Passed | `backend/tests/integration/test_public_access.py` |
| — | test_airport_and_route_endpoints_never_require_payment_or_signup[GET-/airports/search?q=nairobi] | Integration | Passed | `backend/tests/integration/test_public_access.py` |
| — | test_airport_and_route_endpoints_never_require_payment_or_signup[GET-/routes/distance?from=EGLL&to=KJFK] | Integration | Passed | `backend/tests/integration/test_public_access.py` |
| — | test_health_check_needs_no_authorization_header | Integration | Passed | `backend/tests/integration/test_public_access.py` |
| — | test_unauthenticated_request_is_never_redirected_to_a_payment_flow | Integration | Passed | `backend/tests/integration/test_public_access.py` |
| AC-028 | [AC-028] GET /health, /airports/search, /airports/{code} and /routes/distance need no bearer, key or payment | E2E | Passed | `frontend/e2e/free-to-use.spec.ts` |
| AC-028 | [AC-028] a visitor searches, opens an airport, and plots a route with no payment, sign-up or billing prompt | E2E | Passed | `frontend/e2e/free-to-use.spec.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/App.test.tsx` |
| AC-028 | test_ac028_airport_lookup_is_public_and_sets_no_cookie | Integration | Passed | `backend/tests/acceptance/test_public_no_billing.py` |
| AC-028 | test_ac028_airports_search_is_public_and_sets_no_cookie | Integration | Passed | `backend/tests/acceptance/test_public_no_billing.py` |
| AC-028 | test_ac028_health_is_public_and_sets_no_cookie | Integration | Passed | `backend/tests/acceptance/test_public_no_billing.py` |
| AC-028 | test_ac028_openapi_declares_no_security_schemes | Integration | Passed | `backend/tests/acceptance/test_public_no_billing.py` |
| — | test_health_reports_ok | Integration | Passed | `backend/tests/integration/test_health.py` |
| — | test_the_openapi_document_builds | Integration | Passed | `backend/tests/integration/test_health.py` |
| — | the app loads | E2E | Passed | `frontend/e2e/example.spec.ts` |
| AC-028 | [AC-028] a visitor searches, opens an airport, and opens the route planner with no sign-up, paywall or billing step | E2E | Passed | `frontend/e2e/free-access.spec.ts` |
| NFR-004 | [NFR-004] no per-visitor identity is held in the browser after the journey | E2E | Passed | `frontend/e2e/free-access.spec.ts` |
<!-- sdlc:auto:end tests -->
