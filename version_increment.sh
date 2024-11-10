#!/bin/bash

DOCKER_REPO=$1
DEPLOYMENT_FILE="k8s/frontend-depl.yaml"
GIT_USER_NAME="Rafin000"  # Replace with your GitHub username
GIT_REPO_NAME="rafin-me-frontend"  # Replace with your GitHub repository name
GITHUB_TOKEN=$2  # GitHub token provided as a parameter

# Clone the GitHub repository if it's not already cloned
if [ ! -d "$GIT_REPO_NAME" ]; then
    git clone https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
fi

# Navigate to the repository
cd ${GIT_REPO_NAME}

# Fetch all tags from GitHub
git fetch --tags

# Get the latest tag from the GitHub repository
current_tag=$(git describe --tags --abbrev=0)

# If no tag is found, set it to "0.0-frontend"
if [[ -z "$current_tag" ]]; then
    current_tag="0.0-frontend"
fi

# Extract major and minor version numbers
if [[ $current_tag =~ ([0-9]+)\.([0-9]+)-frontend ]]; then
    major=${BASH_REMATCH[1]}
    minor=${BASH_REMATCH[2]}
else
    major=0
    minor=0
fi

# Increment version
if [ "$minor" -ge 9 ]; then
    major=$((major + 1))
    minor=0
else
    minor=$((minor + 1))
fi

# Set the new tag
new_tag="${major}.${minor}-frontend"
echo "New tag: ${new_tag}"