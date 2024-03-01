import Link from 'next/link';
import {getUsers, UserItem} from "@/apis";
import 'tailwindcss/lib/index'

export default async function Users() {
    const users = await getUsers();

    return (
        <main className="flex min-h-full flex-col p-10 bg-gray-50">
            <div className="accent-slate-950 mb-5">用户列表</div>
            {users?.length ? users.map((item: UserItem) => (
                <Link href={`/posts?id=${item.id}`}
                    className="rounded-2xl border border-gray-200 p-4 mb-3 cursor-pointer shadow"
                    key={item.id}
                >
                    <section>{item.name}</section>
                    <section className="text-xs text-gray-500">{item.address.city}</section>
                </Link>
            )) : (
                <h1 className="flex justify-center mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">No data</h1>
            )}
        </main>
    )
}
