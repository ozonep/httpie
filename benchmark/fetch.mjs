import { benchmark, spawnRunWorker, getPath } from './benchmark.mjs'
import { createServer } from 'http'
import { once } from 'events'

export async function benchmarkFetch () {
  const entities = [
    {
      id: 'undicipie',
      path: getPath('../dist/index.js'),
      import: 'default'
    },
    {
      id: 'node-fetch',
      path: 'node-fetch',
      import: 'default'
    },
    {
      id: 'got',
      path: 'got',
      import: 'default'
    },
    {
      id: 'axios',
      path: 'axios',
      import: 'default'
    },
  ]

  const before = fetch => _ => async id => {
    const _http = await import('http')
    const _https = await import('https')

    switch (id) {
      case 'undicipie':
        const fetchClient = (url) => fetch.get(url)
        return [fetchClient]
      case 'node-fetch':
      case 'got':
      case 'axios':
        return [fetch]
      default:
        throw new Error(`Invalid fetch client ${id}`)
    }
  }

  const main = _ => fetch => async (N, url) => {
    for (let i = 0; i < N; i++) {
      await fetch(url)
    }
    return [fetch]
  }

  const server = createServer((req, res) => {
    process.nextTick(() => {
      res.end('payload')
    })
  })

  server.listen(0)
  await once(server, 'listening')

  const N = 1000
  const url = `http://localhost:${server.address().port}`

  const runs = entities.map(entity => {
    return spawnRunWorker({
      entity,
      suite: { id: 'fetch' },
      before: {
        func: before.toString(),
        args: [entity.id]
      },
      main: {
        func: main.toString(),
        args: [N, url]
      }
    })
  })

  await benchmark(runs, 'undicipie')

  server.close()
}