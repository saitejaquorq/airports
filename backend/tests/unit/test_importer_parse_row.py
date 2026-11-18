"""Unit tests for `app.importer.parse_row`: the per-row mapping that decides
what gets inserted, with no database involved.
"""

from app.importer import parse_row


def _row(**overrides: str) -> dict:
    base = {
        "ident": "KJFK",
        "type": "large_airport",
        "name": "John F Kennedy International Airport",
        "latitude_deg": "40.6398",
        "longitude_deg": "-73.7789",
        "iso_country": "US",
        "municipality": "New York",
        "gps_code": "KJFK",
        "iata_code": "JFK",
    }
    base.update(overrides)
    return base


def test_ac_maps_missing_iata_and_municipality_to_none() -> None:
    mapped = parse_row(_row(iata_code="", municipality=""))

    assert mapped is not None
    assert mapped["iata_code"] is None
    assert mapped["municipality"] is None


def test_ac_skips_rows_with_no_coordinates() -> None:
    assert parse_row(_row(latitude_deg="", longitude_deg="")) is None


def test_ac_skips_rows_with_non_numeric_coordinates() -> None:
    assert parse_row(_row(latitude_deg="not-a-number", longitude_deg="also-bad")) is None


def test_ac_skips_rows_with_no_ident_or_name() -> None:
    assert parse_row(_row(ident="")) is None
    assert parse_row(_row(name="")) is None


def test_ac_keeps_country_null_for_an_unmapped_iso_country() -> None:
    mapped = parse_row(_row(iso_country="ZZ"))

    assert mapped is not None
    assert mapped["iso_country"] == "ZZ"
    assert mapped["country_name"] is None


def test_ac_maps_valid_row_fields_through() -> None:
    mapped = parse_row(_row())

    assert mapped == {
        "ident": "KJFK",
        "icao_code": "KJFK",
        "iata_code": "JFK",
        "name": "John F Kennedy International Airport",
        "municipality": "New York",
        "iso_country": "US",
        "country_name": "United States",
        "airport_type": "large_airport",
        "latitude_deg": 40.6398,
        "longitude_deg": -73.7789,
    }
