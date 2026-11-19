FROM python:3.12-slim

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
# The bundled OurAirports snapshot `app.importer` reads on first startup
# (see `app/importer.py`'s `DEFAULT_DATASET_PATH`). Without this the image
# has an `app` package but no dataset to import, and the directory stays
# empty on every fresh deploy.
COPY data ./data
# Alembic migrations and the config that points at them -- needed at
# container startup (see docker-entrypoint.sh), not just in CI.
COPY alembic.ini ./alembic.ini
COPY alembic ./alembic
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

# Run as an unprivileged user. The service never needs root, and a container that
# drops it limits what a compromise of the app can do to the host.
RUN useradd --create-home --uid 10001 appuser
USER appuser

EXPOSE 8000

# Reports the container unhealthy when the app stops answering. Uses the Python
# standard library rather than curl, which the slim base image does not ship.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health', timeout=3)"

# The entrypoint applies pending Alembic migrations, then execs this command --
# one container, no separate migration task to run or forget (see
# docker-entrypoint.sh and the single-container deployment model in ENVIRONMENT.md).
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
