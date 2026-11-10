#!/bin/sh
# Builds the static site into ./out using Docker, without installing Node on this Mac.
# Dependencies live in the Docker volume "edmont-deps".
set -e
cd "$(dirname "$0")/.."
mkdir -p out

docker run --rm \
  -v "$PWD":/src:ro \
  -v "$PWD/out":/out \
  -v edmont-deps:/deps \
  -e GITHUB_PAGES=true \
  -e NEXT_PUBLIC_BASE_PATH= \
  -e NEXT_TELEMETRY_DISABLED=1 \
  node:22-alpine sh -c '
    rm -rf /deps/site && mkdir -p /deps/site
    cd /src && cp -r app public next.config.ts tsconfig.json postcss.config.mjs package.json /deps/site/
    cd /deps/site && node /deps/node_modules/next/dist/bin/next build --webpack
    rm -rf /out/* /out/.[!.]* 2>/dev/null || true
    cp -r /deps/site/out/. /out/
  '
