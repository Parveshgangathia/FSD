
import asyncio
import aiohttp

async def fetch(session, url):
    async with session.get(url) as res:
        return await res.json()

async def main():
    async with aiohttp.ClientSession() as session:
        urls = [
            "https://jsonplaceholder.typicode.com/posts/1",
            "https://jsonplaceholder.typicode.com/posts/2",
            "https://jsonplaceholder.typicode.com/posts/3",
        ]
        results = await asyncio.gather(*(fetch(session, u) for u in urls))
        for r in results:
            print(r["id"], r["title"])

asyncio.run(main())
