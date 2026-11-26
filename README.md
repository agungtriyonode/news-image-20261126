[![make.fun · news-image-20261126](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/agungtriyonode/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/agungtriyonode/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)

# World News — Thursday, 26 November 2026

A newspaper front page that sums up the world's news of Thursday, 26 November 2026 in one image: the U.S. proposing new tariffs of up to 20% on China and 15% on the EU, Japan, South Korea and Taiwan; the Houthis claiming a strike on Saudi Arabia's Ras Tanura refinery as Brent crude settles at $94.61; 31 people killed in a fuel-tanker fire on Cairo's Ring Road; North Korea expelling Switzerland's envoy from Pyongyang; and Thanksgiving Day in the United States, with three NFL games and the 100th Macy's parade moved to Saturday by a storm. Built for the [make.fun bounty "Sum up 26 November's world news in one image"](https://make.fun/bounty/news-image-20261126).

## Run

Node 22. The program copies `entry.png` to the output directory:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

It writes the same bytes on every run, with no network access. The image is 1024×1024 and under 1 MiB.
