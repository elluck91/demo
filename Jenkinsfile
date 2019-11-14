def build(String project) {
    //sh "docker build -t ${project}:latest ./packages/"
    echo "docker image ${project} has complete building..."
}

projects = ['packages/demo1', 'packages/demo2', '.']

pipeline {
    agent any
    stages {
        stage('checkout'){
            steps{
                git branch: "${GIT_BRANCH}", url: "${GIT_URL}"
            }
        }

        // BUILD
        stage('BUILD') {
            steps {
                script {
                    projects.each {
                        project ->
                        when {
                            changeset "${project}/*.*"
                        }
                        steps {
                            echo "Building ${project}..."
                            build(${project})
                        }
                    }
                }
            }
        }
    }
}