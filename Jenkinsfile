projects = ['packages/demo1', 'packages/demo2', '.']

def build(String project) {
    //sh "docker build -t ${project}:latest ./packages/"
    echo "docker image ${project} has complete building..."
}

def build_projects(projects) {
    echo "\n\nBuilding PROJECT:\n\n"
    projects.each{
        project ->
        // Check is files in given directory changed between commits
        // NOTE: $GIT_PREVIOUS_COMMIT and $GIT_COMMIT provided by Jenkins GIT Plugin
        changed_project = sh(
            returnStdout: true,
            script: "git diff --name-only ${GIT_PREVIOUS_COMMIT} ${GIT_COMMIT} ${project}"
        ).trim()

        if (!changed_project.equalsIgnoreCase("")) {
            build(project)
        }
    }
}

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
                build_projects(projects)
            }
        }
    }
}