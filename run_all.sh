#!/usr/bin/env bash

##############################################
# RUN ALL — ContextOnto
# Levanta BACKEND (Flask) + FRONTEND (Vite)
##############################################

# Fail fast
set -e

echo "====================================="
echo "   CONTEXTONTO — RUN ALL SERVICES"
echo "====================================="


##############################################
# 1) BACKEND FLASK
##############################################
echo "-> Iniciando BACKEND (Flask na porta 5001)..."

(
    cd contextonto_api
    echo "-> Ativando conda env: context_env"
    source /opt/miniconda3/etc/profile.d/conda.sh
    conda activate context_env

    echo "-> Rodando Flask API..."
    python app.py
) &

BACK_PID=$!


##############################################
# 2) FRONTEND VITE/REACT
##############################################
echo "-> Iniciando FRONTEND (Vite na porta 5173)..."

(
    cd contextonto_frontend
    npm run dev
) &

FRONT_PID=$!


##############################################
# 3) Final
##############################################

echo ""
echo "====================================="
echo " 🚀 TODOS OS SERVIÇOS ESTÃO RODANDO!"
echo "-------------------------------------"
echo " Backend:  http://127.0.0.1:5001/"
echo " Frontend: http://127.0.0.1:5173/"
echo "-------------------------------------"
echo " Para encerrar, pressione CTRL+C"
echo "====================================="
echo ""

# Espera ambos os processos
wait $BACK_PID $FRONT_PID
