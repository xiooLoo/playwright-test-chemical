#!/bin/bash

if [ ! -d "./report" ]; then
  mkdir "./report"
  echo "Created 'report' directory."
fi

cd "./report"



current_date=$(date +%Y-%m-%d)

index=1

if [ -d "./playwright-report" ]; then
  while true; do
    new_name="playwright-report-${current_date}-${index}"
    if [ ! -d "./$new_name" ]; then

      mv "./playwright-report" "./$new_name"
      echo "Renamed 'playwright-report' to '$new_name'."
      break
    else
      index=$((index + 1))
    fi
  done
else
  echo "No 'playwright-report' directory found to rename."
fi

cd ..

npx playwright test && taskkill
