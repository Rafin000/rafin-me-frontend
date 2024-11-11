pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "rafin1998"
        REPO_NAME = "rafin-blog-site"
    }

    stages {
                stage('Checkout and Get Version') {
            steps {
                script {
                    // Checkout the repository
                    git branch: 'main', url: 'https://github.com/Rafin000/rafin-me-frontend.git'
                    
                    writeFile file: 'get_version.sh', text: '''#!/bin/bash

                                                                GIT_USER_NAME="Rafin000"
                                                                GIT_REPO_NAME="rafin-me-frontend"
                                                                FILE_PATH="k8s/frontend-depl.yaml"
                                                                GITHUB_TOKEN=$1  

                                                                # Directly get the raw content using the raw URL
                                                                content_decoded=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
                                                                    "https://raw.githubusercontent.com/${GIT_USER_NAME}/${GIT_REPO_NAME}/main/${FILE_PATH}")

                                                                current_tag=$(echo "$content_decoded" | grep -o 'image: [^ ]*' | sed 's/image: //' | grep -o '[0-9]\\+\\.[0-9]\\+-frontend')

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

                                                                if [ "$minor" -ge 9 ]; then
                                                                    major=$((major + 1))
                                                                    minor=0
                                                                else
                                                                    minor=$((minor + 1))
                                                                fi

                                                                new_tag="${major}.${minor}"
                                                                echo "$new_tag"
                                                                '''
                    
                    sh 'chmod +x get_version.sh'
        
                    withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                        env.IMAGE_TAG = sh(script: './get_version.sh ${GITHUB_TOKEN}', returnStdout: true).trim()
                    }
                    env.DOCKER_IMAGE = "${env.DOCKER_USERNAME}/${env.REPO_NAME}:${env.IMAGE_TAG}-frontend"
                    
                    echo "New version: ${env.IMAGE_TAG}"
                    echo "Docker image: ${env.DOCKER_IMAGE}"
                }
            }
        }
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
                // BUILD_NUMBER = "${params.IMAGE_TAG}"
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

                        echo  ${BUILD_NUMBER}

                        # Optional: Ensure latest changes
                        git pull origin main

                        # Update the deployment file
                        sed -i "s|image: rafin1998/rafin-blog-site:[^ ]*|image: rafin1998/rafin-blog-site:${IMAGE_TAG}-frontend|g" k8s/frontend-depl.yaml


                        # Add and commit changes
                        git add k8s/frontend-depl.yaml
                        git commit -m "Update deployment image to version ${IMAGE_TAG} [Jenkins build ${IMAGE_TAG}]"

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
