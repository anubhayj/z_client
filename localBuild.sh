kubectl scale deployment -n g2_services zoom-apis --replicas=0

docker build -t zoom-apis .
docker tag zoom-apis:latest localhost:5000/zoom-apis-local:latest
docker push localhost:5000/zoom-apis-loca:latest

kubectl scale deployment -n g2 zoom-apis --replicas=1