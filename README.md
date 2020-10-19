<p align="center">
  <img width="450" src="https://user-images.githubusercontent.com/31800695/95653499-c52a4580-0b16-11eb-863a-e23c43e4ae21.png">
  <h3 align="center">blog-box</h3>
  <p align="center">Update a pinned gist to show your latest dev.to blog post</p>
</p>

---

> 📌✨ For more pinned-gist projects like this one, check out: https://github.com/matchai/awesome-pinned-gists

## Setup

### Prep work

1. Create a new public GitHub Gist (https://gist.github.com/)
1. Create an access token with the `gist` scope and copy it. (https://github.com/settings/tokens/new)
1. Get your `Dev.to` user name (https://dev.to/settings)

### Project setup

1. Fork this repo
1. Go to the repo **Settings > Secrets**
1. Add the following environment variables:
   - **GH_TOKEN:** The GitHub access token generated above.
   - **GIST_ID:** The ID portion from your gist url: `https://gist.github.com/Aveek-Saha/`**`8335e85451541072dd25fda601129f7d`**.
   - **DEV_USERNAME:** Your `Dev.to` account username.

## Credits
This code was inspired by [@matchai's bird-box](https://github.com/matchai/bird-box).