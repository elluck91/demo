pipeline { 
  agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('List Images') {
            steps {
                sh 'docker-compose images'
            }
        }
        stage('Results') {
            steps {
                echo 'Done.'
            }
        }
    }
}