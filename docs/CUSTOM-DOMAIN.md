# Pointing manasvardhan.com at this site

The domain is registered on **Squarespace**, and its DNS still points at
Squarespace's servers. Do the DNS change first, then claim the domain in GitHub.
Doing it in the other order makes manasvardhan.github.io redirect to a domain
that isn't serving this site yet, which takes the site offline at both URLs.

## 1. Squarespace DNS

In Squarespace: **Settings > Domains > manasvardhan.com > DNS Settings**.

Remove the existing Squarespace A records for `@` and the `www` CNAME
(`ext-sq.squarespace.com`), then add:

| Type  | Host | Value                   |
| ----- | ---- | ----------------------- |
| A     | @    | 185.199.108.153         |
| A     | @    | 185.199.109.153         |
| A     | @    | 185.199.110.153         |
| A     | @    | 185.199.111.153         |
| AAAA  | @    | 2606:50c0:8000::153     |
| AAAA  | @    | 2606:50c0:8001::153     |
| AAAA  | @    | 2606:50c0:8002::153     |
| AAAA  | @    | 2606:50c0:8003::153     |
| CNAME | www  | manasvardhan.github.io. |

## 2. Wait for propagation

```bash
dig +short manasvardhan.com A      # expect the four 185.199.x.153 addresses
```

## 3. Claim the domain in GitHub

Recreate the CNAME file so every build keeps the domain claimed:

```bash
echo 'manasvardhan.com' > public/CNAME
git add public/CNAME
git commit -m "Point Pages at manasvardhan.com"
git push
```

Then enable HTTPS (certificate issuance takes a few minutes):

```bash
gh api -X PUT repos/ManasVardhan/ManasVardhan.github.io/pages -F https_enforced=true
```

`SITE_INFO.url` and the workflow's `APP_URL` are already set to
`https://manasvardhan.com`, so no code changes are needed.
