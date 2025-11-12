#!/bin/bash
cd /home/kavia/workspace/code-generation/games-user-interface-development-223073-223083/games_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

