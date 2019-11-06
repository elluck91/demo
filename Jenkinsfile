pipeline {
    agent any
    stages {
        stage('build matchengine') {
            when {
                changeset "**/packages/**/*.*"
            }
            steps {
               script {
                   def fields = env.getEnvironment()
                   fields.each {
                        key, value -> println("${key} = ${value}");
                    }
 
                    println(env.PATH)
               }
            }
        }
        stage('build posttrade') {
            when {
                changeset "**/packages/**/*.*"
            }
            steps {
                echo 'building post trade'
            }
        }
    }
}