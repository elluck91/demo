pipeline {
    agent any
    stages {
        stage('checkout'){
            steps{
                git branch: 'master', url: 'https://github.com/elluck91/demo.git'
            }
        }
        stage('build minikube') {
            when {
                changeset "**/packages/minikube/*.*"
            }
            steps {
                echo 'building minikube'
            }
        }
        stage('build minikube 2') {
            when {
                changeset "**/packages/minikube2/*.*"
            }
            steps {
                echo 'building minikube2'
            }
        }
    }
}
