"""The Meilisearch client factory, wired correctly -- no index behaviour yet.

No network call here: constructing a `meilisearch.Client` never connects by
itself, so this only proves the module imports and reads its settings from
the environment without raising.
"""

import meilisearch

from app.search import AIRPORTS_INDEX, get_meili_client


def test_get_meili_client_returns_a_client() -> None:
    client = get_meili_client()

    assert isinstance(client, meilisearch.Client)


def test_airports_index_name_is_stable() -> None:
    assert AIRPORTS_INDEX == "airports"
