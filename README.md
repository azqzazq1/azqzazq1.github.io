# azqzazq1.blog

A buildless personal security research notebook. Plain HTML, CSS and JavaScript; no runtime dependencies, third-party fonts, analytics or asset CDN.

## Publishing

GitHub Pages serves **main / (root)**. Keep `CNAME` set to `azqzazq1.blog`. No DNS, HTTPS or Pages setting changes are required. Commit and push the root files to publish.

## Local preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765. There is no build step.

## Editing

- `index.html`: selected research, current interests, writing list and recognition.
- `assets/site.css`: shared responsive layout and article typography.
- `assets/site.js`: optional writing filters; all content remains accessible without JavaScript.
- Existing article URLs (`lid.html`, `sunnydaybpf.html`, `sunnymapbpf.html`, `judozi.html`) remain intact. The original technical text and diagrams are historical research snapshots, with scope notices and current repository links.
- `disclosures.html`, `owl0.html`, `costanza-corner.html`: disclosure notes, experiment scope and personal writing.
- For a new post, copy the structure of `owl0.html`, edit title, description, canonical and Open Graph metadata, then add a writing-list entry and sitemap URL. Use `data-category="research"` or `"personal"`.
- Update the explicit “Currently exploring” date when reviewing that content; it does not auto-update to imply new research.

## Content provenance (reviewed 2026-10-19)

- SunnyDayBPF / LID: the author's public project repositories, linked on the page.
- CVE-2026-7867: [Red Hat record](https://access.redhat.com/security/cve/cve-2026-7867), including joint credit with Özlem Ozan, and the author's research repository. The public vendor record supersedes older repository status text.
- CVE-2026-110896: [Patchstack advisory](https://patchstack.com/database/wordpress/plugin/content-protector/vulnerability/wordpress-passster-plugin-4-3-18-broken-access-control-vulnerability), NVD link and the author's repository. Fixed in 4.3.19; no RCE claim.
- eCHO News #108: [Bill Mulligan's May 19, 2026 roundup](https://www.linkedin.com/pulse/echo-news-108-bill-mulligan-kdr0e).
- DEF CON RTV: owner confirmed 2026 acceptance. Do not label as attendance or a delivered talk.
- SOSP’26 eBPF Workshop: owner confirmed the poster plan was cancelled. Do not label as accepted/presented or imply the workshop itself was cancelled.
- OWL0: owner-supplied ongoing x86-64 hypervisor experiment. No public repository URL or implemented-feature claims added without evidence.

## Artwork

The CSS boundary diagram, favicon and `assets/coffee-break.svg` were created for this site. The coffee illustration is generic original artwork, not a TV still or portrait. No third-party George Costanza/Seinfeld imagery is included. If adding licensed imagery later, record creator, source, license, required attribution and changes alongside the asset; include visible attribution where required. Do not treat availability on a meme site as permission.

## Site identity and kernel notebook

Contact: `kernel@azqzazq1.blog`. Motto: “show about everything”.
`oopsie.html` is the intentionally empty kernel-notes page linked from every header. Replace its main content when the notebook is ready, preserving the shared navigation and metadata.
