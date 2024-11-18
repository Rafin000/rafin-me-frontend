pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "rafin1998"
        REPO_NAME = "rafin-blog-site"
        GIT_USER_NAME = "Rafin000"
        GIT_REPO_NAME = "rafin-me-frontend"
        GIT_DEPLOYMENT_REPO_NAME = "rafin-blog-site-deployment"
        GIT_USER_EMAIL = "marufulislam00000@gmail.com"
    }

    stages {
        stage('Checkout and Get Version') {
            steps {
                script {
                    git branch: 'main', url: "https://github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git"

                    writeFile file: 'get_version.sh', text: '''#!/bin/bash
                        GITHUB_TOKEN=$1  
                        FILE_PATH="k8s-frontend/frontend-depl.yaml"
                        RAW_URL="https://raw.githubusercontent.com/${GIT_USER_NAME}/${GIT_DEPLOYMENT_REPO_NAME}/main/${FILE_PATH}"

                        content=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" ${RAW_URL})
                        current_tag=$(echo "$content" | grep -o 'image: [^ ]*' | sed 's/image: //' | grep -o '[0-9]\\+\\.[0-9]\\+-frontend')

                        if [[ -z "$current_tag" ]]; then
                            current_tag="0.0-frontend"
                        fi

                        if [[ $current_tag =~ ([0-9]+)\\.([0-9]+)-frontend ]]; then
                            major=${BASH_REMATCH[1]}
                            minor=${BASH_REMATCH[2]}
                        else
                            major=0
                            minor=0
                        fi

                        minor=$((minor + 1))
                        if [ "$minor" -ge 10 ]; then
                            major=$((major + 1))
                            minor=0
                        fi

                        echo "${major}.${minor}"
                    '''
                    sh 'chmod +x get_version.sh'

                    withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                        env.IMAGE_TAG = sh(script: './get_version.sh ${GITHUB_TOKEN}', returnStdout: true).trim()
                    }
                    env.DOCKER_IMAGE = "${DOCKER_USERNAME}/${REPO_NAME}:${IMAGE_TAG}-frontend"

                    echo "New Version: ${IMAGE_TAG}"
                    echo "Docker Image: ${DOCKER_IMAGE}"
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
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        set -e

                        # Clone repository if not already cloned
                        [ -d "${GIT_DEPLOYMENT_REPO_NAME}" ] && rm -rf ${GIT_DEPLOYMENT_REPO_NAME}
                        git clone https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_DEPLOYMENT_REPO_NAME}.git

                        cd ${GIT_REPO_NAME}

                        # Configure Git
                        git config user.name "${GIT_USER_NAME}"
                        git config user.email "${GIT_USER_EMAIL}"

                        # Pull latest changes to avoid conflicts
                        git pull origin main

                        # Update the deployment file
                        sed -i "s|image: ${DOCKER_USERNAME}/${REPO_NAME}:[^ ]*|image: ${DOCKER_IMAGE}|g" k8s-frontend/frontend-depl.yaml

                        # Commit and push the changes
                        git add k8s-frontend/frontend-depl.yaml
                        git commit -m "Update frontend deployment to version ${IMAGE_TAG} [Jenkins build]"
                        git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_DEPLOYMENT_REPO_NAME}.git HEAD:main
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
        }
        success {
            echo 'Frontend pipeline succeeded!'
        }
        failure {
            echo 'Frontend pipeline failed.'
        }
    }
}
