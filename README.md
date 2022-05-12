# ReviewHelper
A Github Action regularly query Notion Database &amp; send review reminder.

# How to

First, Fork this repository

## Prepare

Set GitHub Action Secrets

1. DATABASE_ID  # Your Notion Database ID
2. TOKEN  # Your Notion Integration Token
3. MAIL_USERNAME  # Your E-Mail Sender adress
4. MAIL_PASSWORD  # Your E-Mail SMTP Authorization code
5. MAIL_RECIPIENT  # Your E-Mail recipient adress

## Change Settings

In `.github/workflows/reviewHelper-action.yml`

- If you're not using Gmail as the sender, change the `server_address` in line 44.
- This action default runs per 6 hours, if you are not satisfied with that, change the cron setting. 

In `index.js` 

- This action default sends 2 notes everytime. You can change that by setting `const QUERY_NUM` in line 12
- You need to change the `const QUERY_KEYS` to fit your database column names. 

# Chinese Guide (汉语说明)

see this [blog](https://jimsyun.notion.site/Notion-17cc7382329d43f685574d5b15f5ff0e).