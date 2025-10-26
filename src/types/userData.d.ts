interface userBadgeProps {
    id: number
    name: string
    created_at: string
}
interface lastReadProps {
    description: string
    thumbnail: string
    title: string
    id: number
}
interface UserProps {
    email: string
    nama: string
    role:string
    id: string
    points: number
    user_badges: userBadgeProps[]
    level: number
    materials?:lastReadProps

}

export type {UserProps, userBadgeProps, lastReadProps}