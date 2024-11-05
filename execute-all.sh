#!/bin/bash

# Ejecuta cada script en el orden especificado

echo "Ejecutando docker.sh..."
bash docker.sh

echo "Ejecutando k6_build_push.sh..."
bash k6_build_push.sh

echo "Ejecutando k6_dockerfile..."
bash k6_dockerfile

echo "Ejecutando kubectl_build_push.sh..."
bash kubectl_build_push.sh

echo "Ejecutando kubectl_dockerfile..."
bash kubectl_dockerfile

echo "Ejecutando userdata.sh..."
bash userdata.sh

echo "Todos los scripts han sido ejecutados."
