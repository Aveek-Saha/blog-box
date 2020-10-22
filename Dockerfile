FROM node:lts-alpine

# Labels for GitHub to read your action
LABEL "com.github.actions.name"="blog-box"
LABEL "com.github.actions.description"="GitHub Action for injecting your latest dev.to blog post into a gist"
# Here are all of the available icons: https://feathericons.com/
LABEL "com.github.actions.icon"="file-text"
# And all of the available colors: https://developer.github.com/actions/creating-github-actions/creating-a-docker-container/#label
LABEL "com.github.actions.color"="green"

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your action's code
COPY . .

# Run `node index.js`
ENTRYPOINT ["node", "index.js"]