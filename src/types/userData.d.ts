interface userBadgeProps {
    id: number
    name: string
    created_at: string
}
interface UserProps {
    email: string
    nama: string
    role:string
    id: string
    points: number
    user_badges: userBadgeProps[]
    level: number
}

export type {UserProps, userBadgeProps}