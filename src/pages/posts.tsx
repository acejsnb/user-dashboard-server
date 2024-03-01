import {useRouter} from 'next/router';
import {getUsers, getPosts, PostItem, UserItem} from "@/apis";

interface PostsProps {
    user: UserItem
    posts: PostItem[]
}

const Posts = ({user,posts}: PostsProps) => {
    const router = useRouter();

    if (router.isPreview) {
        return <div>loading...</div>
    }

    return (
        <div className="flex min-h-full flex-col p-10 bg-gray-50">
            <div className="accent-slate-950 mb-4">🦸‍♂️ {user?.name}</div>
            <div className="text-gray-500 mb-6">
                <section>📱 {user?.phone}</section>
                <section>📧 {user?.email}</section>
                <section>🚩 {user?.address?.city}</section>
                <section>🌐 {user?.website}</section>
                <section>🏢 {user?.company?.name}</section>
            </div>
            <div className="accent-slate-950 mb-5">Posts</div>
            {posts?.length ? posts.map(item => (
                <div key={item.id} className="rounded-2xl border border-gray-200 shadow p-4 mb-3 cursor-pointer">
                    <section>{item.title}</section>
                    <section className="text-xs text-gray-500">{item.body}</section>
                </div>
            )) : (
                <h1 className="flex justify-center mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">No data</h1>
            )}
        </div>
    )
}

export default Posts;

export async function getServerSideProps(context: any) {
    const [user, posts] = await Promise.all([getUsers({id: context.query.id as string}), getPosts({userId: context.query.id as string})])
    return {props: {user: user?.[0] ?? {},posts}}
}
