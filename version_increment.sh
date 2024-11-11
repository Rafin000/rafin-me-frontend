# #!/bin/bash

# GIT_USER_NAME="Rafin000"
# GIT_REPO_NAME="rafin-me-frontend"
# FILE_PATH="k8s/frontend-depl.yaml"
# GITHUB_TOKEN=$1  

# file_content=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
#     "https://api.github.com/repos/${GIT_USER_NAME}/${GIT_REPO_NAME}/contents/${FILE_PATH}")

# content_decoded=$(echo "$file_content" | jq -r '.content' | base64 --decode)

# current_tag=$(echo "$content_decoded" | grep -oP 'image: \K[^ ]+' | grep -oP '[0-9]+\.[0-9]+-frontend')

# if [[ -z "$current_tag" ]]; then
#     current_tag="0.0-frontend"
# fi

# if [[ $current_tag =~ ([0-9]+)\.([0-9]+)-frontend ]]; then
#     major=${BASH_REMATCH[1]}
#     minor=${BASH_REMATCH[2]}
# else
#     major=0
#     minor=0
# fi

# if [ "$minor" -ge 9 ]; then
#     major=$((major + 1))
#     minor=0
# else
#     minor=$((minor + 1))
# fi

# new_tag="${major}.${minor}"
# echo "$new_tag"


#!/bin/bash

GIT_USER_NAME="Rafin000"
GIT_REPO_NAME="rafin-me-frontend"
FILE_PATH="k8s/frontend-depl.yaml"
GITHUB_TOKEN=$1  

# Fetch file content from GitHub
file_content=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    "https://api.github.com/repos/${GIT_USER_NAME}/${GIT_REPO_NAME}/contents/${FILE_PATH}")

# Decode content
content_decoded=$(echo "$file_content" | jq -r '.content' | base64 -d)

# Extract the current tag
current_tag=$(echo "$content_decoded" | grep -o 'image: [^ ]*' | sed 's/image: //' | grep -o '[0-9]\+\.[0-9]\+-frontend')

# If no tag found, default to "0.0-frontend"
if [[ -z "$current_tag" ]]; then
    current_tag="0.0-frontend"
fi

# Extract major and minor version
if [[ $current_tag =~ ([0-9]+)\.([0-9]+)-frontend ]]; then
    major=${BASH_REMATCH[1]}
    minor=${BASH_REMATCH[2]}
else
    major=0
    minor=0
fi

# Increment minor version or reset to 0 and increment major version
if [ "$minor" -ge 9 ]; then
    major=$((major + 1))
    minor=0
else
    minor=$((minor + 1))
fi

# Construct the new tag
new_tag="${major}.${minor}"
echo "$new_tag"
