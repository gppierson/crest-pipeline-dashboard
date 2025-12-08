---
description: Deploy to production (crest.garrettpierson.com)
---

# Deploy to Production

This workflow deploys the crest-pipeline-dashboard to Google Cloud Run, which is mapped to `crest.garrettpierson.com`.

## Important Notes

- **Service name**: `crest-dashboard` (NOT `crest-pipeline-dashboard`)
- **Custom domain**: `crest.garrettpierson.com` → `crest-dashboard`
- **Region**: `us-central1`

## Steps

1. Commit and push your changes to GitHub:
```bash
git add -A && git commit -m "Your commit message" && git push origin main
```

// turbo
2. Deploy to Cloud Run (uses the correct service name):
```bash
/Users/garrettpierson/google-cloud-sdk/bin/gcloud run deploy crest-dashboard --source . --region us-central1 --allow-unauthenticated
```

3. Verify deployment at https://crest.garrettpierson.com
