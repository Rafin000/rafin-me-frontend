pipeline {
    agent any

    // parameters {
    //     string(name: 'DOCKER_USERNAME', defaultValue: 'rafin1998', description: 'Docker Hub Username')
    //     string(name: 'REPO_NAME', defaultValue: 'rafin-blog-site', description: 'Repository Name')
    //     string(name: 'IMAGE_TAG', defaultValue: '2.8-frontend', description: 'Image Tag')
    // }

    environment {
        DOCKER_IMAGE = "${params.DOCKER_USERNAME}/${params.REPO_NAME}:${params.IMAGE_TAG}"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git 'https://github.com/Rafin000/rafin-me-frontend.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                sh "docker push ${DOCKER_IMAGE}"
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
        }
        success {
            echo 'Frontend pipeline succeeded!'
        }
        failure {
            echo 'Frontend pipeline failed.'
        }
    }
}
