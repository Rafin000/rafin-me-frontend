pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "${params.DOCKER_USERNAME}/${params.REPO_NAME}:${params.IMAGE_TAG}-frontend"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/Rafin000/rafin-me-frontend.git'
                }
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
        stage('Update Deployment File') {
            environment {
                GIT_REPO_NAME = "rafin-me-frontend"
                GIT_USER_NAME = "Rafin000"
                GIT_USER_EMAIL = "marufulislam00000@gmail.com"
            }
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        set -e

                        # Check if directory exists and remove it if necessary
                        if [ -d "${GIT_REPO_NAME}" ]; then
                        rm -rf ${GIT_REPO_NAME}
                        fi

                        # Clone the repository
                        git clone https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git

                        # Navigate to the repository directory
                        cd ${GIT_REPO_NAME}

                        # Configure git user
                        git config user.email "${GIT_USER_EMAIL}"
                        git config user.name "${GIT_USER_NAME}"

                        # Optional: Ensure latest changes
                        git pull origin main

                        # Update the deployment file
                        sed -i "s|image: rafin1998/rafin-blog-site:[^ ]*|image: rafin1998/rafin-blog-site:${params.IMAGE_TAG}-frontend|g" frontend-depl.yaml


                        # Add and commit changes
                        git add frontend-depl.yaml
                        git commit -m "Update deployment image to version ${params.IMAGE_TAG} [Jenkins build ${params.IMAGE_TAG}]"

                        # Push changes back to the repository
                        git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git HEAD:main
                    '''
                }
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