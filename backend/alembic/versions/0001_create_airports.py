"""create airports table

Revision ID: 0001
Revises:
Create Date: 2026-11-18

"""

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "airports",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("ident", sa.String(length=16), nullable=True),
        sa.Column("icao_code", sa.String(length=8), nullable=True),
        sa.Column("iata_code", sa.String(length=8), nullable=True),
        sa.Column("name", sa.String(length=256), nullable=False),
        sa.Column("municipality", sa.String(length=256), nullable=True),
        sa.Column("iso_country", sa.String(length=8), nullable=True),
        sa.Column("country_name", sa.String(length=128), nullable=True),
        sa.Column("airport_type", sa.String(length=32), nullable=True),
        sa.Column("latitude_deg", sa.Float(), nullable=False),
        sa.Column("longitude_deg", sa.Float(), nullable=False),
        sa.Column(
            "imported_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_unique_constraint("uq_airports_ident", "airports", ["ident"])
    op.create_index("ix_airports_icao_code", "airports", ["icao_code"])
    op.create_index("ix_airports_iata_code", "airports", ["iata_code"])


def downgrade() -> None:
    op.drop_index("ix_airports_iata_code", table_name="airports")
    op.drop_index("ix_airports_icao_code", table_name="airports")
    op.drop_constraint("uq_airports_ident", "airports", type_="unique")
    op.drop_table("airports")
