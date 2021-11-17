# Benchmarks

A collection of benchmark executions from the [benchmarks](./benchmarks) directory.

Executed on a personal machine:

```
MacBook Air M1 2020
Memory 16 GB 2667 MHz DDR4
```

Run these locally using `npm run benchmark`

```
Versions used:
node-fetch: v3.1.0
got: v12 beta 4
axios: v0.24.0
┌─────────┬──────────────┬───────────────────────────┬────────────────┐
│ (index) │    Entity    │        Total Time         │ Percent Change │
├─────────┼──────────────┼───────────────────────────┼────────────────┤
│    0    │ 'undicipie'  │ '229961000ns (229.961ms)' │    '0.000%'    │
│    1    │ 'node-fetch' │ '686696125ns (686.696ms)' │   '198.614%'   │
│    2    │    'got'     │ '742015541ns (742.016ms)' │   '222.670%'   │
│    3    │   'axios'    │ '657377084ns (657.377ms)' │   '185.865%'   │
└─────────┴──────────────┴───────────────────────────┴────────────────┘
```
