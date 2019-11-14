changed_projects = ['packages/demo1', 'packages/demo2']
built_images = []
tested_images = []

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

def test_images(images) {
    images.each {
        image ->
        sh "docker run --rm ${image} npm test"
        tested_images.add(image)
    }
}

def deploy_images(images) {
    images.each {
        image ->
        sh "kubectl create namespace ${image}"
        sh "kubectl run ${image}-deployment --image=${image} --port=9001 --image-pull-policy=Never -n ${image}"
        sh "kubectl expose deployment ${image}-deployment --type=LoadBalancer"
        url = sh(
            returnStdout: true,
            script: "minikube service ${image}-deployment -n ${image}"
        ).trim()
        echo "Access the deployment at: ${url}"
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
                build_projects(changed_projects)
            }
        }

        stage('TEST') {
            steps {
                test_images(built_images)
            }
        }

        stage('DEPLOY') {
            steps {
                deploy_images(tested_images)
            }
        }
    }
}