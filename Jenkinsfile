projects = ['packages/demo1', 'packages/demo2']
built_images = []

def build(String project) {
    sh "docker build -t ${project}:latest ${project}"
    echo "docker image ${project} has complete building..."
    built_images.add(project)
}

def build_projects(projects) {
    projects.each{
        project ->
        // Check is files in given directory changed between commits
        // NOTE: $GIT_PREVIOUS_COMMIT and $GIT_COMMIT provided by Jenkins GIT Plugin
        changes_in_project = sh(
            returnStdout: true,
            script: "git diff --name-only ${GIT_PREVIOUS_COMMIT} ${GIT_COMMIT} ${project}"
        ).trim()
        
        // If changes_in_project is NOT empty, build that project
        if (!changes_in_project.equalsIgnoreCase("")) {
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

        stage('DEPLOY') {
            steps {
                built_images.each {
                    image ->
                    echo "Image ${image} will be deployed..."
                }
            }
        }
    }
}