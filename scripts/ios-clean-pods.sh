#!/bin/bash
# Clean iOS build and reinstall pods (use after prebuild or when ReactCommon/RuntimeExecutor.h fails)
set -e
cd "$(dirname "$0")/../ios"
rm -rf Pods build Podfile.lock
pod install --repo-update
echo "Done. Run: npx expo run:ios"
