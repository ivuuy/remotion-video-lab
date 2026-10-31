#!/bin/zsh
set -e
task_dir="${0:A:h}"
cd "$task_dir"
export PATH="/Users/wanbing77126.com/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
exec ./node_modules/.bin/remotion studio
