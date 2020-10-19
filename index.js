require('dotenv').config()
const axios = require('axios')
const { Octokit } = require("@octokit/rest");
const wrapAnsi = require("wrap-ansi");

const baseURL = 'https://dev.to/api/articles'

const {
  GIST_ID: gistId,
  GH_TOKEN: githubToken,
  DEV_USERNAME: devUsername
} = process.env;

const options = {
    params: {
        username: devUsername
    }
  }


const octokit = new Octokit({
    auth: `token ${githubToken}`
});

async function getPost() {
    try {
        const response = await axios.get(baseURL, options);
        const post = response.data[0];
        await updateGist(post)
    } catch (error) {
        console.error(error);
    }
}

async function createComment() {
    let gist_comment;
    try {
        await octokit.gists.createComment({
            gist_id: gistId,
            body: 'The post link goes here'
        });
        gist_comment = await octokit.gists.listComments({ gist_id: gistId });
    } catch (error) {
        console.error(`Unable to create comment\n${error}`);
    }

    return gist_comment;
}

async function updateGist(post) {
    let gist;
    let gist_comment;
    try {
      gist = await octokit.gists.get({ gist_id: gistId });
      gist_comment = await octokit.gists.listComments({ gist_id: gistId });
    } catch (error) {
      console.error(`Unable to get gist\n${error}`);
    }

    if(gist_comment.data.length == 0)
        gist_comment = await createComment()

    const filename = Object.keys(gist.data.files)[0];
    const commentId = gist_comment.data[0].id;
    const tags = '#' + post.tag_list.join(", #");
    const content = `📜 ${post.title} \n 🔖 ${tags} \n 🔗 Link in comments`;
  
    try {
      await octokit.gists.update({
        gist_id: gistId,
        description: `@dev.to/${devUsername} - ${
            post.readable_publish_date
        } | ❤ ${post.public_reactions_count} | 💬 ${
            post.comments_count
        } `,
        files: {
          [filename]: {
              content: wrapAnsi(content, 60, { hard: true })
          }
        }
      });
    } catch (error) {
      console.error(`Unable to update gist\n${error}`);
    }

    try {
        await octokit.gists.updateComment({
            gist_id: gistId,
            comment_id: commentId,
            body: `[Link to post](${post.url})`
        });
          
      } catch (error) {
        console.error(`Unable to update gist comment\n${error}`);
      }
  }


(async () => {
    await getPost();
})();