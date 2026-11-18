"""The three airport/route endpoints the API spec declares, still stubs.

These assert the routers are wired in -- correct path, correct parameters,
present in the OpenAPI document -- without asserting any search, lookup or
distance behaviour, since none is implemented yet.
"""

from fastapi.testclient import TestClient


def test_search_route_is_registered(client: TestClient) -> None:
    response = client.get("/airports/search", params={"q": "heathrow"})

    assert response.status_code == 200
    assert response.json()["status"] == "not_implemented"


def test_search_requires_q(client: TestClient) -> None:
    response = client.get("/airports/search")

    assert response.status_code == 422


def test_lookup_route_is_registered(client: TestClient) -> None:
    response = client.get("/airports/EGLL")

    assert response.status_code == 200
    assert response.json()["status"] == "not_implemented"


def test_distance_route_is_registered(client: TestClient) -> None:
    response = client.get("/routes/distance", params={"from": "EGLL", "to": "KJFK"})

    assert response.status_code == 200
    assert response.json()["status"] == "not_implemented"


def test_distance_requires_both_codes(client: TestClient) -> None:
    response = client.get("/routes/distance", params={"from": "EGLL"})

    assert response.status_code == 422


def test_openapi_document_lists_every_spec_endpoint(client: TestClient) -> None:
    paths = client.get("/openapi.json").json()["paths"]

    assert "/health" in paths
    assert "/airports/search" in paths
    assert "/airports/{code}" in paths
    assert "/routes/distance" in paths
