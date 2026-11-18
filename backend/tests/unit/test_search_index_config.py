"""Unit tests for the Meilisearch index configuration and document mapping.

No network involved: these check the settings dict and the row-to-document
mapping that `rebuild_index` relies on.
"""

from datetime import UTC, datetime

from app.models import Airport
from app.search_index import (
    DISPLAYED_ATTRIBUTES,
    INDEX_SETTINGS,
    SEARCHABLE_ATTRIBUTES,
    _document,
)


def test_ac_searchable_attributes_are_ordered_name_municipality_country_codes() -> None:
    assert SEARCHABLE_ATTRIBUTES == [
        "name",
        "municipality",
        "country_name",
        "icao_code",
        "iata_code",
        "ident",
        "iso_country",
    ]
    assert INDEX_SETTINGS["searchableAttributes"] == SEARCHABLE_ATTRIBUTES


def test_ac_displayed_attributes_cover_all_airport_fields() -> None:
    for field in (
        "id",
        "ident",
        "icao_code",
        "iata_code",
        "name",
        "municipality",
        "iso_country",
        "country_name",
        "airport_type",
        "latitude_deg",
        "longitude_deg",
        "imported_at",
    ):
        assert field in DISPLAYED_ATTRIBUTES


def test_ac_typo_tolerance_is_enabled() -> None:
    assert INDEX_SETTINGS["typoTolerance"]["enabled"] is True


def test_ac_document_mapping_includes_all_fields() -> None:
    airport = Airport(
        id=1,
        ident="HKJK",
        icao_code="HKJK",
        iata_code="NBO",
        name="Jomo Kenyatta International Airport",
        municipality="Nairobi",
        iso_country="KE",
        country_name="Kenya",
        airport_type="large_airport",
        latitude_deg=-1.3192,
        longitude_deg=36.9278,
        imported_at=datetime(2026, 1, 1, tzinfo=UTC),
    )

    doc = _document(airport)

    assert doc["id"] == 1
    assert doc["icao_code"] == "HKJK"
    assert doc["iata_code"] == "NBO"
    assert doc["name"] == "Jomo Kenyatta International Airport"
    assert doc["municipality"] == "Nairobi"
    assert doc["country_name"] == "Kenya"
    assert doc["latitude_deg"] == -1.3192
    assert doc["longitude_deg"] == 36.9278
    assert doc["imported_at"] == "2026-01-01T00:00:00+00:00"
