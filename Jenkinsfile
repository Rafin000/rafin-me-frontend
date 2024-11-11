pipeline {
    agent any

    environment {
        // DOCKER_IMAGE = "${params.DOCKER_USERNAME}/${params.REPO_NAME}:${params.IMAGE_TAG}-frontend"
        DOCKER_IMAGE = "${params.DOCKER_USERNAME}/${params.REPO_NAME}:${currentTag}-frontend"
    }

    stages {
        stage('Fetch Current Tag and Generate New Tag') {
            steps {
                script {
                    def githubToken = credentials('github')
                    def newTag = sh(script: """
                        #!/bin/bash
                        GIT_USER_NAME="Rafin000"
                        GIT_REPO_NAME="rafin-me-frontend"
                        FILE_PATH="k8s/frontend-depl.yaml"
                        export GITHUB_TOKEN="${githubToken}"  # Use export for proper environment variable handling

                        file_content=\$(curl -s -H "Authorization: token \${GITHUB_TOKEN}" \
                            "https://api.github.com/repos/\${GIT_USER_NAME}/\${GIT_REPO_NAME}/contents/\${FILE_PATH}")

                        content_decoded=\$(echo "\$file_content" | jq -r '.content' | base64 -d)

                        current_tag=$(echo "$content_decoded" | grep -o 'image: [^ ]*' | sed 's/image: //' | grep -o '[0-9]\\+[0-9]\\+-frontend')

                        if [[ -z "\$current_tag" ]]; then
                            current_tag="0.0-frontend"
                        fi

                        if [[ \$current_tag =~ ([0-9]+)\.([0-9]+)-frontend ]]; then
                            major=\${BASH_REMATCH[1]}
                            minor=\${BASH_REMATCH[2]}
                        else
                            major=0
                            minor=0
                        fi

                        if [ "\$minor" -ge 9 ]; then
                            major=\$((major + 1))
                            minor=0
                        else
                            minor=\$((minor + 1))
                        fi

                        new_tag="\${major}.\${minor}"
                        echo "\$new_tag"
                    """, returnStdout: true).trim()

                    currentTag = newTag
                    echo "New Tag: ${currentTag}"
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
                BUILD_NUMBER = "${params.IMAGE_TAG}"
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
                        sed -i "s|image: rafin1998/rafin-blog-site:[^ ]*|image: rafin1998/rafin-blog-site:${BUILD_NUMBER}-frontend|g" k8s/frontend-depl.yaml


                        # Add and commit changes
                        git add k8s/frontend-depl.yaml
                        git commit -m "Update deployment image to version ${BUILD_NUMBER} [Jenkins build ${BUILD_NUMBER}]"

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
