"""Meilisearch client factory for the Airport Search Index.

The architecture's search component is Meilisearch: `/airports/search` delegates
to it, and the import job rebuilds its index from Postgres on every re-import
(US-001, US-007, US-008). This module is the one place that knows the index
name and how to reach the server, so both the API and the import job share it
rather than each building their own client.
"""

import os

import meilisearch

MEILI_URL = os.getenv("MEILI_URL", "http://localhost:7700")
MEILI_MASTER_KEY = os.getenv("MEILI_MASTER_KEY", "")

# The one index this app ever reads or writes: the full airport directory,
# rebuilt wholesale by the import job and never edited in place.
AIRPORTS_INDEX = "airports"


def get_meili_client() -> meilisearch.Client:
    """A client bound to this environment's Meilisearch."""
    return meilisearch.Client(MEILI_URL, MEILI_MASTER_KEY)
