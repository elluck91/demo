pipeline { 
  agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t ljuraszek/my-image ./packages/minikube2/Dockerfile'
            }
        }
    }
}