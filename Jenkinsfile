changed_projects = ['packages/demo1', 'packages/demo2']
built_images = []
tested_images = []

def build(String project) {
    sh "eval $(minikube docker-env)"
    sh "docker build -t ${project}:latest ${project}"
    echo "docker image ${project} has complete building..."
    built_images.add(project)
}

def build_projects(projects) {
    projects.each{
        project ->
        // Check is files in given directory changed between commits
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
        sh "kubectl create namespace ${GIT_BRANCH}"
        sh "kubectl run ${GIT_BRANCH}-deployment --image=${image} --port=9001 --image-pull-policy=Never -n ${GIT_BRANCH}"
        sh "kubectl expose deployment ${GIT_BRANCH}-deployment --type=LoadBalancer -n ${GIT_BRANCH}"
        url = sh(
            returnStdout: true,
            script: "minikube service ${GIT_BRANCH}-deployment -n ${GIT_BRANCH}"
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