pipeline {
    agent any
    stages {
        stage('build matchengine') {
          docker build -t ljuraszek/minikube ./packages/minikube2/Dockerfile
        }
    }
}